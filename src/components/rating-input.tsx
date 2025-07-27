'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
    value: number;
    onChange: (rating: number) => void;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

export function RatingInput({
    value,
    onChange,
    maxRating = 5,
    size = 'md',
    disabled = false,
    className = ''
}: RatingInputProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    const starSize = sizeClasses[size];

    const handleClick = (rating: number) => {
        if (!disabled) {
            onChange(rating);
        }
    };

    const handleMouseEnter = (rating: number) => {
        if (!disabled) {
            setHoverRating(rating);
        }
    };

    const handleMouseLeave = () => {
        if (!disabled) {
            setHoverRating(0);
        }
    };

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: maxRating }, (_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (hoverRating || value);

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        disabled={disabled}
                        className={`transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                            }`}
                    >
                        <Star
                            className={`${starSize} transition-colors ${isFilled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 hover:text-yellow-200'
                                }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}