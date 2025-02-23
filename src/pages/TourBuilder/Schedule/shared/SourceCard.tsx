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
import { GripVertical } from "lucide-react";
import clsx from "clsx";
import { Activity, Day } from "@/types";
import { formatTo24HourTime } from "@/utils/formatters";
import Avatar from "@/components/Avatar";

type TSourceCardState =
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

const idle: TSourceCardState = { type: "idle" };

const innerStyles: { [Key in TSourceCardState["type"]]?: string } = {
  idle: "cursor-grab",
  "is-dragging": "opacity-40"
};

const outerStyles: { [Key in TSourceCardState["type"]]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
  "is-dragging-and-left-self": "hidden"
};

export function SourceCardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-card" style={{ height: dragging.height }} />;
}

export function SourceCardDisplay({
  card,
  state,
  outerRef,
  innerRef
}: {
  card: Day | Activity;
  state: TSourceCardState;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={outerRef} className={`flex flex-col pt-4 pr-4  ${outerStyles[state.type]}`}>
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === "is-over" && state.closestEdge === "top" ? <SourceCardShadow dragging={state.dragging} /> : null}
      <div
        ref={innerRef}
        className={clsx(`flex items-center text-lg font-semibold ${innerStyles[state.type]}`)}
        style={
          state.type === "preview"
            ? {
                width: state.dragging.width,
                height: state.dragging.height
              }
            : undefined
        }
      >
        <div className="w-8 flex items-center justify-center text-primary-foreground60 cursor-grab">
          <GripVertical size={20} />
        </div>
        <div className={clsx(`flex flex-1 justify-between items-center border rounded-md border-solid px-4 py-2 bg-card`)}>
          <div className="flex flex-col gap-1">
            <span className="truncate flex-grow flex-shrink">{card.title}</span>
            {card.startTime && card.endTime && (
              <span className="text-sm font-normal text-primary-foreground30">
                {formatTo24HourTime(card.startTime ?? "")} - {formatTo24HourTime(card.endTime ?? "")}
              </span>
            )}
          </div>
          <Avatar className="rounded-sm" size={16} avatarLink={card.coverImgUrl ?? ""} avatarPlaceholder={card.title ?? ""} />
        </div>
      </div>

      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === "is-over" && state.closestEdge === "bottom" ? <SourceCardShadow dragging={state.dragging} /> : null}
    </div>
  );
}

export function SourceCard({ card, columnId }: { card: Day | Activity; columnId: string }) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TSourceCardState>(idle);

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
          const proposed: TSourceCardState = { type: "is-over", dragging: source.data.rect, closestEdge };
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
      <SourceCardDisplay outerRef={outerRef} innerRef={innerRef} state={state} card={card} />
      {state.type === "preview" ? createPortal(<SourceCardDisplay state={state} card={card} />, state.container) : null}
    </>
  );
}

export const SourceCardList = memo(function SourceCardList({ column }: { column: TColumn }) {
  return column.cards?.map(card => <SourceCard key={card.id} card={card} columnId={column.id} />);
});
