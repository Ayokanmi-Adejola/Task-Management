
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, TaskStatus } from '@/types/kanban';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EditTaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (task: Task) => void;
}

const TAGS = ["Design", "UI/UX", "Dev", "Testing"];

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  task,
  open,
  onOpenChange,
  onUpdate
}) => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setSelectedTags(task.tags || []);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    if (task) {
      onUpdate({
        ...task,
        title: title.trim(),
        description: description.trim(),
        status,
        tags: selectedTags.length > 0 ? selectedTags : undefined
      });

      onOpenChange(false);
      toast.success('Task updated successfully');
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDelete = () => {
    if (task) {
      // Close the dialog
      onOpenChange(false);
      // We'll handle the actual deletion in the KanbanBoard component
      toast.success('Task deleted successfully');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "sm:max-w-md p-0 gap-0 shadow-xl border-none bg-gradient-to-b from-background to-muted/20",
        "duration-200 transition-all",
        isMobile && "w-[95%] rounded-2xl"
      )}>
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className={cn(
            "text-xl font-semibold tracking-tight",
            isMobile && "text-lg"
          )}>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Title</Label>
            <Input
              id="edit-title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                isMobile && "h-9 text-sm"
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Description (optional)</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className={cn(
                "min-h-24 border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                isMobile && "min-h-16 text-sm"
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-status" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TaskStatus)}
            >
              <SelectTrigger id="edit-status" className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                isMobile && "h-9 text-sm"
              )}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="doing">In Progress</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Tags (optional)</Label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer text-xs py-0.5 px-2",
                    isMobile && "text-[10px] py-0 px-1.5 h-5",
                    selectedTags.includes(tag) ? (
                      tag === 'Design' ? "bg-pink-100 text-pink-800" :
                      tag === 'UI/UX' ? "bg-purple-100 text-purple-800" :
                      tag === 'Dev' ? "bg-green-100 text-green-800" :
                      "bg-yellow-100 text-yellow-800"
                    ) : ""
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className={cn(
            "flex justify-between pt-4",
            isMobile && "pt-2"
          )}>
            <Button
              type="button"
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className={cn(
                "text-destructive hover:text-destructive hover:bg-destructive/10",
                "rounded-xl border-muted-foreground/20",
                isMobile && "h-9 text-sm px-3"
              )}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className={cn(
                  "rounded-xl border-muted-foreground/20",
                  "hover:bg-muted-foreground/5",
                  isMobile && "h-9 text-sm px-3"
                )}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size={isMobile ? "sm" : "default"}
                className={cn(
                  "rounded-xl bg-gradient-to-r from-primary to-primary/80",
                  "hover:opacity-90 transition-opacity",
                  isMobile && "h-9 text-sm px-3"
                )}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
