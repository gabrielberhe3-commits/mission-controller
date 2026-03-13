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
  const nextUp = events.filter((event) => event.date >= focusDate).slice(0, 6);
  const focusMonthToken = focusDate.slice(5, 7);
  const eventTitlesByDate = new Map<string, typeof events>();

  events.forEach((event) => {
    eventTitlesByDate.set(event.date, [...(eventTitlesByDate.get(event.date) ?? []), event]);
  });

  return (
    <div className="space-y-3">
      <section className="shell-panel rounded-[20px] p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="eyebrow">Calendar</p>
            <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.08em] text-white sm:text-[50px]">
              Schedule
            </h1>
            <p className="mt-2 text-sm text-[#878787]">{monthLabel(focusDate)}</p>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="flex gap-2">
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
      </section>

      <div className="grid gap-3 2xl:grid-cols-[minmax(0,1.8fr)_340px]">
        <section className="shell-panel rounded-[20px] p-3 sm:p-4">
          {calendarView === "Month" ? (
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-2 px-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
                  <div key={label} className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#666]">
                    {label}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {buildMonthCells(focusDate).map((date) => {
                  const items = eventTitlesByDate.get(date) ?? [];
                  const active = date === focusDate;
                  const inMonth = date.slice(5, 7) === focusMonthToken;

                  return (
                    <button
                      key={date}
                      onClick={() => setFocusDate(date)}
                      className={`min-h-[148px] rounded-[16px] border p-3 text-left ${
                        active
                          ? "border-white/16 bg-[#121212]"
                          : "border-white/6 bg-[#070707] hover:bg-[#0d0d0d]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-semibold tracking-[-0.04em] ${inMonth ? "text-white" : "text-[#4f4f4f]"}`}>
                          {Number(date.slice(-2))}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5f5f]">
                          {dayName(date, "narrow")}
                        </span>
                      </div>
                      <div className="mt-4 space-y-2">
                        {items.slice(0, 3).map((item) => (
                          <div key={item.id} className="rounded-[10px] border border-white/6 bg-[#101010] px-2.5 py-2">
                            <p className="truncate text-[11px] font-medium text-white">{item.title}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#707070]">
                              {item.timeRange.split(" - ")[0]}
                            </p>
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
            <div className="grid gap-2 lg:grid-cols-7">
              {buildWeekDays(focusDate).map((date) => {
                const items = eventTitlesByDate.get(date) ?? [];
                const active = date === focusDate;

                return (
                  <button
                    key={date}
                    onClick={() => setFocusDate(date)}
                    className={`min-h-[420px] rounded-[16px] border p-3 text-left ${
                      active
                        ? "border-white/16 bg-[#121212]"
                        : "border-white/6 bg-[#070707] hover:bg-[#0d0d0d]"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">{dayName(date)}</p>
                    <p className="mt-2 text-[28px] font-semibold tracking-[-0.07em] text-white">
                      {Number(date.slice(-2))}
                    </p>
                    <div className="mt-4 space-y-2">
                      {items.length ? (
                        items.map((item) => (
                          <div key={item.id} className="rounded-[10px] border border-white/6 bg-[#101010] px-2.5 py-2">
                            <p className="text-[11px] font-medium text-white">{item.title}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#707070]">
                              {item.timeRange}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[10px] border border-dashed border-white/8 px-2.5 py-2 text-[11px] uppercase tracking-[0.14em] text-[#555]">
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
            <div className="space-y-2">
              {(visibleEvents.length ? visibleEvents : nextUp).map((event) => (
                <div key={event.id} className="shell-card rounded-[14px] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <p className="mt-1 text-sm text-[#878787]">{event.location}</p>
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#afafaf]">
                      {event.timeRange}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {calendarView === "Agenda" ? (
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event.id} className="shell-card rounded-[14px] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <p className="mt-1 text-sm text-[#878787]">{formatDisplayDate(event.date)}</p>
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#afafaf]">
                      {event.timeRange.split(" - ")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <aside className="space-y-3">
          <section className="shell-card rounded-[20px] p-4">
            <p className="eyebrow">Selected</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white">
              {formatDisplayDate(focusDate)}
            </h2>
            <div className="mt-4 space-y-2">
              {(visibleEvents.length ? visibleEvents : []).map((event) => (
                <div key={event.id} className="rounded-[12px] border border-white/6 bg-[#080808] px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-[11px] font-medium text-[#acacac]">{event.timeRange.split(" - ")[0]}</p>
                  </div>
                  <p className="mt-1 text-sm text-[#838383]">{event.location}</p>
                </div>
              ))}
              {!visibleEvents.length ? (
                <div className="rounded-[12px] border border-dashed border-white/8 px-3 py-3 text-sm text-[#666]">
                  No events
                </div>
              ) : null}
            </div>
          </section>

          <section className="shell-card rounded-[20px] p-4">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Next up</p>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#666]">6 items</span>
            </div>
            <div className="mt-4 space-y-2">
              {nextUp.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setFocusDate(event.date)}
                  className="block w-full rounded-[12px] border border-white/6 bg-[#080808] px-3 py-3 text-left hover:bg-[#101010]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{event.title}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#717171]">
                        {formatDisplayDate(event.date)}
                      </p>
                    </div>
                    <p className="shrink-0 text-[11px] font-medium text-[#acacac]">
                      {event.timeRange.split(" - ")[0]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
