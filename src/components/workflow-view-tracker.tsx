'use client';

import { useEffect } from 'react';

interface WorkflowViewTrackerProps {
    workflowId: string;
}

export function WorkflowViewTracker({ workflowId }: WorkflowViewTrackerProps) {
    useEffect(() => {
        // Track the view when component mounts
        const trackView = async () => {
            try {
                await fetch(`/api/workflows/${workflowId}/view`, {
                    method: 'POST',
                });
            } catch (error) {
                // Silently fail - view tracking is not critical
                console.error('Failed to track view:', error);
            }
        };

        trackView();
    }, [workflowId]);

    // This component doesn't render anything
    return null;
}