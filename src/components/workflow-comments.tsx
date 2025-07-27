'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Loader2, MessageCircle, Reply, Send } from 'lucide-react';

interface Comment {
    id: string;
    content: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName: string | null;
    userEmail: string | null;
    userAvatar: string | null;
    replies?: Comment[];
}

interface WorkflowCommentsProps {
    workflowId: string;
}

export function WorkflowComments({ workflowId }: WorkflowCommentsProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        fetchComments();
    }, [workflowId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/workflows/${workflowId}/comments`);
            const data = await response.json();

            if (data.success) {
                setComments(data.comments);
                setTotal(data.total);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            toast.error('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (content: string, parentId?: string) => {
        if (!user) {
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

                // Reset form
                if (parentId) {
                    setReplyContent('');
                    setReplyingTo(null);
                } else {
                    setNewComment('');
                }

                // Refresh comments
                fetchComments();
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInHours * 60);
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            const hours = Math.floor(diffInHours);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
        <div className={`${isReply ? 'ml-8 border-l-2 border-muted pl-4' : ''}`}>
            <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.userAvatar || ''} />
                    <AvatarFallback>
                        {(comment.userName || comment.userEmail)?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                            {comment.userName || comment.userEmail}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {formatDate(comment.createdAt)}
                        </span>
                    </div>
                    <p className="text-sm mb-2 whitespace-pre-wrap">
                        {comment.content}
                    </p>
                    {!isReply && user && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(comment.id)}
                            className="h-6 px-2 text-xs"
                        >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                        </Button>
                    )}

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                        <div className="mt-3 space-y-2">
                            <Textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write a reply..."
                                rows={2}
                                className="text-sm"
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => handleSubmitComment(replyContent, comment.id)}
                                    disabled={submitting || !replyContent.trim()}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-3 w-3 mr-1" />
                                            Reply
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent('');
                                    }}
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments
                </CardTitle>
                <CardDescription>
                    {total > 0
                        ? `${total} comment${total !== 1 ? 's' : ''}`
                        : 'No comments yet'
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* New Comment Form */}
                {user ? (
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.profileImageUrl || ''} />
                                <AvatarFallback>
                                    {(user.displayName || user.primaryEmail)?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Share your thoughts about this workflow..."
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => handleSubmitComment(newComment)}
                                disabled={submitting || !newComment.trim()}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Post Comment
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 border rounded-lg bg-muted/50">
                        <p className="text-muted-foreground">
                            Please sign in to leave a comment
                        </p>
                    </div>
                )}

                {/* Comments List */}
                {comments.length > 0 ? (
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                            No comments yet. Be the first to share your thoughts!
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}