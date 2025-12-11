import { DashboardData } from '@/types/dashboard';

interface CardActiveProjectsProps {
    projects: DashboardData['activeProjects'];
}

export const CardActiveProjects = ({ projects }: CardActiveProjectsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full bg-(--bg-2) rounded-xl shadow-lg p-6 text-(--text-1) h-full border border-(--border-1)">

            {projects.map((project, i) => {
                // Determine color based on index or project properties if available
                // For now, rotating colors to match the image style roughly
                const progressColor = i === 0 ? 'bg-(--priority-low-1)' : i === 1 ? 'bg-(--priority-medium-1)' : 'bg-(--priority-high-1)';

                return (
                    <div key={i} className="bg-(--bg-3) rounded-xl p-6 shadow-lg  hover:scale-102 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-base font-semibold text-(--text-1) mb-1">{project.name}</h4>
                                <span className="text-xs text-(--text-2)">{project.client}</span>
                            </div>
                            <span className="text-(--text-1) font-bold text-sm">{project.progress}%</span>
                        </div>

                        <div className="w-full bg-(--border-1) h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${progressColor}`}
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>
                );
            })}

        </div>
    );
}