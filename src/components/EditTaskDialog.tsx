
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
        "duration-200 transition-all max-h-[85vh] overflow-y-auto",
        isMobile && "w-[95%] max-w-[95%] rounded-2xl p-0"
      )}>
        <DialogHeader className="p-6 pb-2 sm:p-6 sm:pb-2">
          <DialogTitle className={cn(
            "text-xl font-semibold tracking-tight",
            isMobile && "text-lg"
          )}>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6 pt-2">
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
            )}>Description</Label>
            <Textarea
              id="edit-description"
              value={description}
                            onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm min-h-[100px]",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl resize-none",
                isMobile && "min-h-[80px] text-sm"
              )}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-xl",
                isMobile && "h-9 text-sm px-3"
              )}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className={cn(
                "rounded-xl bg-gradient-to-r from-primary to-primary/80",
                "hover:opacity-90 transition-opacity",
                isMobile && "h-9 text-sm px-3"
              )}
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;

