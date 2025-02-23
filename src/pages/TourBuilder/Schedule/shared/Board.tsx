import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { isCardData, isCardDropTargetData, isColumnData, isDraggingACard, isDraggingAColumn, TBoard, TColumn } from "./data";
import { bindAll } from "bind-event-listener";
import { blockBoardPanningAttr } from "./data-attributes";
import { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import TourBuilderLayout from "@/layouts/TourBuilderLayout";
import { Card } from "@/components/ui/card";
import { DestinationCardList } from "./DestinationCard";
import { SourceCardList } from "./SourceCard";
import { Activity, Day } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTourBuilderNavigation } from "@/hooks/useTourBuilderNavigation";
import { useTourBuilderStore } from "@/store";

interface BoardProps {
  type: CardType;
  initial: TBoard;
  dayId?: string;
}

export type CardType = "day" | "activity";

export const Board: React.FC<BoardProps> = ({ initial, type, dayId }) => {
  const [data, setData] = useState(initial);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const { handleGoToNextStep, handleGoToPrevStep, handleGoBack } = useTourBuilderNavigation();
  const { setScheduleDays, scheduleDays } = useTourBuilderStore();
  const handleSubmit =
    type === "day"
      ? () => {
          // Save day state
          const updatedScheduleDays = data.columns.find(column => column.type === "destination")?.cards;
          setScheduleDays(updatedScheduleDays as Day[]);
          //TODO: Call api
          handleGoToNextStep();
        }
      : undefined;

  const handleBack = () => {
    if (type === "activity") {
      // Save activity state
      const updatedScheduleActivities = data.columns.find(column => column.type === "destination")?.cards;
      const updatedScheduleDays = scheduleDays?.map(day => {
        if (day.id === dayId) {
          const newDay = { ...day };
          newDay.activities = updatedScheduleActivities;
          return newDay;
        } else {
          return day;
        }
      });

      setScheduleDays(updatedScheduleDays as Day[]);
      //TODO: call api
      handleGoBack();
    } else {
      handleGoToPrevStep();
    }
  };

  useEffect(() => {
    const element = scrollableRef.current;
    invariant(element);
    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDrop({ source, location }) {
          const dragging = source.data;
          if (!isCardData(dragging)) {
            return;
          }

          const innerMost = location.current.dropTargets[0];

          if (!innerMost) {
            return;
          }
          const dropTargetData = innerMost.data;
          const homeColumnIndex = data.columns.findIndex(column => column.id === dragging.columnId);
          const home: TColumn | undefined = data.columns[homeColumnIndex];

          if (!home) {
            return;
          }
          const cardIndexInHome = home.cards?.findIndex(card => card.id === dragging.card.id);

          // dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumnIndex = data.columns.findIndex(column => column.id === dropTargetData.columnId);
            const destination = data.columns[destinationColumnIndex];

            if (!destination) {
              return;
            }

            // Prevent reordering within the source column
            if (home.type === "source" && destination.type === "source") {
              return; // Stop any movement within the source column
            }

            // Copy from source column to destination column
            if (home.type === "source" && destination.type === "destination") {
              const indexOfTarget = destination.cards?.findIndex(card => card.id === dropTargetData.card.id);

              const closestEdge = extractClosestEdge(dropTargetData);
              const finalIndex = closestEdge === "bottom" ? (indexOfTarget ?? 0 + 1) : indexOfTarget;

              let newCard;
              if (type === "day") {
                newCard = {
                  id: crypto.randomUUID(),
                  title: dragging.card.title,
                  comment: dragging.card.comment,
                  summary: dragging.card.summary,
                  coverImgUrl: dragging.card.coverImgUrl,
                  text: dragging.card.text
                } as Day;
              } else {
                newCard = {
                  id: crypto.randomUUID(),
                  title: dragging.card.title,
                  comment: dragging.card.comment,
                  summary: dragging.card.summary,
                  coverImgUrl: dragging.card.coverImgUrl,
                  text: dragging.card.text,
                  startTime: dragging.card.startTime,
                  endTime: dragging.card.endTime
                } as Activity;
              }

              const destinationCards = Array.from(destination.cards ?? []);
              destinationCards.splice(finalIndex ?? 0, 0, newCard); // Insert at exact position

              const columns = [...data.columns];
              columns[destinationColumnIndex] = { ...destination, cards: destinationCards };

              setData({ ...data, columns });

              return;
            }

            // Prevent dragging from destination back to source
            if (home.type === "destination" && destination.type === "source") {
              return;
            }

            // reordering in home column
            if (home.type === "destination" && destination.type === "destination") {
              const cardFinishIndex = home.cards?.findIndex(card => card.id === dropTargetData.card.id);

              // could not find cards needed
              if (cardIndexInHome === -1 || cardFinishIndex === -1 || cardIndexInHome === cardFinishIndex) {
                return;
              }

              const closestEdge = extractClosestEdge(dropTargetData);

              const reordered = reorderWithEdge({
                axis: "vertical",
                list: home.cards ?? [],
                startIndex: cardIndexInHome ?? 0,
                indexOfTarget: cardFinishIndex ?? 0,
                closestEdgeOfTarget: closestEdge
              });

              const updated: TColumn = {
                ...home,
                cards: reordered
              };
              const columns = [...data.columns];
              columns[homeColumnIndex] = updated;
              setData({ ...data, columns });
              return;
            }

            // moving card from one column to another

            // unable to find destination
            if (!destination) {
              return;
            }

            const indexOfTarget = destination.cards?.findIndex(card => card.id === dropTargetData.card.id);

            const closestEdge = extractClosestEdge(dropTargetData);
            const finalIndex = closestEdge === "bottom" ? (indexOfTarget ?? 0 + 1) : indexOfTarget;

            // remove card from home list
            const homeCards = Array.from(home.cards ?? []);
            // homeCards.splice(cardIndexInHome??0, 1);

            // insert into destination list
            const destinationCards = Array.from(destination.cards ?? []);
            destinationCards.splice(finalIndex ?? 0, 0, dragging.card);

            const columns = Array.from(data.columns);
            columns[homeColumnIndex] = {
              ...home,
              cards: homeCards
            };
            columns[destinationColumnIndex] = {
              ...destination,
              cards: destinationCards
            };
            setData({ ...data, columns });
            return;
          }

          // dropping onto a column, but not onto a card
          if (isColumnData(dropTargetData)) {
            const destinationColumnIndex = data.columns.findIndex(column => column.id === dropTargetData.column.id);
            const destination = data.columns[destinationColumnIndex];

            if (!destination) {
              return;
            }

            // dropping on home
            if (home === destination) {
              console.log("moving card to home column");

              // move to last position
              const reordered = reorder({
                list: home.cards ?? [],
                startIndex: cardIndexInHome ?? 0,
                finishIndex: home.cards?.length ?? 0 - 1
              });

              const updated: TColumn = {
                ...home,
                cards: reordered
              };
              const columns = Array.from(data.columns);
              columns[homeColumnIndex] = updated;
              setData({ ...data, columns });
              return;
            }

            console.log("moving card to another column");

            // // remove card from home list

            const homeCards = Array.from(home.cards ?? []);
            homeCards.splice(cardIndexInHome ?? 0, 1);

            // insert into destination list
            const destinationCards = Array.from(destination.cards ?? []);
            destinationCards.splice(destination.cards?.length ?? 0, 0, dragging.card);

            const columns = Array.from(data.columns);
            columns[homeColumnIndex] = {
              ...home,
              cards: homeCards
            };
            columns[destinationColumnIndex] = {
              ...destination,
              cards: destinationCards
            };
            setData({ ...data, columns });
            return;
          }
        }
      }),
      monitorForElements({
        canMonitor: isDraggingAColumn,
        onDrop({ source, location }) {
          const dragging = source.data;
          if (!isColumnData(dragging)) {
            return;
          }

          const innerMost = location.current.dropTargets[0];

          if (!innerMost) {
            return;
          }
          const dropTargetData = innerMost.data;

          if (!isColumnData(dropTargetData)) {
            return;
          }

          const homeIndex = data.columns.findIndex(column => column.id === dragging.column.id);
          const destinationIndex = data.columns.findIndex(column => column.id === dropTargetData.column.id);

          if (homeIndex === -1 || destinationIndex === -1) {
            return;
          }

          if (homeIndex === destinationIndex) {
            return;
          }

          const reordered = reorder({
            list: data.columns,
            startIndex: homeIndex,
            finishIndex: destinationIndex
          });
          setData({ ...data, columns: reordered });
        }
      })
    );
  }, [data]);

  // Panning the board
  useEffect(() => {
    let cleanupActive: CleanupFn | null = null;
    const scrollable = scrollableRef.current;
    invariant(scrollable);

    function begin({ startX }: { startX: number }) {
      let lastX = startX;

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: "pointermove",
            listener(event) {
              const currentX = event.clientX;
              const diffX = lastX - currentX;

              lastX = currentX;
              scrollable?.scrollBy({ left: diffX });
            }
          },
          // stop panning if we see any of these events
          ...(["pointercancel", "pointerup", "pointerdown", "keydown", "resize", "click", "visibilitychange"] as const).map(eventName => ({
            type: eventName,
            listener: () => cleanupEvents()
          }))
        ],
        // need to make sure we are not after the "pointerdown" on the scrollable
        // Also this is helpful to make sure we always hear about events from this point
        { capture: true }
      );

      cleanupActive = cleanupEvents;
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: "pointerdown",
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return;
          }
          // ignore interactive elements
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return;
          }

          begin({ startX: event.clientX });
        }
      }
    ]);

    return function cleanupAll() {
      cleanupStart();
      cleanupActive?.();
    };
  }, []);

  const handleAddOne = () => {
    let newCard;
    if (type === "day") {
      newCard = {
        id: crypto.randomUUID(),
        title: "No title"
      } as Day;
    } else {
      newCard = {
        id: crypto.randomUUID(),
        title: "No title"
      } as Activity;
    }

    // Find the destination column (assuming it's the first column)
    const destinationColumnIndex = 0; // Change this if the index is dynamic
    const destinationColumn = data.columns[destinationColumnIndex];

    // Add the new card to the cards array of the destination column
    const updatedCards = [...(destinationColumn.cards ?? []), newCard];

    // Update the columns state
    const updatedColumns = data.columns.map((column, index) => (index === destinationColumnIndex ? { ...column, cards: updatedCards } : column));

    // Update the board state
    setData({ ...data, columns: updatedColumns });
  };

  return (
    <>
      <TourBuilderLayout title={"Schedule"} subTitle={"Please add days and activities to the tour."} handleBack={handleBack} handleNext={handleSubmit}>
        <div
          className="flex flex-col gap-4 mb-4 overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.slate.600)_theme(colors.slate.700)] [scrollbar-width:thin] w-full"
          ref={scrollableRef}
        >
          {/* destination card list */}
          <DestinationCardList column={data.columns.find(c => c.type === "destination")!} type={type} />
          {type === "day" ? (
            <Button className="mx-8 py-8 flex justify-start text-base font-semibold" variant={"secondary"} onClick={handleAddOne}>
              <Plus strokeWidth={3} /> Add one more day
            </Button>
          ) : (
            <Button className="mx-8 py-8 flex justify-start text-base font-semibold" variant={"secondary"} onClick={handleAddOne}>
              <Plus strokeWidth={3} /> Add one more activity
            </Button>
          )}
        </div>
      </TourBuilderLayout>

      <Card className="ml-8 w-[400px] border-none h-[calc(100vh-7rem)]">
        <div
          className="flex flex-col overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.slate.600)_theme(colors.slate.700)] [scrollbar-width:thin] w-full"
          ref={scrollableRef}
        >
          {/* source card list */}
          <SourceCardList column={data.columns.find(c => c.type === "source")!} />
        </div>
      </Card>
    </>
  );
};
