'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProjectSidebar } from '@/components/features/ProjectSidebar';
import { KanbanBoard } from '@/components/features/KanbanBoard';
import { useProjectStore } from '@/stores/projectStore';

const ProjectView = () => {
    const { data: session } = useSession();
    const { projects } = useProjectStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading check
        if (session !== undefined) {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1) text-white font-sans items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex h-full overflow-hidden">
            <ProjectSidebar />
            <KanbanBoard />
        </div>
    );
};

export default ProjectView;