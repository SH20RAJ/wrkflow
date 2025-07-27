import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingDisplay } from './rating-display';
import { MessageSquare } from 'lucide-react';
import { getDB } from '@/lib/db';
import { ratings, users } from '@/lib/db/schema';
import { eq, desc, avg, count } from 'drizzle-orm';
import { WorkflowRatingForm } from './workflow-rating-form';

interface Rating {
    id: string;
    rating: number;
    review: string | null;
    createdAt: Date | null;
    userId: string;
    userName: string | null;
    userEmail: string | null;
    userAvatar: string | null;
}

interface RatingStats {
    averageRating: number;
    totalRatings: number;
}

interface WorkflowRatingsServerProps {
    workflowId: string;
    currentUserId?: string;
}

export async function WorkflowRatingsServer({ workflowId, currentUserId }: WorkflowRatingsServerProps) {
    const db = getDB();

    // Get all ratings with user info
    const workflowRatings = await db
        .select({
            id: ratings.id,
            rating: ratings.rating,
            review: ratings.review,
            createdAt: ratings.createdAt,
            userId: ratings.userId,
            userName: users.name,
            userEmail: users.email,
            userAvatar: users.avatar,
        })
        .from(ratings)
        .leftJoin(users, eq(ratings.userId, users.id))
        .where(eq(ratings.workflowId, workflowId))
        .orderBy(desc(ratings.createdAt));

    // Get rating statistics
    const [stats] = await db
        .select({
            averageRating: avg(ratings.rating),
            totalRatings: count(ratings.id),
        })
        .from(ratings)
        .where(eq(ratings.workflowId, workflowId));

    const ratingStats: RatingStats = {
        averageRating: stats.averageRating ? Number(stats.averageRating) : 0,
        totalRatings: stats.totalRatings || 0,
    };

    // Find current user's existing rating
    const userExistingRating = currentUserId
        ? workflowRatings.find(r => r.userId === currentUserId)
        : null;

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
                        {ratingStats.totalRatings > 0
                            ? `${ratingStats.totalRatings} rating${ratingStats.totalRatings !== 1 ? 's' : ''}`
                            : 'No ratings yet'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        {ratingStats.totalRatings > 0 ? (
                            <>
                                <div className="text-3xl font-bold">
                                    {ratingStats.averageRating.toFixed(1)}
                                </div>
                                <div>
                                    <RatingDisplay rating={ratingStats.averageRating} size="lg" showValue={false} />
                                    <p className="text-sm text-muted-foreground">
                                        Based on {ratingStats.totalRatings} review{ratingStats.totalRatings !== 1 ? 's' : ''}
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
                    <div className="border-t pt-4">
                        <WorkflowRatingForm
                            workflowId={workflowId}
                            existingRating={userExistingRating}
                            isAuthenticated={!!currentUserId}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Reviews List */}
            {workflowRatings.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {workflowRatings.map((rating) => (
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
                                                    {rating.createdAt ? new Date(rating.createdAt).toLocaleDateString() : 'Unknown date'}
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