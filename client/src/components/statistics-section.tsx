import { CheckCircle, Clock, ListTodo } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatisticsSectionProps {
  statistics?: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    progressPercentage: number;
  };
}

export default function StatisticsSection({ statistics }: StatisticsSectionProps) {
  if (!statistics) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Tasks */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <ListTodo className="h-6 w-6 text-gray-600" />
          </div>
          <div className="text-2xl font-semibold text-gray-900 mb-1">
            {statistics.totalTasks}
          </div>
          <p className="text-gray-600 text-sm">Total Tasks</p>
        </div>

        {/* Completed Tasks */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-semibold text-green-700 mb-1">
            {statistics.completedTasks}
          </div>
          <p className="text-green-700 text-sm">Completed</p>
        </div>

        {/* Pending Tasks */}
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-2xl font-semibold text-orange-700 mb-1">
            {statistics.pendingTasks}
          </div>
          <p className="text-orange-700 text-sm">Pending</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {statistics.progressPercentage}%
          </span>
        </div>
        <Progress value={statistics.progressPercentage} className="h-2" />
      </div>
    </div>
  );
}
