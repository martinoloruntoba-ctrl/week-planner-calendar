// src/components/WeekPlannerCalendar/WeekPlannerCalendar.types.ts

/** ISO 8601 calendar date, no time component. Example: "2026-06-15". */
export type ISODate = string;

/**
 * One planned run that the calendar should display as a marker on its date.
 * The calendar treats this as opaque — it never inspects fields beyond `id`
 * and `date`. `label` and `gelCount` are used purely for the day-detail
 * pop-out.
 */
export interface PlannerRun {
  id: string;
  date: ISODate;
  /** Short label rendered on the day-detail card, e.g. "Long run · 18 km". */
  label: string;
  /**
   * Gel count for the run. The calendar shows it as a small badge on the
   * day-detail card. `0` should still render (as "No gel needed") because
   * every run must remain visible regardless of fueling need.
   */
  gelCount: number;
  /**
   * Lifecycle status. Drives the day-detail card visual treatment:
   * - 'planned': default
   * - 'started': accent border + "In progress" tag
   * - 'completed': muted + checkmark
   * - 'skipped': struck-through label
   */
  status: 'planned' | 'started' | 'completed' | 'skipped';
}

export interface WeekPlannerCalendarProps {
  /** The week the calendar is centered on. Always a Monday (ISO). */
  weekStartDate: ISODate;

  /** Today's date as the parent sees it. */
  today: ISODate;

  /** All planned runs to render. */
  runs: PlannerRun[];

  onAddRunForDate: (date: ISODate) => void;
  onRunPress: (run: PlannerRun) => void;
  onStartRun: (run: PlannerRun) => void;
  onDidntRun: (run: PlannerRun) => void;
  onWeekChange: (newWeekStartDate: ISODate) => void;

  renderHeader?: () => React.ReactNode;
  testID?: string;
}

/** Theme tokens — parent can override */
export interface WeekPlannerTheme {
  background: string;
  textPrimary: string;
  textSecondary: string;
  runMarker: string;
  todayRing: string;
  cardBackground: string;
  accent: string;
  muted: string;
}
