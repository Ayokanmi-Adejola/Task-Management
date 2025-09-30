import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X, Calendar, User, AlertTriangle } from 'lucide-react';
import { TaskStatus, IssuePriority, IssueType } from '@/types/kanban';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreateTaskDialogProps {
  status: TaskStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (
    title: string, 
    description: string, 
    status: TaskStatus, 
    tags?: string[], 
    priority?: IssuePriority, 
    issueType?: IssueType, 
    dueDate?: string, 
    assignees?: string[]
  ) => void;
}

const TAGS = ["Design", "UI/UX", "Dev", "Testing"];

const TAG_COLORS = {
  'Design': 'from-pink-500/20 to-pink-500/10 text-pink-700 border-pink-500/20 hover:bg-pink-500/10',
  'UI/UX': 'from-purple-500/20 to-purple-500/10 text-purple-700 border-purple-500/20 hover:bg-purple-500/10',
  'Dev': 'from-emerald-500/20 to-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/10',
  'Testing': 'from-amber-500/20 to-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/10'
};

const PRIORITIES: { value: IssuePriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-orange-600' },
  { value: 'critical', label: 'Critical', color: 'text-red-600' }
];

const ISSUE_TYPES: { value: IssueType; label: string; icon: string }[] = [
  { value: 'bug', label: 'Bug', icon: '🐛' },
  { value: 'feature', label: 'Feature', icon: '✨' },
  { value: 'enhancement', label: 'Enhancement', icon: '🚀' },
  { value: 'documentation', label: 'Documentation', icon: '📝' }
];

const AVAILABLE_ASSIGNEES = ['user1', 'user2', 'user3']; // This could be fetched from context/API

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ status, open, onOpenChange, onCreate }) => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(status);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<IssuePriority>('medium');
  const [selectedIssueType, setSelectedIssueType] = useState<IssueType>('feature');
  const [dueDate, setDueDate] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedStatus(status);
    setSelectedTags([]);
    setSelectedPriority('medium');
    setSelectedIssueType('feature');
    setDueDate('');
    setSelectedAssignees([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter an issue title');
      return;
    }
    
    onCreate(
      title.trim(), 
      description.trim(), 
      selectedStatus, 
      selectedTags.length > 0 ? selectedTags : undefined,
      selectedPriority,
      selectedIssueType,
      dueDate || undefined,
      selectedAssignees.length > 0 ? selectedAssignees : undefined
    );
    resetForm();
    onOpenChange(false);
    toast.success('Issue created successfully');
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleAssignee = (assignee: string) => {
    if (selectedAssignees.includes(assignee)) {
      setSelectedAssignees(selectedAssignees.filter(a => a !== assignee));
    } else {
      setSelectedAssignees([...selectedAssignees, assignee]);
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
          )}>Create New Issue</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter issue title"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={cn(
                "text-sm font-medium text-muted-foreground",
                isMobile && "text-xs"
              )}>Issue Type</Label>
              <Select 
                value={selectedIssueType} 
                onValueChange={(value) => setSelectedIssueType(value as IssueType)}
              >
                <SelectTrigger className={cn(
                  "border-muted-foreground/20 bg-background/50 backdrop-blur-sm rounded-xl",
                  isMobile && "h-9 text-sm"
                )}>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {ISSUE_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={cn(
                "text-sm font-medium text-muted-foreground",
                isMobile && "text-xs"
              )}>Priority</Label>
              <Select 
                value={selectedPriority} 
                onValueChange={(value) => setSelectedPriority(value as IssuePriority)}
              >
                <SelectTrigger className={cn(
                  "border-muted-foreground/20 bg-background/50 backdrop-blur-sm rounded-xl",
                  isMobile && "h-9 text-sm"
                )}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {PRIORITIES.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className={cn("flex items-center gap-2", priority.color)}>
                        <AlertTriangle className="h-3 w-3" />
                        <span>{priority.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Due Date (optional)</Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={cn(
                  "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                  "transition-all duration-200 focus:ring-offset-0 rounded-xl pl-10",
                  isMobile && "h-9 text-sm"
                )}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Assignees (optional)</Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_ASSIGNEES.map(assignee => (
                <Badge 
                  key={assignee} 
                  variant={selectedAssignees.includes(assignee) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer hover:opacity-80 transition-opacity rounded-full",
                    "px-3 py-1 text-xs font-medium border",
                    isMobile && "text-xs px-2 py-0.5"
                  )}
                  onClick={() => toggleAssignee(assignee)}
                >
                  <User className="h-3 w-3 mr-1" />
                  {assignee}
                </Badge>
              ))}
            </div>
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
              Create Issue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
