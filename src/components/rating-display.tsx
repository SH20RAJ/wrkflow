'use client';

import { Star } from 'lucide-react';

interface RatingDisplayProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    className?: string;
}

export function RatingDisplay({
    rating,
    maxRating = 5,
    size = 'md',
    showValue = true,
    className = ''
}: RatingDisplayProps) {
    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    const starSize = sizeClasses[size];

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: maxRating }, (_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= Math.floor(rating);
                const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;

                return (
                    <div key={index} className="relative">
                        <Star
                            className={`${starSize} ${isFilled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                        />
                        {isHalfFilled && (
                            <Star
                                className={`${starSize} absolute top-0 left-0 fill-yellow-400 text-yellow-400`}
                                style={{ clipPath: 'inset(0 50% 0 0)' }}
                            />
                        )}
                    </div>
                );
            })}
            {showValue && (
                <span className="text-sm text-muted-foreground ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}