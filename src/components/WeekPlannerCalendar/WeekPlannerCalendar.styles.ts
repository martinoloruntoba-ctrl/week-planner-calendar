// WeekPlannerCalendar.styles.ts

import { StyleSheet } from 'react-native';
import { WeekPlannerTheme } from './WeekPlannerCalendar.types';

export const createStyles = (theme: WeekPlannerTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    dayDetailContainer: {
      marginTop: 12,
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.cardBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -2 },
      elevation: 4,
    },

    dayHeading: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: 16,
    },

    runCard: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 14,
      marginBottom: 14,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },

    runLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.textPrimary,
      marginBottom: 6,
    },

    runLabelSkipped: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.muted,
      textDecorationLine: 'line-through',
      marginBottom: 6,
    },

    statusPill: {
      alignSelf: 'flex-start',
      backgroundColor: theme.accent,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      marginBottom: 8,
    },

    statusText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },

    gelText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 12,
    },

    buttonRow: {
      flexDirection: 'row',
      gap: 10,
    },

    button: {
      backgroundColor: theme.accent,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
    },

    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },

    addRunButton: {
      marginTop: 10,
      backgroundColor: theme.accent,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },

    addRunText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
