import React, { useState, useEffect } from 'react';
import { Task, Column, TaskStatus, IssuePriority, IssueType } from '@/types/kanban';
import { getTasksFromLocalStorage, saveTasksToLocalStorage, clearDemoTasks } from '@/utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './TaskCard';
import ColumnHeader from './ColumnHeader';
import CreateTaskDialog from './CreateTaskDialog';
import EditTaskDialog from './EditTaskDialog';
import FilterTasksDialog, { TaskFilters } from './FilterTasksDialog';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Filter, Plus, Trash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-400' },
  { id: 'doing', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Completed', color: 'bg-green-500' },
];

const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finish Requirements',
    description: 'Complete project requirements document',
    status: 'todo',
    createdAt: Date.now(),
    tags: ['Design'],
    assignees: ['user1', 'user2', 'user3'],
    comments: 5,
    attachments: 2
  },
  {
    id: '2',
    title: 'UI Design',
    description: 'Create UI design based on requirements',
    status: 'todo',
    createdAt: Date.now(),
    tags: ['UI/UX'],
    assignees: ['user1'],
    comments: 3
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Integrate with backend APIs',
    status: 'todo',
    createdAt: Date.now(),
    assignees: ['user1']
  },
  {
    id: '4',
    title: 'Landing Page Design',
    description: 'Create design for landing page',
    status: 'doing',
    createdAt: Date.now(),
    dueDate: '12/20',
    tags: ['UI/UX'],
    assignees: ['user1', 'user2'],
    comments: 7
  },
  {
    id: '5',
    title: 'Usability Testing',
    description: 'Conduct usability testing sessions',
    status: 'doing',
    createdAt: Date.now(),
    tags: ['Testing'],
    assignees: ['user2'],
    comments: 4,
    attachments: 3
  },
  {
    id: '6',
    title: 'Feature Development',
    description: 'Implement new feature based on design',
    status: 'doing',
    createdAt: Date.now(),
    assignees: ['user1']
  },
  {
    id: '7',
    title: 'Setup Development',
    description: 'Set up development environment',
    status: 'done',
    createdAt: Date.now(),
    tags: ['Dev'],
    assignees: ['user3'],
    comments: 1
  },
  {
    id: '8',
    title: 'User Flow Diagrams',
    description: 'Create user flow diagrams',
    status: 'done',
    createdAt: Date.now(),
    tags: ['UI/UX'],
    assignees: ['user1', 'user2'],
    comments: 3
  },
  {
    id: '9',
    title: 'Data Model Design',
    description: 'Design database schema',
    status: 'done',
    createdAt: Date.now(),
    assignees: ['user3']
  }
];

interface KanbanBoardProps {
  searchQuery?: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ searchQuery: externalSearchQuery }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggingOver, setDraggingOver] = useState<TaskStatus | null>(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [createInColumn, setCreateInColumn] = useState<TaskStatus>('todo');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>({
    tags: [],
    assignees: [],
    showCompleted: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated } = useAuth();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isMobile = useIsMobile();
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  const getAvailableTags = () => {
    const allTags = tasks
      .flatMap(task => task.tags || [])
      .filter((tag, index, self) => self.indexOf(tag) === index);
    return allTags;
  };

  const getAvailableAssignees = () => {
    const allAssignees = tasks
      .flatMap(task => task.assignees || [])
      .filter((assignee, index, self) => self.indexOf(assignee) === index);
    return allAssignees;
  };

  useEffect(() => {
    if (user?.id) {
      let savedTasks = getTasksFromLocalStorage(user.id);

      if (savedTasks.length === 0 && isFirstLoad) {
        savedTasks = DEMO_TASKS;
        saveTasksToLocalStorage(savedTasks, user.id);
        setIsFirstLoad(false);
      }

      setTasks(savedTasks);
    } else {
      setTasks(DEMO_TASKS);
    }
  }, [user, isFirstLoad]);

  useEffect(() => {
    if (user?.id) {
      saveTasksToLocalStorage(tasks, user.id);
    }
  }, [tasks, user]);

  // Update internal search query when external one changes
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);

  useEffect(() => {
    let result = [...tasks];

    if (filters.tags.length > 0) {
      result = result.filter(task =>
        task.tags && task.tags.some(tag => filters.tags.includes(tag))
      );
    }

    if (filters.assignees.length > 0) {
      result = result.filter(task =>
        task.assignees && task.assignees.some(assignee => filters.assignees.includes(assignee))
      );
    }

    if (!filters.showCompleted) {
      result = result.filter(task => task.status !== 'done');
    }

    const query = searchQuery.toLowerCase();
    if (query) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    setFilteredTasks(result);
  }, [tasks, filters, searchQuery]);

  const handleCreateTask = (
    title: string, 
    description: string, 
    status: TaskStatus, 
    tags?: string[], 
    priority?: IssuePriority, 
    issueType?: IssueType, 
    dueDate?: string, 
    assignees?: string[]
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status,
      createdAt: Date.now(),
      tags,
      priority,
      issueType,
      dueDate,
      assignees: assignees && assignees.length > 0 ? assignees : (user ? [user.id] : undefined)
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success('Issue created successfully');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast.success('Task updated successfully');
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task deleted successfully');
  };

  const handleClearAllTasks = () => {
    if (!user) {
      toast.error('Please log in to manage tasks');
      return;
    }

    setTasks([]);
    clearDemoTasks(user.id);
    toast.success('All tasks cleared successfully');
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggingOver(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();
    setDraggingOver(status);
  };

  const handleDragLeave = () => {
    setDraggingOver(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();

    if (draggedTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === draggedTask) {
          return { ...task, status };
        }
        return task;
      });

      setTasks(updatedTasks);
      setDraggedTask(null);
      setDraggingOver(null);
    }
  };

  const getColumnTasks = (status: TaskStatus) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const openCreateTaskDialog = (status: TaskStatus) => {
    if (!isAuthenticated) {
      toast.error('Please log in to create tasks');
      return;
    }
    setCreateInColumn(status);
    setCreateTaskOpen(true);
  };

  const handleApplyFilters = (newFilters: TaskFilters) => {
    setFilters(newFilters);
    toast.success('Filters applied successfully');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle column navigation for mobile view
  const nextColumn = () => {
    if (activeColumnIndex < COLUMNS.length - 1) {
      setActiveColumnIndex(activeColumnIndex + 1);
    }
  };

  const prevColumn = () => {
    if (activeColumnIndex > 0) {
      setActiveColumnIndex(activeColumnIndex - 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Overview</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">View and manage your tasks</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
          {isAuthenticated && (
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className="gap-1 sm:gap-2 text-destructive hover:bg-destructive/10 text-xs sm:text-sm"
              onClick={handleClearAllTasks}
            >
              <Trash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {isMobile ? "Clear" : "Clear All Tasks"}
            </Button>
          )}
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
            onClick={() => setFilterDialogOpen(true)}
          >
            <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {isMobile ? "Filter" : "Filter Tasks"}
          </Button>
          <Button
            size={isMobile ? "sm" : "default"}
            onClick={() => {
              if (!isAuthenticated) {
                toast.error('Please log in to create tasks');
                return;
              }
              setCreateInColumn('todo');
              setCreateTaskOpen(true);
            }}
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {isMobile ? "Create" : "Create Issue"}
          </Button>
        </div>
      </div>

      {/* Mobile Column Navigation */}
      {isMobile && (
        <div className="flex items-center justify-between mb-2 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 dark:hover:bg-gray-800"
            onClick={prevColumn}
            disabled={activeColumnIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium dark:text-gray-200">
            {COLUMNS[activeColumnIndex].title} ({getColumnTasks(COLUMNS[activeColumnIndex].id).length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 dark:hover:bg-gray-800"
            onClick={nextColumn}
            disabled={activeColumnIndex === COLUMNS.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-4 sm:gap-6 overflow-hidden">
        {COLUMNS.map((column, index) => {
          const columnTasks = getColumnTasks(column.id);

          return (
            <div
              key={column.id}
              className={cn(
                "flex-1 min-w-[280px] flex flex-col max-h-full",
                // On mobile, only show the active column
                isMobile && index !== activeColumnIndex && "hidden"
              )}
            >
              {!isMobile && (
                <ColumnHeader
                  title={column.title}
                  count={columnTasks.length}
                  status={column.id}
                  color={column.color}
                />
              )}

              <div
                className={cn(
                  "flex-1 p-2 rounded-lg overflow-y-auto flex flex-col gap-2",
                  "bg-gray-50 dark:bg-gray-900/50",
                  draggingOver === column.id && 'column-drop-active'
                )}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
                style={{
                  minHeight: isMobile ? '70vh' : 'auto'
                }}
              >
                {columnTasks.map((task, index) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onDragEnd={handleDragEnd}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <TaskCard
                      task={task}
                      dragging={draggedTask === task.id}
                      onEdit={(task) => {
                        if (!isAuthenticated) {
                          toast.error('Please log in to edit tasks');
                          return;
                        }
                        setEditingTask(task);
                        setEditDialogOpen(true);
                      }}
                      onDelete={(id) => {
                        if (!isAuthenticated) {
                          toast.error('Please log in to delete tasks');
                          return;
                        }
                        handleDeleteTask(id);
                      }}
                    />
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <p className="text-xs text-muted-foreground dark:text-gray-400 italic">
                      Drop tasks here
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-2 sm:mt-3">
                <Button
                  variant="ghost"
                  size={isMobile ? "sm" : "default"}
                  className="w-full h-8 sm:h-9 gap-1 text-muted-foreground hover:text-foreground dark:hover:text-gray-300 dark:hover:bg-gray-800/50 group transition-all flex items-center justify-center text-xs sm:text-sm"
                  onClick={() => openCreateTaskDialog(column.id)}
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                  <span>Add Task</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <EditTaskDialog
        task={editingTask}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdate={handleUpdateTask}
      />

      <CreateTaskDialog
        status={createInColumn}
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
        onCreate={handleCreateTask}
      />

      <FilterTasksDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
        availableTags={getAvailableTags()}
        availableAssignees={getAvailableAssignees()}
      />
    </div>
  );
};

export default KanbanBoard;
