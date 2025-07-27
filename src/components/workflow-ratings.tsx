'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingDisplay } from './rating-display';
import { RatingInput } from './rating-input';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Loader2, MessageSquare } from 'lucide-react';

interface Rating {
    id: string;
    rating: number;
    review: string | null;
    createdAt: string;
    userId: string;
    userName: string | null;
    userEmail: string | null;
    userAvatar: string | null;
}

interface RatingStats {
    averageRating: number;
    totalRatings: number;
}

interface WorkflowRatingsProps {
    workflowId: string;
}

export function WorkflowRatings({ workflowId }: WorkflowRatingsProps) {
    const { user } = useAuth();
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [stats, setStats] = useState<RatingStats>({ averageRating: 0, totalRatings: 0 });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');
    const [userExistingRating, setUserExistingRating] = useState<Rating | null>(null);

    useEffect(() => {
        fetchRatings();
    }, [workflowId]);

    const fetchRatings = async () => {
        try {
            const response = await fetch(`/api/workflows/${workflowId}/ratings`);
            const data = await response.json();

            if (data.success) {
                setRatings(data.ratings);
                setStats(data.stats);

                // Check if current user has already rated
                if (user) {
                    const existingRating = data.ratings.find((r: Rating) => r.userId === user.id);
                    if (existingRating) {
                        setUserExistingRating(existingRating);
                        setUserRating(existingRating.rating);
                        setUserReview(existingRating.review || '');
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching ratings:', error);
            toast.error('Failed to load ratings');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitRating = async () => {
        if (!user) {
            toast.error('Please sign in to rate this workflow');
            return;
        }

        if (userRating === 0) {
            toast.error('Please select a rating');
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(`/api/workflows/${workflowId}/ratings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: userRating,
                    review: userReview.trim() || null,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                setShowRatingForm(false);
                fetchRatings(); // Refresh ratings
            } else {
                toast.error(data.error || 'Failed to save rating');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error('Failed to save rating');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancelRating = () => {
        setShowRatingForm(false);
        if (userExistingRating) {
            setUserRating(userExistingRating.rating);
            setUserReview(userExistingRating.review || '');
        } else {
            setUserRating(0);
            setUserReview('');
        }
    };

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
        <div className="space-y-6">
            {/* Rating Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Ratings & Reviews
                    </CardTitle>
                    <CardDescription>
                        {stats.totalRatings > 0
                            ? `${stats.totalRatings} rating${stats.totalRatings !== 1 ? 's' : ''}`
                            : 'No ratings yet'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        {stats.totalRatings > 0 ? (
                            <>
                                <div className="text-3xl font-bold">
                                    {stats.averageRating.toFixed(1)}
                                </div>
                                <div>
                                    <RatingDisplay rating={stats.averageRating} size="lg" showValue={false} />
                                    <p className="text-sm text-muted-foreground">
                                        Based on {stats.totalRatings} review{stats.totalRatings !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-muted-foreground">Be the first to rate this workflow!</p>
                            </div>
                        )}
                    </div>

                    {/* User Rating Form */}
                    {user && (
                        <div className="border-t pt-4">
                            {!showRatingForm ? (
                                <div className="flex items-center justify-between">
                                    {userExistingRating ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Your rating:</span>
                                            <RatingDisplay rating={userExistingRating.rating} size="sm" />
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">
                                            Rate this workflow
                                        </span>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowRatingForm(true)}
                                    >
                                        {userExistingRating ? 'Update Rating' : 'Add Rating'}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Your Rating
                                        </label>
                                        <RatingInput
                                            value={userRating}
                                            onChange={setUserRating}
                                            size="md"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Review (Optional)
                                        </label>
                                        <Textarea
                                            value={userReview}
                                            onChange={(e) => setUserReview(e.target.value)}
                                            placeholder="Share your experience with this workflow..."
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleSubmitRating}
                                            disabled={submitting || userRating === 0}
                                            size="sm"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                'Submit Rating'
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleCancelRating}
                                            disabled={submitting}
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Reviews List */}
            {ratings.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {ratings.map((rating) => (
                                <div key={rating.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={rating.userAvatar || ''} />
                                            <AvatarFallback>
                                                {(rating.userName || rating.userEmail)?.charAt(0)?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-sm">
                                                    {rating.userName || rating.userEmail}
                                                </span>
                                                <RatingDisplay rating={rating.rating} size="sm" showValue={false} />
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(rating.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {rating.review && (
                                                <p className="text-sm text-muted-foreground">
                                                    {rating.review}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}