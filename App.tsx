// App.tsx

import React, { useState } from 'react';
import { View } from 'react-native';
import { WeekPlannerCalendar } from './src/components/WeekPlannerCalendar/WeekPlannerCalendar';
import { PlannerRun } from './src/components/WeekPlannerCalendar/WeekPlannerCalendar.types';

export default function App() {
  // Today for demo purposes
  const today = '2026-06-17';

  // Week start (must be a Monday)
  const [weekStartDate, setWeekStartDate] = useState('2026-06-15');

  // Full sample data (matches onboarding spec exactly)
  const sampleRuns: PlannerRun[] = [
    // Monday — past completed
    {
      id: '1',
      date: '2026-06-15',
      label: 'Easy run · 6 km',
      gelCount: 1,
      status: 'completed',
    },

    // Tuesday — past skipped
    {
      id: '2',
      date: '2026-06-16',
      label: 'Intervals · 8 × 400m',
      gelCount: 2,
      status: 'skipped',
    },

    // Wednesday — today planned
    {
      id: '3',
      date: today,
      label: 'Long run · 18 km',
      gelCount: 3,
      status: 'planned',
    },

    // Wednesday — today started
    {
      id: '4',
      date: today,
      label: 'Recovery jog · 5 km',
      gelCount: 1,
      status: 'started',
    },

    // Friday — future day with two runs
    {
      id: '5',
      date: '2026-06-19',
      label: 'Tempo run · 10 km',
      gelCount: 2,
      status: 'planned',
    },
    {
      id: '6',
      date: '2026-06-19',
      label: 'Evening shakeout · 3 km',
      gelCount: 1,
      status: 'planned',
    },

    // Saturday — future day with gelCount = 0
    {
      id: '7',
      date: '2026-06-20',
      label: 'Short jog · 4 km',
      gelCount: 0,
      status: 'planned',
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <WeekPlannerCalendar
        weekStartDate={weekStartDate}
        today={today}
        runs={sampleRuns}
        onAddRunForDate={(date) => console.log('Add run for:', date)}
        onRunPress={(run) => console.log('Run pressed:', run)}
        onStartRun={(run) => console.log('Start run:', run)}
        onDidntRun={(run) => console.log("Didn't run:", run)}
        onWeekChange={(newWeek) => setWeekStartDate(newWeek)}
      />
    </View>
  );
}
