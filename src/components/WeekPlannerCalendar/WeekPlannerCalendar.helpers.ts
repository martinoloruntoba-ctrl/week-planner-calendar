// src/components/WeekPlannerCalendar/WeekPlannerCalendar.helpers.ts

import { ISODate, PlannerRun } from './WeekPlannerCalendar.types';
import { addDays, format, isBefore, isEqual, parseISO, startOfWeek } from 'date-fns';

/** Convert ISO string → Date */
export const toDate = (iso: ISODate) => parseISO(iso);

/** Format date for heading: "Wednesday · Jun 17" */
export const formatHeading = (iso: ISODate) =>
  format(toDate(iso), 'EEEE · MMM d');

/** Get all 7 days of a week starting from Monday */
export const getWeekDays = (weekStart: ISODate): ISODate[] => {
  const start = toDate(weekStart);
  return Array.from({ length: 7 }).map((_, i) =>
    format(addDays(start, i), 'yyyy-MM-dd')
  );
};

/** Group runs by date */
export const groupRunsByDate = (runs: PlannerRun[]) => {
  const map: Record<ISODate, PlannerRun[]> = {};
  runs.forEach((run) => {
    if (!map[run.date]) map[run.date] = [];
    map[run.date].push(run);
  });
  return map;
};

/** Whether Start button should show */
export const canStartRun = (run: PlannerRun, today: ISODate) => {
  const runDate = toDate(run.date);
  const todayDate = toDate(today);
  return (
    (isBefore(runDate, todayDate) || isEqual(runDate, todayDate)) &&
    run.status === 'planned'
  );
};

/** Whether Didn't Run button should show */
export const canMarkDidntRun = (run: PlannerRun, today: ISODate) => {
  const runDate = toDate(run.date);
  const todayDate = toDate(today);
  return (
    (isBefore(runDate, todayDate) || isEqual(runDate, todayDate)) &&
    (run.status === 'started' || run.status === 'completed')
  );
};
