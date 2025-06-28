import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import ProfileSection from "@/components/profile-section";
import StatisticsSection from "@/components/statistics-section";
import TasksSection from "@/components/tasks-section";
import type { User, Task } from "@shared/schema";

export default function Dashboard() {
  const userId = 1; // Default user for this demo

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: [`/api/users/${userId}/tasks`],
  });

  const { data: statistics, isLoading: statsLoading } = useQuery({
    queryKey: [`/api/users/${userId}/statistics`],
  });

  if (userLoading || tasksLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-gray-600">
            Here's an overview of your tasks and progress.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Section */}
          <div className="lg:col-span-1">
            <ProfileSection user={user} userId={userId} />
          </div>

          {/* Tasks and Statistics Section */}
          <div className="lg:col-span-2 space-y-8">
            <StatisticsSection statistics={statistics} />
            <TasksSection tasks={tasks} userId={userId} />
          </div>
        </div>
      </main>
    </div>
  );
}
