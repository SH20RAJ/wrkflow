'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RatingDisplay } from './rating-display';
import { RatingInput } from './rating-input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ExistingRating {
    id: string;
    rating: number;
    review: string | null;
}

interface WorkflowRatingFormProps {
    workflowId: string;
    existingRating?: ExistingRating | null;
    isAuthenticated: boolean;
}

export function WorkflowRatingForm({ workflowId, existingRating, isAuthenticated }: WorkflowRatingFormProps) {
    const router = useRouter();
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [userRating, setUserRating] = useState(existingRating?.rating || 0);
    const [userReview, setUserReview] = useState(existingRating?.review || '');

    const handleSubmitRating = async () => {
        if (!isAuthenticated) {
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
                router.refresh(); // Refresh the page to show updated data
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
        if (existingRating) {
            setUserRating(existingRating.rating);
            setUserReview(existingRating.review || '');
        } else {
            setUserRating(0);
            setUserReview('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center py-4 border rounded-lg bg-muted/50">
                <p className="text-muted-foreground">
                    Please sign in to rate this workflow
                </p>
            </div>
        );
    }

    return (
        <div>
            {!showRatingForm ? (
                <div className="flex items-center justify-between">
                    {existingRating ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Your rating:</span>
                            <RatingDisplay rating={existingRating.rating} size="sm" />
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
                        {existingRating ? 'Update Rating' : 'Add Rating'}
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
    );
}