'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Play, X } from "lucide-react";

interface YouTubeEmbedProps {
  url?: string;
  onUrlChange?: (url: string) => void;
  className?: string;
  editable?: boolean;
  aspectRatio?: 'video' | 'square';
}

export function YouTubeEmbed({
  url,
  onUrlChange,
  className,
  editable = false,
  aspectRatio = 'video'
}: YouTubeEmbedProps) {
  const [inputUrl, setInputUrl] = React.useState(url || '');
  const [isEditing, setIsEditing] = React.useState(!url && editable);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = url ? extractVideoId(url) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  const handleSave = () => {
    if (onUrlChange) {
      onUrlChange(inputUrl);
    }
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (onUrlChange) {
      onUrlChange('');
    }
    setInputUrl('');
    setIsEditing(true);
  };

  if (isEditing || !url) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="youtube-url">YouTube Video URL</Label>
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Paste a YouTube video URL to embed a demo video
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!inputUrl.trim()}>
                Add Video
              </Button>
              {url && (
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardContent className="p-0 relative group">
        <div className={cn(
          "relative",
          aspectRatio === 'video' ? "aspect-video" : "aspect-square"
        )}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="YouTube video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : thumbnailUrl ? (
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 rounded-full p-4">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Invalid YouTube URL</p>
            </div>
          )}
          
          {editable && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}