// components/CardUrgentTasks.jsx
export function CardUrgentTasks({ tasks }) {
  return (
    <div className="bg-(--bg-2) rounded-xl shadow-lg p-6 text-(--text-1) h-full border border-(--border-1)">
      <h4 className="text-lg font-semibold mb-6">Urgent Tasks</h4>
      <div className="space-y-4">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 rounded-lg bg-(--bg-3)  hover:bg-(--bg-3) hover:scale-102 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`w-1 h-12 rounded-full ${task.status === 'overdue' ? 'bg-(--priority-high-1)' :
                task.status === 'due-today' ? 'bg-(--priority-medium-1)' :
                  'bg-(--priority-low-1)'
                }`}></div>
              <div>
                <div className="font-medium text-(--text-1) text-sm md:text-base">{task.title}</div>
                <div className="text-xs text-(--text-2) mt-1">Project Titan/Client B</div>
              </div>
            </div>

            <div className="text-right min-w-[100px]">
              <div className={`font-medium text-sm ${task.status === 'overdue' ? 'text-(--priority-high-1)' :
                task.status === 'due-today' ? 'text-(--priority-medium-1)' :
                  'text-(--priority-low-1)'
                }`}>
                {task.statusText}
              </div>
              <div className="text-xs text-(--text-2) mt-1">{task.dueDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
