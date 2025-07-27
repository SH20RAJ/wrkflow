'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface JsonCopyButtonProps {
    jsonContent: string;
}

export function JsonCopyButton({ jsonContent }: JsonCopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonContent);
            setCopied(true);
            toast.success('JSON copied to clipboard!');

            // Reset the copied state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            toast.error('Failed to copy JSON');
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="absolute top-2 right-2"
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                </>
            )}
        </Button>
    );
}