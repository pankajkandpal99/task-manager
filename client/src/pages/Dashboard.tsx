import { useEffect, useState } from "react";
import {
  MoreVertical,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  CalendarDays,
  Mail,
  MapPin,
  BarChart2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { Progress } from "../components/ui/progress";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { Project, Task } from "../schema/projectSchema";
import { TaskForm } from "../components/general/TaskForm";
import {
  createProject,
  fetchProjects,
  removeProject,
  updateProject,
} from "../features/project.slice";
import {
  createTask,
  deleteTask,
  fetchTasksByProject,
  updateTask,
} from "../features/task.slice";
import { ProjectForm } from "../components/general/ProjectForm";
import { Loader } from "../components/general/Loader";
import { toast } from "sonner";

export default function Dashboard() {
  const { currentUser } = useAppSelector((state) => state.user);
  const { projects, loading: projectsLoading } = useAppSelector(
    (state) => state.projects
  );
  const { tasksByProject } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Project handlers
  const handleAddProject = () => {
    setCurrentProject(null);
    setProjectFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    if (!project._id) {
      toast.error("Cannot edit project without ID");
      return;
    }
    setCurrentProject(project);
    setProjectFormOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    dispatch(removeProject(projectId));
  };

  const handleProjectSubmit = (values: Project) => {
    if (currentProject) {
      const projectToUpdate = {
        ...values,
        id: currentProject._id,
        tasks: currentProject.tasks || [],
      };
      dispatch(updateProject(projectToUpdate));
    } else {
      dispatch(createProject(values));
    }
    setProjectFormOpen(false);
  };

  // Task handlers
  const handleAddTask = (projectId: string) => {
    setCurrentTask(null);
    setCurrentProjectId(projectId);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task, projectId: string) => {
    setCurrentTask(task);
    setCurrentProjectId(projectId);
    setTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string, projectId: string) => {
    dispatch(deleteTask({ taskId, projectId }));
  };

  const handleTaskSubmit = (values: Task) => {
    console.log("Task values:", values);
    console.log("Current project ID:", currentProjectId);
    if (!currentProjectId) return;

    console.log("enter task submit");
    console.log("currentProjectId:", currentProjectId);

    const taskWithProject = {
      ...values,
      projectId: currentProjectId,
    };

    if (currentTask) {
      dispatch(updateTask({ taskData: values, projectId: currentProjectId }));
    } else {
      dispatch(
        createTask({ taskData: taskWithProject, projectId: currentProjectId })
      );
    }
    setTaskFormOpen(false);
  };

  // Helper functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTotalTasks = () => {
    return projects.reduce(
      (acc: number, project: Project) => acc + project.tasks.length,
      0
    );
  };

  const getCompletedTasks = () => {
    return projects.reduce((acc: number, project: Project) => {
      return (
        acc + project.tasks.filter((task) => task.status === "Completed").length
      );
    }, 0);
  };

  const getTasksForProject = (projectId: string) => {
    return tasksByProject[projectId] || [];
  };

  const calculateProjectProgress = (projectId: string) => {
    const tasks = getTasksForProject(projectId);
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const calculateOverallProgress = () => {
    const allTasks = Object.values(tasksByProject).flat();

    const total = allTasks.length;
    const completed = allTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach((project) => {
        if (project._id) {
          dispatch(fetchTasksByProject(project._id));
        }
      });
    }
  }, [projects, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Dialog open={projectFormOpen} onOpenChange={setProjectFormOpen}>
        <DialogContent>
          <ProjectForm
            initialData={currentProject || undefined}
            onSubmit={handleProjectSubmit}
            onCancel={() => setProjectFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={taskFormOpen} onOpenChange={setTaskFormOpen}>
        <DialogContent>
          <TaskForm
            initialData={currentTask || undefined}
            onSubmit={handleTaskSubmit}
            onCancel={() => setTaskFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Card */}
        <Card className="mb-8 border-none shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back,{" "}
                  <span className="text-indigo-600">
                    {currentUser?.name || "User"}
                  </span>
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{currentUser?.email || "user@example.com"}</span>
                  </div>
                  <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-400"></span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{currentUser?.country || "United States"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 bg-indigo-50 p-4 rounded-lg flex flex-col items-center justify-center">
                <div className="text-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Overall Progress
                  </span>
                  <div className="text-2xl font-bold text-indigo-600">
                    {calculateOverallProgress()}%
                  </div>
                </div>
                <Progress
                  value={calculateOverallProgress()}
                  className="w-32 h-2"
                />
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span>
                    {getCompletedTasks()} of {getTotalTasks()} tasks completed
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Your Projects
              </h3>
            </div>
            {projects.length < 4 && (
              <Button
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={handleAddProject}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            )}
          </div>

          {projectsLoading ? (
            <div className="h-64">
              <Loader size="large" />
            </div>
          ) : (
            <div
              className={`${
                projects.length > 1
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                  : "space-y-6"
              }`}
            >
              {projects.map((project) => {
                const projectTasks = getTasksForProject(project._id ?? "");
                // const progress = calculateProgress(project._id ?? "");

                return (
                  <Card
                    key={project._id}
                    className="border-none shadow-md hover:shadow-lg transition-all bg-white overflow-hidden"
                  >
                    <CardHeader className="border-b bg-gradient-to-r from-indigo-600 to-blue-500 p-5">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white text-xl font-bold">
                          {project.name}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-indigo-700"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handleEditProject(project)}
                            >
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() =>
                                project._id && handleDeleteProject(project._id)
                              }
                            >
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <div className="px-5 py-3 bg-gray-50 border-b flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                          {calculateProjectProgress(project._id ?? "")}%
                        </span>
                      </div>
                      <Progress
                        value={calculateProjectProgress(project._id ?? "")}
                        className="w-32 h-2"
                      />
                    </div>

                    <CardContent className="pt-4 p-5">
                      <div className="space-y-4">
                        {projectTasks.map((task) => (
                          <div
                            key={task._id}
                            className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {task.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {task.description}
                                </p>
                              </div>
                              <Badge
                                className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getStatusColor(
                                  task.status
                                )}`}
                              >
                                {getStatusIcon(task.status)}
                                <span className="ml-1">{task.status}</span>
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="flex items-center text-xs text-gray-600">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                <span>Due: {task.due || "N/A"}</span>
                              </div>

                              <Badge
                                className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </Badge>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-2 border-t">
                              <span className="text-xs text-gray-500">
                                Created: {task.created}
                              </span>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                  onClick={() =>
                                    handleEditTask(task, project._id!)
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                  onClick={() =>
                                    handleDeleteTask(task._id!, project._id!)
                                  }
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="px-5 py-4 bg-gray-50 border-t">
                      <Button
                        variant="default"
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        size="sm"
                        onClick={() => handleAddTask(project._id ?? "")}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Task
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
