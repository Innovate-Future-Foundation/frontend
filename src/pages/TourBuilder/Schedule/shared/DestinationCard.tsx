import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { memo, MutableRefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";

import { type Edge, attachClosestEdge, extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { getCardData, getCardDropTargetData, isCardData, isDraggingACard, TColumn } from "./data";
import { isShallowEqual } from "./is-shallow-equal";
import { ArrowRight, ChevronDown, GripVertical, Trash2 } from "lucide-react";
import clsx from "clsx";
import { Activity, Day } from "@/types";
import { formatTo24HourTime } from "@/utils/formatters";
import TourDetailForm from "@/pages/TourBuilder/TourDetails/TourDetailForm";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CardType } from "./Board";
import { tourInfoFormSchema } from "../../TourDetails";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TDestinationCardState =
  | {
      type: "idle";
    }
  | {
      type: "is-dragging";
    }
  | {
      type: "is-dragging-and-left-self";
    }
  | {
      type: "is-over";
      dragging: DOMRect;
      closestEdge: Edge;
    }
  | {
      type: "preview";
      container: HTMLElement;
      dragging: DOMRect;
    };

const idle: TDestinationCardState = { type: "idle" };

const innerStyles: { [Key in TDestinationCardState["type"]]?: string } = {
  idle: "cursor-grab",
  "is-dragging": "opacity-40"
};

const outerStyles: { [Key in TDestinationCardState["type"]]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
  "is-dragging-and-left-self": "hidden"
};

export function DestinationCardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-card" style={{ height: dragging.height }} />;
}

export function DestinationCardDisplay({
  order,
  card,
  state,
  outerRef,
  innerRef,
  type,
  isExpands,
  setIsExpands
}: {
  order: number;
  card: Day | Activity;
  state: TDestinationCardState;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  type: CardType;
  isExpands: boolean[];
  setIsExpands: (isExpands: boolean[] | ((prev: boolean[]) => boolean[])) => void;
}) {
  const navigate = useNavigate();

  const handleDelete = (card: Day | Activity) => {
    console.log("deleting:", card);
  };

  const handleViewActivities = () => {
    navigate("/tours/ou762iu3gjhgjasgfcyas71/schedule/days/a3e4b1d6-9c4a-4b73-982b-4fce77e88ac4");
  };

  const activityInfoForm = useForm<z.infer<typeof tourInfoFormSchema>>({
    resolver: zodResolver(tourInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      coverImgUrl: card?.coverImgUrl ?? "",
      title: card?.title ?? "",
      summary: card?.summary ?? "",
      comment: card?.comment ?? "",
      // timeRange: [card?.startTime ? card.startTime.substring(11, 16) : null, card?.endTime ? card.endTime.substring(11, 16) : null],
      text: card?.text ?? ""
    }
  });

  const dayInfoForm = useForm<z.infer<typeof tourInfoFormSchema>>({
    resolver: zodResolver(tourInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      coverImgUrl: card?.coverImgUrl ?? "",
      title: card?.title ?? "",
      summary: card?.summary ?? "",
      comment: card?.comment ?? "",
      text: card?.text ?? ""
    }
  });

  const hanldeExpand = () => {
    setIsExpands(prev => {
      const newPrev = Array(prev.length).fill(false);
      if (prev[order] === false) {
        newPrev[order] = true;
      }
      return newPrev;
    });
  };

  // const saveData = useCallback(() => {
  //   const formData = type === "day" ? dayInfoForm.getValues() : activityInfoForm.getValues();

  //   const newCard = {
  //     ...card,
  //     title: formData.title,
  //     comment: formData.comment,
  //     summary: formData.summary,
  //     coverImgUrl: formData.coverImgUrl,
  //     text: formData.text
  //   };

  //   setData((prev: TBoard) => {
  //     const columns = prev.columns.map((column: TColumn) => {
  //       if (column.type === "destination") {
  //         return {
  //           ...column,
  //           cards: column.cards?.map((c: Day | Activity) => (c.id === card.id ? newCard : c))
  //         };
  //       }
  //       return column;
  //     });

  //     return { ...prev, columns } as TBoard;
  //   });
  // }, [activityInfoForm, card, dayInfoForm, setData, type]);

  return (
    <div ref={outerRef} className={`flex flex-col ${outerStyles[state.type]}`}>
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === "is-over" && state.closestEdge === "top" ? <DestinationCardShadow dragging={state.dragging} /> : null}
      <div className={clsx(`flex items-center text-lg font-semibold ${innerStyles[state.type]}`)}>
        <div
          className="w-8 h-20 flex items-center justify-center text-primary-foreground60 cursor-grab"
          ref={innerRef} // Only the grip is draggable
        >
          <GripVertical size={20} />
        </div>
        <div
          onClick={hanldeExpand}
          className={clsx(
            `flex gap-2 flex-1 justify-between items-center border rounded-md border-solid px-4 py-2 cursor-pointer bg-card ${isExpands[order] && "rounded-b-none"}`
          )}
        >
          <div className="mr-6 flex flex-col gap-1 h-16 items-start justify-center">
            <span className="truncate max-w-80">
              {type === "day" && `Day ${order + 1}: `}
              {type === "day" ? dayInfoForm.watch("title") : activityInfoForm.watch("title")}
            </span>
            {card.startTime && card.endTime && (
              <span className="text-sm font-normal text-primary-foreground30 ">
                {formatTo24HourTime(card.startTime ?? "")} - {formatTo24HourTime(card.endTime ?? "")}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center gap-4">
            {type === "day"
              ? dayInfoForm.watch("coverImgUrl") &&
                !isExpands[order] && (
                  <Avatar
                    className="rounded-sm"
                    size={16}
                    avatarLink={dayInfoForm.watch("coverImgUrl") ?? ""}
                    avatarPlaceholder={dayInfoForm.watch("title") ?? ""}
                  />
                )
              : dayInfoForm.watch("coverImgUrl") &&
                !isExpands[order] && (
                  <Avatar
                    className="rounded-sm"
                    size={16}
                    avatarLink={dayInfoForm.watch("coverImgUrl") ?? ""}
                    avatarPlaceholder={dayInfoForm.watch("title") ?? ""}
                  />
                )}
            <div className="flex justify-center text-primary-foreground60 hover:text-primary-foreground30">
              <ChevronDown
                onClick={e => {
                  e.stopPropagation();
                  hanldeExpand();
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="w-8 flex items-center justify-center text-primary-foreground60  hover:text-destructive cursor-pointer"
          onClick={() => handleDelete(card)}
        >
          <Trash2 size={16} />
        </div>
      </div>
      {isExpands[order] && (
        <div className="flex flex-col gap-2 p-3 -mt-3 border border-t-0 rounded-md rounded-t-none mx-8 bg-card">
          <TourDetailForm form={type === "day" ? dayInfoForm : activityInfoForm} dateTimeRange={type === "day" ? undefined : "time"} />
          {type === "day" && (
            <Button className="py-8 pl-2 flex items-center justify-start text-base font-semibold w-full" variant={"link"} onClick={handleViewActivities}>
              Manage Activities
              <ArrowRight strokeWidth={3} size={24} />
            </Button>
          )}
        </div>
      )}
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === "is-over" && state.closestEdge === "bottom" ? <DestinationCardShadow dragging={state.dragging} /> : null}
    </div>
  );
}

export function DestinationCard({
  order,
  card,
  columnId,
  type,
  setIsExpands,
  isExpands
}: {
  order: number;
  card: Day | Activity;
  columnId: string;
  type: CardType;
  setIsExpands: (isExpands: boolean[] | ((prev: boolean[]) => boolean[])) => void;
  isExpands: boolean[];
}) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TDestinationCardState>(idle);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    invariant(outer && inner);

    return combine(
      draggable({
        element: inner,
        getInitialData: ({ element }) => getCardData({ card, columnId, rect: element.getBoundingClientRect() }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data;
          invariant(isCardData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element: inner, input: location.current.input }),
            render({ container }) {
              // Demonstrating using a react portal to generate a preview
              setState({
                type: "preview",
                container,
                dragging: inner.getBoundingClientRect()
              });
            }
          });
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        }
      }),
      dropTargetForElements({
        element: outer,
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ card, columnId });
          return attachClosestEdge(data, { element, input, allowedEdges: ["top", "bottom"] });
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }

          setState({ type: "is-over", dragging: source.data.rect, closestEdge });
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }
          // optimization - Don't update react state if we don't need to.
          const proposed: TDestinationCardState = { type: "is-over", dragging: source.data.rect, closestEdge };
          setState(current => {
            if (isShallowEqual(proposed, current)) {
              return current;
            }
            return proposed;
          });
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            setState({ type: "is-dragging-and-left-self" });
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        }
      })
    );
  }, [card, columnId]);

  return (
    <>
      <DestinationCardDisplay
        order={order}
        outerRef={outerRef}
        innerRef={innerRef}
        state={state}
        card={card}
        type={type}
        setIsExpands={setIsExpands}
        isExpands={isExpands}
      />
      {state.type === "preview"
        ? createPortal(
            <DestinationCardDisplay order={order} state={state} card={card} type={type} setIsExpands={setIsExpands} isExpands={isExpands} />,
            state.container
          )
        : null}
    </>
  );
}

export const DestinationCardList = memo(function DestinationCardList({ column, type }: { column: TColumn; type: CardType }) {
  const length = column.cards?.length;
  const [isExpands, setIsExpands] = useState<boolean[]>(Array(length).fill(false));

  if (!Array.isArray(column.cards)) {
    console.error("Expected column.cards to be an array, but got:", column.cards);
    return null;
  }

  return column.cards.map((card, index) => (
    <DestinationCard order={index} key={card.id} card={card} columnId={column.id} type={type} setIsExpands={setIsExpands} isExpands={isExpands} />
  ));
});
