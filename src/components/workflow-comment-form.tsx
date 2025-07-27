'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Loader2, Send, Reply } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface WorkflowCommentFormProps {
    workflowId: string;
    parentId?: string;
    isReply?: boolean;
    isAuthenticated: boolean;
}

export function WorkflowCommentForm({
    workflowId,
    parentId,
    isReply = false,
    isAuthenticated
}: WorkflowCommentFormProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(!isReply);
    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmitComment = async () => {
        if (!isAuthenticated) {
            toast.error('Please sign in to comment');
            return;
        }

        if (!content.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(`/api/workflows/${workflowId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content.trim(),
                    parentId: parentId || null,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Comment posted successfully');
                setContent('');
                if (isReply) {
                    setShowForm(false);
                }
                router.refresh(); // Refresh the page to show updated comments
            } else {
                toast.error(data.error || 'Failed to post comment');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        if (isReply) return null;

        return (
            <div className="text-center py-4 border rounded-lg bg-muted/50">
                <p className="text-muted-foreground">
                    Please sign in to leave a comment
                </p>
            </div>
        );
    }

    if (isReply && !showForm) {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(true)}
                className="h-6 px-2 text-xs"
            >
                <Reply className="h-3 w-3 mr-1" />
                Reply
            </Button>
        );
    }

    return (
        <div className={`space-y-3 ${isReply ? 'mt-3' : ''}`}>
            <div className="flex items-start gap-3">
                {user && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImageUrl || ''} />
                        <AvatarFallback>
                            {(user.displayName || user.primaryEmail)?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                )}
                <div className="flex-1">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={isReply ? "Write a reply..." : "Share your thoughts about this workflow..."}
                        rows={isReply ? 2 : 3}
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    onClick={handleSubmitComment}
                    disabled={submitting || !content.trim()}
                    size="sm"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Posting...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            {isReply ? 'Reply' : 'Post Comment'}
                        </>
                    )}
                </Button>
                {isReply && (
                    <Button
                        variant="outline"
                        onClick={() => {
                            setShowForm(false);
                            setContent('');
                        }}
                        disabled={submitting}
                        size="sm"
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </div>
    );
}