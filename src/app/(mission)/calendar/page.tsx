"use client";

import { useState } from "react";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { calendarViews, formatDisplayDate } from "@/data/mission-control";

function shiftDate(date: string, amount: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + amount);
  return next.toISOString().slice(0, 10);
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

function dayName(date: string, format: "short" | "narrow" = "short") {
  return new Intl.DateTimeFormat("en-US", { weekday: format }).format(new Date(`${date}T12:00:00`));
}

function monthLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );
}

export default function CalendarPage() {
  const { calendarView, events, setCalendarView } = useWorkspace();
  const [focusDate, setFocusDate] = useState("2026-03-13");
  const visibleEvents = events.filter((event) => event.date === focusDate);
  const nextUp = events.filter((event) => event.date >= focusDate).slice(0, 5);
  const focusMonthToken = focusDate.slice(5, 7);
  const eventTitlesByDate = new Map<string, typeof events>();

  events.forEach((event) => {
    eventTitlesByDate.set(event.date, [...(eventTitlesByDate.get(event.date) ?? []), event]);
  });

  return (
    <div className="grid gap-2.5 2xl:grid-cols-[minmax(0,1fr)_300px]">
      <section className="shell-panel rounded-[18px] p-3">
        <div className="border-subtle flex flex-col gap-3 border-b pb-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <h1 className="text-main text-[30px] font-semibold tracking-[-0.08em] sm:text-[34px]">
              {monthLabel(focusDate)}
            </h1>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-end">
            <div className="flex gap-1.5">
              <Button size="sm" onClick={() => setFocusDate("2026-03-13")}>
                Today
              </Button>
              <Button
                size="sm"
                onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? -28 : -7))}
              >
                Prev
              </Button>
              <Button
                size="sm"
                onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? 28 : 7))}
              >
                Next
              </Button>
            </div>
            <SegmentedControl
              items={calendarViews.map((view) => ({ label: view, value: view }))}
              value={calendarView}
              onChange={setCalendarView}
            />
          </div>
        </div>

        <div className="pt-3">
          {calendarView === "Month" ? (
            <div className="space-y-1.5">
              <div className="grid grid-cols-7 gap-1.5 px-0.5">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
                  <div key={label} className="text-faint px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                    {label}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {buildMonthCells(focusDate).map((date) => {
                  const items = eventTitlesByDate.get(date) ?? [];
                  const active = date === focusDate;
                  const inMonth = date.slice(5, 7) === focusMonthToken;

                  return (
                    <button
                      key={date}
                      onClick={() => setFocusDate(date)}
                      className={`min-h-[132px] rounded-[12px] border px-2.5 py-2.5 text-left ${
                        active
                          ? "surface-strong"
                          : "border-[var(--border)] bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[17px] font-semibold tracking-[-0.04em] ${inMonth ? "text-main" : "text-faint"}`}>
                          {Number(date.slice(-2))}
                        </span>
                        <span className="text-faint text-[10px] uppercase tracking-[0.14em]">
                          {dayName(date, "narrow")}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {items.slice(0, 2).map((item) => (
                          <div key={item.id} className="surface-soft rounded-[9px] px-2 py-1.5">
                            <p className="text-main truncate text-[11px] font-medium">{item.title}</p>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {calendarView === "Week" ? (
            <div className="grid gap-1.5 lg:grid-cols-7">
              {buildWeekDays(focusDate).map((date) => {
                const items = eventTitlesByDate.get(date) ?? [];
                const active = date === focusDate;

                return (
                  <button
                    key={date}
                    onClick={() => setFocusDate(date)}
                    className={`min-h-[360px] rounded-[12px] border px-2.5 py-2.5 text-left ${
                      active
                        ? "surface-strong"
                        : "border-[var(--border)] bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover)]"
                    }`}
                  >
                    <p className="text-faint text-[10px] uppercase tracking-[0.14em]">{dayName(date)}</p>
                    <p className="text-main mt-1.5 text-[24px] font-semibold tracking-[-0.07em]">
                      {Number(date.slice(-2))}
                    </p>
                    <div className="mt-3 space-y-1.5">
                      {items.length ? (
                        items.map((item) => (
                          <div key={item.id} className="surface-soft rounded-[9px] px-2 py-1.5">
                            <p className="text-main text-[11px] font-medium">{item.title}</p>
                          </div>
                        ))
                      ) : (
                        <div className="border-subtle text-faint rounded-[9px] border border-dashed px-2 py-1.5 text-[11px] uppercase tracking-[0.12em]">
                          Open
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}

          {calendarView === "Day" ? (
            <div className="space-y-1.5">
              {(visibleEvents.length ? visibleEvents : nextUp).map((event) => (
                <div key={event.id} className="shell-card rounded-[12px] px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-main text-sm font-medium">{event.title}</p>
                    <p className="text-faint text-[11px] font-medium uppercase tracking-[0.12em]">
                      {event.timeRange}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {calendarView === "Agenda" ? (
            <div className="space-y-1.5">
              {events.map((event) => (
                <div key={event.id} className="shell-card rounded-[12px] px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-main text-sm font-medium">{event.title}</p>
                    <p className="text-faint text-[11px] font-medium uppercase tracking-[0.12em]">
                      {formatDisplayDate(event.date)} · {event.timeRange.split(" - ")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <aside className="shell-panel rounded-[18px] p-3">
        <div className="flex h-full flex-col">
          <section className="border-subtle border-b pb-3">
            <h2 className="text-main text-[24px] font-semibold tracking-[-0.06em]">
              {formatDisplayDate(focusDate)}
            </h2>
            <div className="mt-3 space-y-1.5">
              {(visibleEvents.length ? visibleEvents : []).map((event) => (
                <div key={event.id} className="surface-soft rounded-[10px] px-2.5 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-main text-sm font-medium">{event.title}</p>
                    <p className="text-faint text-[11px] font-medium">{event.timeRange.split(" - ")[0]}</p>
                  </div>
                </div>
              ))}
              {!visibleEvents.length ? (
                <div className="border-subtle text-faint rounded-[10px] border border-dashed px-2.5 py-2.5 text-sm">
                  Empty
                </div>
              ) : null}
            </div>
          </section>

          <section className="flex-1 pt-3">
            <p className="eyebrow">Next</p>
            <div className="mt-3 space-y-1.5">
              {nextUp.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setFocusDate(event.date)}
                  className="surface-soft block w-full rounded-[10px] px-2.5 py-2.5 text-left hover:bg-[var(--button-secondary-hover)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-main truncate text-sm font-medium">{event.title}</p>
                      <p className="text-faint mt-0.5 text-[10px] uppercase tracking-[0.12em]">
                        {formatDisplayDate(event.date)} · {event.timeRange.split(" - ")[0]}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
