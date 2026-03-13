"use client";

import { useState } from "react";
import { EventList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { calendarViews, formatDisplayDate } from "@/data/mission-control";

function shiftDate(date: string, amount: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + amount);
  return next.toISOString().slice(0, 10);
}

function getMonthLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );
}

function getWeekLabel(date: string) {
  const start = new Date(`${shiftDate(date, -new Date(`${date}T12:00:00`).getDay())}T12:00:00`);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(start)} - ${new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(end)}`;
}

function buildWeekDays(focusDate: string) {
  const base = new Date(`${focusDate}T12:00:00`);
  const dayIndex = base.getDay();
  const start = new Date(base);
  start.setDate(base.getDate() - dayIndex);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return current.toISOString().slice(0, 10);
  });
}

function buildMonthCells(focusDate: string) {
  const focus = new Date(`${focusDate}T12:00:00`);
  const monthStart = new Date(focus.getFullYear(), focus.getMonth(), 1, 12);
  const startDay = monthStart.getDay();
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - startDay);

  return Array.from({ length: 35 }, (_, index) => {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);
    return current.toISOString().slice(0, 10);
  });
}

function dayName(date: string, format: "short" | "narrow" = "short") {
  return new Intl.DateTimeFormat("en-US", { weekday: format }).format(new Date(`${date}T12:00:00`));
}

function MonthBoard({
  focusDate,
  eventsByDate,
  eventTitlesByDate,
  onSelect,
}: {
  focusDate: string;
  eventsByDate: Map<string, number>;
  eventTitlesByDate: Map<string, string[]>;
  onSelect: (date: string) => void;
}) {
  const cells = buildMonthCells(focusDate);
  const monthLabel = focusDate.slice(5, 7);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-2">
        {buildWeekDays(focusDate).map((date) => (
          <div
            key={`header-${date}`}
            className="rounded-[10px] border border-white/8 bg-black/20 px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#788594]"
          >
            {dayName(date, "short")}
          </div>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-7">
        {cells.map((date) => {
          const inMonth = date.slice(5, 7) === monthLabel;
          const selected = date === focusDate;
          const items = eventTitlesByDate.get(date) ?? [];

          return (
            <button
              key={date}
              onClick={() => onSelect(date)}
              className={`min-h-[132px] rounded-[14px] border px-3 py-3 text-left ${
                selected
                  ? "border-[rgba(178,144,97,0.34)] bg-[rgba(178,144,97,0.12)]"
                  : "border-white/8 bg-[#0f1418] hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-semibold ${inMonth ? "text-white" : "text-[#5f6a76]"}`}>
                  {Number(date.slice(-2))}
                </p>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7e8a96]">
                  {eventsByDate.get(date) ?? 0}
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                {items.length ? (
                  items.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="truncate rounded-[10px] border border-white/8 bg-black/20 px-2 py-1 text-[11px] text-[#d7e0e8]"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="pt-6 text-[11px] uppercase tracking-[0.14em] text-[#5f6d79]">
                    Open
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekBoard({
  focusDate,
  eventsByDate,
  eventTitlesByDate,
  onSelect,
}: {
  focusDate: string;
  eventsByDate: Map<string, number>;
  eventTitlesByDate: Map<string, string[]>;
  onSelect: (date: string) => void;
}) {
  const days = buildWeekDays(focusDate);

  return (
    <div className="grid gap-2 xl:grid-cols-7">
      {days.map((date) => {
        const selected = date === focusDate;
        const items = eventTitlesByDate.get(date) ?? [];

        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`min-h-[220px] rounded-[14px] border px-3 py-3 text-left ${
              selected
                ? "border-[rgba(178,144,97,0.34)] bg-[rgba(178,144,97,0.12)]"
                : "border-white/8 bg-[#0f1418] hover:bg-white/[0.04]"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7d8996]">
              {dayName(date)}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{Number(date.slice(-2))}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7c8896]">
              {eventsByDate.get(date) ?? 0} scheduled
            </p>
            <div className="mt-4 space-y-2">
              {items.length ? (
                items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[10px] border border-white/8 bg-black/20 px-2 py-2 text-xs text-[#dae2ea]"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="rounded-[10px] border border-dashed border-white/10 px-2 py-3 text-xs text-[#62707d]">
                  No items scheduled
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function CalendarPage() {
  const { calendarView, events, setCalendarView, showFeedback } = useWorkspace();
  const [focusDate, setFocusDate] = useState("2026-03-13");
  const visibleEvents = events.filter((event) => event.date === focusDate);
  const eventsByDate = new Map<string, number>();
  const eventTitlesByDate = new Map<string, string[]>();

  events.forEach((event) => {
    eventsByDate.set(event.date, (eventsByDate.get(event.date) ?? 0) + 1);
    eventTitlesByDate.set(event.date, [...(eventTitlesByDate.get(event.date) ?? []), event.title]);
  });

  const focusWeekEvents = events.filter(
    (event) => event.date >= shiftDate(focusDate, -3) && event.date <= shiftDate(focusDate, 3),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Calendar"
        title="Planning surface for month, week, day, and agenda operations."
        description="Calendar is the central operating plane. Switch views in place, inspect the focused date, and keep linked events available without breaking workflow continuity."
        actions={
          <>
            <Button
              variant="primary"
              onClick={() => showFeedback("Calendar import will plug into this route once the adapter is added.")}
            >
              Import .ics
            </Button>
            <Button onClick={() => setFocusDate("2026-03-13")}>Jump to today</Button>
          </>
        }
      />

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.42fr)_360px]">
        <Panel
          title="Calendar board"
          description="Operate the planning surface without leaving the route. Focus, horizon, and event detail stay synchronized across views."
          action={
            <SegmentedControl
              items={calendarViews.map((view) => ({ label: view, value: view }))}
              value={calendarView}
              onChange={setCalendarView}
            />
          }
        >
          <div className="space-y-4">
            <div className="surface-muted rounded-[16px] p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-[minmax(0,1.2fr)_170px_170px]">
                  <BoardStat label="Focused date" value={formatDisplayDate(focusDate)} />
                  <BoardStat
                    label={calendarView === "Month" ? "Visible month" : "Current range"}
                    value={calendarView === "Month" ? getMonthLabel(focusDate) : getWeekLabel(focusDate)}
                  />
                  <BoardStat label="Items on focus" value={String(visibleEvents.length)} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? -28 : -1))}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? 28 : 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {calendarView === "Month" ? (
              <MonthBoard
                focusDate={focusDate}
                eventsByDate={eventsByDate}
                eventTitlesByDate={eventTitlesByDate}
                onSelect={setFocusDate}
              />
            ) : null}

            {calendarView === "Week" ? (
              <WeekBoard
                focusDate={focusDate}
                eventsByDate={eventsByDate}
                eventTitlesByDate={eventTitlesByDate}
                onSelect={setFocusDate}
              />
            ) : null}

            {calendarView === "Day" ? (
              <div className="surface-muted rounded-[16px] p-4">
                <div className="border-b border-white/8 pb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d8996]">
                    Day plan
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatDisplayDate(focusDate)}</p>
                  <p className="mt-1 text-sm text-[#94a2b0]">
                    {visibleEvents.length} scheduled item(s) attached to this date
                  </p>
                </div>
                <div className="mt-4">
                  <EventList
                    events={
                      visibleEvents.length ? visibleEvents : events.filter((event) => event.date === "2026-03-13")
                    }
                  />
                </div>
              </div>
            ) : null}

            {calendarView === "Agenda" ? <EventList events={events} /> : null}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Focus summary" description="Inspect the selected slice while staying on the calendar operating surface.">
            <div className="grid gap-3">
              <SummaryCard
                label="Scheduled items"
                value={String(visibleEvents.length)}
                detail={`Items directly attached to ${formatDisplayDate(focusDate)}`}
              />
              <SummaryCard
                label="Week load"
                value={String(focusWeekEvents.length)}
                detail="Events within the current seven-day window"
              />
              <SummaryCard
                label="Range label"
                value={calendarView === "Month" ? getMonthLabel(focusDate) : getWeekLabel(focusDate)}
                detail="Current planning horizon in view"
              />
            </div>
          </Panel>

          <Panel
            title="Focused agenda"
            description="Focused events remain visible while switching between month, week, day, and agenda views."
          >
            <EventList
              events={visibleEvents.length ? visibleEvents : events.filter((event) => event.date === "2026-03-13")}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function BoardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/8 bg-black/20 px-3 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#74818e]">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="surface-subtle rounded-[14px] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-1 text-sm text-[#8fa0b0]">{detail}</p>
    </div>
  );
}
