import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { TaskStatus } from '@/types/kanban';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreateTaskDialogProps {
  status: TaskStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (title: string, description: string, status: TaskStatus, tags?: string[]) => void;
}

const TAGS = ["Design", "UI/UX", "Dev", "Testing"];

const TAG_COLORS = {
  'Design': 'from-pink-500/20 to-pink-500/10 text-pink-700 border-pink-500/20 hover:bg-pink-500/10',
  'UI/UX': 'from-purple-500/20 to-purple-500/10 text-purple-700 border-purple-500/20 hover:bg-purple-500/10',
  'Dev': 'from-emerald-500/20 to-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/10',
  'Testing': 'from-amber-500/20 to-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/10'
};

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ status, open, onOpenChange, onCreate }) => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(status);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedStatus(status);
    setSelectedTags([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }
    
    onCreate(title.trim(), description.trim(), selectedStatus, selectedTags.length > 0 ? selectedTags : undefined);
    resetForm();
    onOpenChange(false);
    toast.success('Task created successfully');
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className={cn(
        "sm:max-w-[500px] p-0 gap-0 shadow-xl border-none bg-gradient-to-b from-background to-muted/20",
        "duration-200 transition-all",
        isMobile && "w-[95%] rounded-2xl"
      )}>
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className={cn(
            "text-xl font-semibold tracking-tight",
            isMobile && "text-lg"
          )}>Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Title</Label>
            <Input
              id="title"
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
            <Label htmlFor="description" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className={cn(
                "min-h-[100px] border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl resize-none",
                isMobile && "min-h-[80px] text-sm"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Status</Label>
            <Select 
              value={selectedStatus} 
              onValueChange={(value) => setSelectedStatus(value as TaskStatus)}
            >
              <SelectTrigger id="status" className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm rounded-xl",
                isMobile && "h-9 text-sm"
              )}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
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
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <Badge 
                  key={tag} 
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 rounded-lg px-3 py-1 border",
                    "hover:scale-105 active:scale-95",
                    selectedTags.includes(tag) 
                      ? `bg-gradient-to-r ${TAG_COLORS[tag as keyof typeof TAG_COLORS]}`
                      : "bg-background hover:bg-muted",
                    isMobile && "text-xs py-0.5"
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className={cn(
            "flex justify-end gap-2 pt-4",
            isMobile && "pt-2"
          )}>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-xl border-muted-foreground/20",
                "hover:bg-muted-foreground/5",
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
              <Plus className="w-4 h-4 mr-1" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { TaskStatus } from '@/types/kanban';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreateTaskDialogProps {
  status: TaskStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (title: string, description: string, status: TaskStatus, tags?: string[]) => void;
}

const TAGS = ["Design", "UI/UX", "Dev", "Testing"];

const TAG_COLORS = {
  'Design': 'from-pink-500/20 to-pink-500/10 text-pink-700 border-pink-500/20 hover:bg-pink-500/10',
  'UI/UX': 'from-purple-500/20 to-purple-500/10 text-purple-700 border-purple-500/20 hover:bg-purple-500/10',
  'Dev': 'from-emerald-500/20 to-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/10',
  'Testing': 'from-amber-500/20 to-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/10'
};

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ status, open, onOpenChange, onCreate }) => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(status);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedStatus(status);
    setSelectedTags([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }
    
    onCreate(title.trim(), description.trim(), selectedStatus, selectedTags.length > 0 ? selectedTags : undefined);
    resetForm();
    onOpenChange(false);
    toast.success('Task created successfully');
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className={cn(
        "sm:max-w-[500px] p-0 gap-0 shadow-xl border-none bg-gradient-to-b from-background to-muted/20",
        "duration-200 transition-all",
        isMobile && "w-[95%] rounded-2xl"
      )}>
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className={cn(
            "text-xl font-semibold tracking-tight",
            isMobile && "text-lg"
          )}>Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Title</Label>
            <Input
              id="title"
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
            <Label htmlFor="description" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className={cn(
                "min-h-[100px] border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl resize-none",
                isMobile && "min-h-[80px] text-sm"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Status</Label>
            <Select 
              value={selectedStatus} 
              onValueChange={(value) => setSelectedStatus(value as TaskStatus)}
            >
              <SelectTrigger id="status" className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm rounded-xl",
                isMobile && "h-9 text-sm"
              )}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
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
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <Badge 
                  key={tag} 
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 rounded-lg px-3 py-1 border",
                    "hover:scale-105 active:scale-95",
                    selectedTags.includes(tag) 
                      ? `bg-gradient-to-r ${TAG_COLORS[tag as keyof typeof TAG_COLORS]}`
                      : "bg-background hover:bg-muted",
                    isMobile && "text-xs py-0.5"
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className={cn(
            "flex justify-end gap-2 pt-4",
            isMobile && "pt-2"
          )}>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-xl border-muted-foreground/20",
                "hover:bg-muted-foreground/5",
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
              <Plus className="w-4 h-4 mr-1" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
