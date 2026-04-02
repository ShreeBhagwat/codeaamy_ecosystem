import React, { useState, useEffect } from 'react';
import { useTaskMaster } from '../../../context/TaskContext';
import { Clock, Tag } from 'lucide-react';

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Timeline = ({ generateTrigger }) => {
  const { tasks, updateTaskStatus, updateTask } = useTaskMaster();
  const [schedule, setSchedule] = useState([]);

  // Filter tasks to only those not completed.
  // We grab context on load, or when generateTrigger changes.
  useEffect(() => {
    if (generateTrigger === 0 && schedule.length > 0) return; // Prevent overwriting existing schedule unnecessarilly if just routing back

    const activeTasks = tasks.filter(t => t.status !== 'Completed');
    
    // Sort tasks by priority (High -> Medium -> Low), then due date.
    const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    const sorted = [...activeTasks].sort((a, b) => {
      const pDiff = (priorityWeight[b.priority] || 1) - (priorityWeight[a.priority] || 1);
      if (pDiff !== 0) return pDiff;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    // Assume 9 AM start time today (or current time if later)
    let currentTime = new Date();
    currentTime.setHours(9, 0, 0, 0);
    
    if (new Date().getHours() >= 9) {
      currentTime = new Date();
      // Round to next 30 min block
      const minutes = currentTime.getMinutes();
      if (minutes > 0) {
        currentTime.setMinutes(minutes > 30 ? 60 : 30);
        currentTime.setSeconds(0);
        currentTime.setMilliseconds(0);
      }
    }

    const newSchedule = sorted.map(task => {
      const start = new Date(currentTime);
      
      // Default duration: High = 2 hours, Medium = 1 hour, Low = 30 mins
      let durationMs = 3600000; // 1 hr default
      if (task.priority === 'High') durationMs = 7200000;
      if (task.priority === 'Low') durationMs = 1800000;

      const end = new Date(start.getTime() + durationMs);
      
      const scheduledBlock = {
        ...task,
        startTime: start,
        endTime: end,
        timeString: `${formatTime(start)} - ${formatTime(end)}`
      };

      // Move time forward for next task (plus 15 min buffer)
      currentTime = new Date(end.getTime() + 15 * 60000);
      return scheduledBlock;
    });

    setSchedule(newSchedule);

    // Sync back to TaskMaster context softly (optional, but requested in workflow "Sync Back to TaskMaster: Scheduled time")
    newSchedule.forEach(schTask => {
      if (schTask.scheduledTime !== schTask.timeString) {
        updateTask(schTask.id, { scheduledTime: schTask.timeString });
      }
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateTrigger]); // Intentionally don't want to re-run automatically when tasks edit unless requested or initial load

  // Re-sync schedule locally if tasks are marked complete directly from timeline.
  const handleStatusChange = (id, status) => {
    updateTaskStatus(id, status);
    if (status === 'Completed') {
      setSchedule(prev => prev.filter(t => t.id !== id));
    } else {
      setSchedule(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg">Today's Schedule</h2>
        <p className="text-secondary">Your prioritized timeline for the day.</p>
      </header>

      {schedule.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Tag size={48} className="text-muted" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>No Tasks Scheduled</h3>
          <p className="text-secondary" style={{ maxWidth: '400px', margin: '0 auto' }}>
            It looks like your day is clear! Use TaskMaster to add tasks or hit "Plan My Day" to generate a schedule from existing tasks.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <div style={{ position: 'absolute', left: '140px', top: '2rem', bottom: '2rem', width: '2px', background: 'var(--border-light)', zIndex: 0 }}></div>

          {schedule.map((taskBlock) => (
            <div key={taskBlock.id} style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
              
              {/* Time Section */}
              <div style={{ width: '120px', textAlign: 'right', paddingTop: '1.5rem' }}>
                <p style={{ fontWeight: 600, margin: 0 }}>{formatTime(taskBlock.startTime)}</p>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>{formatTime(taskBlock.endTime)}</p>
              </div>

              {/* Timeline Dot */}
              <div style={{ position: 'relative', paddingTop: '1.5rem' }}>
                <div style={{ 
                  width: '16px', height: '16px', borderRadius: '50%', 
                  background: 'var(--bg-main)', border: '4px solid var(--accent-primary)',
                  position: 'absolute', left: '-25px'
                }}></div>
              </div>

              {/* Task Card details */}
              <div className="glass-card" style={{ flex: 1, padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>{taskBlock.title}</h3>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
                    background: taskBlock.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : taskBlock.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: taskBlock.priority === 'High' ? 'var(--danger)' : taskBlock.priority === 'Medium' ? 'var(--warning)' : 'var(--info)'
                  }}>
                    {taskBlock.priority || 'Low'}
                  </span>
                </div>
                
                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  {taskBlock.description || 'No description provided.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <Clock size={16} className="text-warning" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{taskBlock.status}</span>
                  </div>
                  
                  <select 
                    className="select" 
                    style={{ width: 'auto', padding: '0.5rem', fontSize: '0.875rem' }}
                    value={taskBlock.status}
                    onChange={(e) => handleStatusChange(taskBlock.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Complete Task</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
