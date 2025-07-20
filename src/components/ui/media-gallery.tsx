'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { Input } from "./input";

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  onItemsChange: (items: MediaItem[]) => void;
  maxItems?: number;
  className?: string;
  allowUrlInput?: boolean;
  type?: 'image' | 'video' | 'mixed';
}

export function MediaGallery({
  items,
  onItemsChange,
  maxItems = 10,
  className,
  allowUrlInput = true,
  type = 'image'
}: MediaGalleryProps) {
  const [newUrl, setNewUrl] = React.useState('');
  const [showUrlInput, setShowUrlInput] = React.useState(false);

  const addUrlItem = () => {
    if (!newUrl.trim()) return;
    
    const newItem: MediaItem = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      type: type === 'mixed' ? 'image' : type
    };
    
    onItemsChange([...items, newItem]);
    setNewUrl('');
    setShowUrlInput(false);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    onItemsChange(
      items.map(item => 
        item.id === id ? { ...item, caption } : item
      )
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="relative group overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.caption || 'Media item'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.svg';
                    }}
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                )}
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3">
                <Input
                  placeholder="Add caption..."
                  value={item.caption || ''}
                  onChange={(e) => updateCaption(item.id, e.target.value)}
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        {items.length < maxItems && (
          <Card className="border-dashed border-2 hover:border-primary transition-colors">
            <CardContent className="p-0">
              <div className="aspect-square flex flex-col items-center justify-center">
                {allowUrlInput && !showUrlInput ? (
                  <Button
                    variant="ghost"
                    onClick={() => setShowUrlInput(true)}
                    className="h-full w-full flex-col gap-2"
                  >
                    <Plus className="w-8 h-8" />
                    <span className="text-sm">Add {type}</span>
                  </Button>
                ) : showUrlInput ? (
                  <div className="p-4 w-full space-y-2">
                    <Input
                      placeholder={`${type} URL`}
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addUrlItem();
                        if (e.key === 'Escape') setShowUrlInput(false);
                      }}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={addUrlItem}>
                        Add
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowUrlInput(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">No {type}s</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}