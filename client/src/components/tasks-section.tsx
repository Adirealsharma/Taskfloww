import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Filter, Search, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import type { Task } from "@shared/schema";

interface TasksSectionProps {
  tasks: Task[];
  userId: number;
}

type FilterType = "all" | "pending" | "completed";

export default function TasksSection({ tasks, userId }: TasksSectionProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: number; status: string }) => {
      const response = await apiRequest("PUT", `/api/tasks/${taskId}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/tasks`] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/statistics`] });
      toast({
        title: "Task updated",
        description: "Task status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTaskToggle = (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    updateTaskMutation.mutate({ taskId, status: newStatus });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
        
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-48"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(["all", "pending", "completed"] as FilterType[]).map((filterType) => (
              <Button
                key={filterType}
                variant="ghost"
                size="sm"
                onClick={() => setFilter(filterType)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md",
                  filter === filterType
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors",
                task.status === "completed" ? "bg-gray-50" : "bg-white"
              )}
            >
              <div className="flex items-center flex-1">
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => handleTaskToggle(task.id, task.status)}
                  disabled={updateTaskMutation.isPending}
                />
                <div className="ml-4 flex-1">
                  <p
                    className={cn(
                      "font-medium",
                      task.status === "completed"
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge
                  variant={task.status === "completed" ? "secondary" : "outline"}
                  className={
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }
                >
                  {task.status === "completed" ? "Completed" : "Pending"}
                </Badge>
                <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ListTodo className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
            </h4>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {filter === "all"
                ? "Create your first task to get started with organizing your work."
                : `No ${filter} tasks found. Try adjusting your filter or search.`}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
