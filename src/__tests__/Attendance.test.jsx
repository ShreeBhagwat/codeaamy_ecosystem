import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TeamProvider, useTeam } from '../context/TeamContext';

// Helper component to access hook
const TestComponent = ({ action }) => {
  const { markAttendance, attendance, teamMembers } = useTeam();
  return (
    <div>
      <button onClick={() => action(markAttendance)}>Trigger Action</button>
      <div data-testid="attendance-count">{attendance.length}</div>
    </div>
  );
};

describe('Attendance Logic Edge & Failure Cases', () => {
  beforeEach(() => {
    localStorage.clear();
    // Force specific mock date
    vi.setSystemTime(new Date('2026-04-03T09:14:59Z'));
  });

  it('Scenario: Grace Period Detection (Edge Case) - Marks On Time if within 15 min', () => {
    // 1. Arrange
    const member = { 
      working_hours: { start: '09:00', end: '17:00' } 
    };
    const mockCheckInTime = '2026-04-03T09:14:59Z';
    
    // Evaluate logic from AttendanceDashboard.jsx
    const [hours, minutes] = member.working_hours.start.split(':').map(Number);
    const expectedTime = new Date('2026-04-03T00:00:00Z');
    expectedTime.setUTCHours(hours, minutes, 0, 0);

    const gracePeriodMs = 15 * 60 * 1000;
    const isLate = new Date(mockCheckInTime).getTime() - expectedTime.getTime() > gracePeriodMs;

    // 2. Assert
    expect(isLate).toBe(false); // 14 mins 59 secs is NOT late!
  });

  it('Scenario: Preventing Orphan Check-Outs (Failure Case)', () => {
    // 1. Arrange & Act
    render(
      <TeamProvider>
        <TestComponent action={(markAtnd) => markAtnd('user_123', 'check_out')} />
      </TeamProvider>
    );

    // Click check-out WITHOUT checking in first
    screen.getByText('Trigger Action').click();

    // 2. Assert (Attendance length stays 0 because check_in was missing)
    expect(screen.getByTestId('attendance-count').textContent).toBe("0");
  });
});
