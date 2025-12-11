import { DashboardData } from '@/types/dashboard';
import { useLocaleStore } from '@/stores/localeStore';

interface CardUrgentTasksProps {
  tasks: DashboardData['urgentTasks'];
}

export function CardUrgentTasks({ tasks }: CardUrgentTasksProps) {
  const { messages } = useLocaleStore();
  const t = messages.dashboard.urgentTasks;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'overdue': return t.overdue;
      case 'due-today': return t.dueToday;
      case 'due-tomorrow': return t.dueTomorrow;
      default: return t.dueLater;
    }
  };

  return (
    <div className="bg-(--bg-2) rounded-xl shadow-lg p-6 text-(--text-1) h-full border border-(--border-1)">
      <h4 className="text-lg font-semibold mb-6">{t.title}</h4>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
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
                  <div className="text-xs text-(--text-2) mt-1">{task.project}/{task.client}</div>
                </div>
              </div>

              <div className="text-right min-w-[100px]">
                <div className={`font-medium text-sm ${task.status === 'overdue' ? 'text-(--priority-high-1)' :
                  task.status === 'due-today' ? 'text-(--priority-medium-1)' :
                    'text-(--priority-low-1)'
                  }`}>
                  {getStatusText(task.status)}
                </div>
                <div className="text-xs text-(--text-2) mt-1">{task.dueDate}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-(--text-2)">
            <p className="text-sm">{t.noTasks || 'No urgent tasks at the moment'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
