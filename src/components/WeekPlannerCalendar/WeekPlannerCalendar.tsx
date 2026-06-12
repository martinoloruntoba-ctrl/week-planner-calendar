// src/components/WeekPlannerCalendar/WeekPlannerCalendar.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

import {
  WeekPlannerCalendarProps,
  WeekPlannerTheme,
} from './WeekPlannerCalendar.types';

import {
  getWeekDays,
  groupRunsByDate,
  formatHeading,
  canStartRun,
  canMarkDidntRun,
} from './WeekPlannerCalendar.helpers';

import { createStyles } from './WeekPlannerCalendar.styles';

const defaultTheme: WeekPlannerTheme = {
  background: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#666666',
  runMarker: '#FF7A00',
  todayRing: '#007AFF',
  cardBackground: '#F7F7F7',
  accent: '#007AFF',
  muted: '#BBBBBB',
};

export const WeekPlannerCalendar: React.FC<WeekPlannerCalendarProps> = ({
  weekStartDate,
  today,
  runs,
  onAddRunForDate,
  onRunPress,
  onStartRun,
  onDidntRun,
  onWeekChange,
  renderHeader,
  testID = 'week-planner-calendar',
}) => {
  const theme = defaultTheme;
  const styles = createStyles(theme);

  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const weekDays = getWeekDays(weekStartDate);
  const runsByDate = groupRunsByDate(runs);

  const markedDates = weekDays.reduce((acc, date) => {
    const dayRuns = runsByDate[date] || [];
    const hasRuns = dayRuns.length > 0;

    acc[date] = {
      marked: hasRuns,
      dots: hasRuns
        ? dayRuns.map(() => ({ color: theme.runMarker }))
        : undefined,
      selected: expandedDay === date,
      selectedColor: theme.todayRing,
    };

    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={styles.container} testID={testID}>
      {renderHeader?.()}

      <CalendarProvider
        date={weekStartDate}
        onDateChanged={(newDate: string) => {
          const newWeek = getWeekDays(newDate);
          const newMonday = newWeek[0];
          onWeekChange(newMonday);
        }}
      >
        <ExpandableCalendar
          firstDay={1}
          markedDates={markedDates}
          onDayPress={(day: { dateString: string }) => {
            setExpandedDay((prev) =>
              prev === day.dateString ? null : day.dateString
            );
          }}
        />
      </CalendarProvider>

      {expandedDay && (
        <View
          style={styles.dayDetailContainer}
          accessibilityLabel={`Details for ${expandedDay}`}
          accessibilityState={{ expanded: true }}
        >
          <Text style={styles.dayHeading}>{formatHeading(expandedDay)}</Text>

          {(runsByDate[expandedDay] || []).map((run) => (
            <TouchableOpacity
              key={run.id}
              style={styles.runCard}
              onPress={() => onRunPress(run)}
              accessibilityRole="button"
              accessibilityLabel={`Run: ${run.label}`}
            >
              <Text
                style={
                  run.status === 'skipped'
                    ? styles.runLabelSkipped
                    : styles.runLabel
                }
              >
                {run.label}
              </Text>

              <View style={styles.statusPill}>
                <Text style={styles.statusText}>
                  {run.status === 'planned' && 'Planned'}
                  {run.status === 'started' && 'In progress'}
                  {run.status === 'completed' && 'Done'}
                  {run.status === 'skipped' && "Didn't run"}
                </Text>
              </View>

              <Text style={styles.gelText}>
                {run.gelCount === 0
                  ? 'No gel needed'
                  : `${run.gelCount} gels`}
              </Text>

              <View style={styles.buttonRow}>
                {canStartRun(run, today) && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => onStartRun(run)}
                    accessibilityRole="button"
                    accessibilityLabel="Start run"
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                )}

                {canMarkDidntRun(run, today) && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => onDidntRun(run)}
                    accessibilityRole="button"
                    accessibilityLabel="Mark as didn't run"
                  >
                    <Text style={styles.buttonText}>Didn't run</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.addRunButton}
            onPress={() => onAddRunForDate(expandedDay)}
            accessibilityRole="button"
            accessibilityLabel="Add run"
          >
            <Text style={styles.addRunText}>+ Add run</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
