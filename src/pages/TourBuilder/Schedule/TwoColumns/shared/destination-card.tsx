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
import { ChevronDown, GripVertical, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { Tour } from "@/types";
import { formatDateToMMDDYY } from "@/utils/formatters";
import TourDetailForm from "@/pages/TourBuilder/TourDetails/TourDetailForm";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  card,
  state,
  outerRef,
  innerRef
}: {
  card: Tour;
  state: TDestinationCardState;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
}) {
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const hanldeExpand = () => {
    setIsExpand(!isExpand);
  };
  const handleDelete = (card: Tour) => {
    console.log("deleting:", card);
  };
  const handleViewActivities = () => {
    navigate("/tours/ou762iu3gjhgjasgfcyas71/build/schedule/activities");
  };
  return (
    <div ref={outerRef} className={`flex flex-col ${outerStyles[state.type]}`}>
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === "is-over" && state.closestEdge === "top" ? <DestinationCardShadow dragging={state.dragging} /> : null}
      <div className={clsx(`flex items-center text-lg font-semibold ${innerStyles[state.type]}`)}>
        <div
          className="w-8 flex items-center justify-center text-primary-foreground60 cursor-grab"
          ref={innerRef} // Only the grip is draggable
        >
          <GripVertical size={20} />
        </div>
        <div
          onClick={hanldeExpand}
          className={clsx(
            `flex flex-1 justify-between items-center border rounded-md border-solid px-4 py-2 cursor-pointer bg-card ${isExpand && "rounded-b-none"}`
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="truncate flex-grow flex-shrink">{card.title}</span>
            {card.startDate && card.endDate && (
              <span className="text-sm font-normal text-primary-foreground30">
                {formatDateToMMDDYY(card.startDate ?? "")} - {formatDateToMMDDYY(card.endDate ?? "")}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center gap-4">
            {card.coverImgUrl && <Avatar className="rounded-sm" size={16} avatarLink={card.coverImgUrl ?? ""} avatarPlaceholder={card.orgName ?? ""} />}
            <div className="flex justify-center text-primary-foreground60 hover:text-primary-foreground30">
              <ChevronDown onClick={hanldeExpand} />
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
      {isExpand && (
        <div className="p-3 -mt-3 border border-t-0 rounded-md rounded-t-none mx-8 bg-card ">
          <TourDetailForm tourDetail={card} />
          <Button className="py-8 flex justify-start text-base font-semibold w-full" variant={"secondary"} onClick={handleViewActivities}>
            <Plus strokeWidth={3} /> Add / View activities
          </Button>
        </div>
      )}
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === "is-over" && state.closestEdge === "bottom" ? <DestinationCardShadow dragging={state.dragging} /> : null}
    </div>
  );
}

export function DestinationCard({ card, columnId }: { card: Tour; columnId: string }) {
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
      <DestinationCardDisplay outerRef={outerRef} innerRef={innerRef} state={state} card={card} />
      {state.type === "preview" ? createPortal(<DestinationCardDisplay state={state} card={card} />, state.container) : null}
    </>
  );
}

export const DestinationCardList = memo(function DestinationCardList({ column }: { column: TColumn }) {
  return column.cards.map(card => <DestinationCard key={card.id} card={card} columnId={column.id} />);
});
