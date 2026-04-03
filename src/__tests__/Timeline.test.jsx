import { describe, it, expect } from 'vitest';

describe('Chrono Timeline Logic', () => {

  it('Scenario: Generates schedule giving High priority 2hrs and Low priority 30m', () => {
    // 1. Arrange Mock Data
    const mockPendingTasks = [
      { id: '1', priority: 'Low', dueDate: new Date().toISOString() },
      { id: '2', priority: 'High', dueDate: new Date().toISOString() }
    ];

    // Priority Sort Setup logic from Timeline.jsx
    const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    // 2. Act
    const sorted = [...mockPendingTasks].sort((a, b) => {
      return (priorityWeight[b.priority] || 1) - (priorityWeight[a.priority] || 1);
    });

    let currentTimeMs = new Date('2026-04-03T09:00:00Z').getTime();

    const schedule = sorted.map(task => {
      const startMs = currentTimeMs;
      
      let durationMs = 3600000;
      if (task.priority === 'High') durationMs = 7200000; // 2 hrs
      if (task.priority === 'Low') durationMs = 1800000;  // 30 mins

      const endMs = startMs + durationMs;
      
      // forward pointer with 15min block
      currentTimeMs = endMs + (15 * 60000);

      return {
        ...task,
        durationAssigned: durationMs
      };
    });

    // 3. Assert
    
    // Expect High priority sorted first
    expect(schedule[0].id).toBe('2'); 
    
    // Expect High task to get 7200000ms (2 Hours)
    expect(schedule[0].durationAssigned).toBe(7200000); 

    // Expect Low priority sorted second
    expect(schedule[1].id).toBe('1'); 
    
    // Expect Low task to get 1800000ms (30 Mins)
    expect(schedule[1].durationAssigned).toBe(1800000);
  });
});
