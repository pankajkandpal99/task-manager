import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAppSelector } from "../hooks/redux";
import { MoveRightIcon, CheckCircle, Calendar, BarChart2 } from "lucide-react";

export default function Home() {
  const { authenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-20">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">
            Welcome to Task Tracker
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Streamline your workflow and boost productivity with our powerful
            yet simple task management platform
          </p>
        </header>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden">
            <div className="bg-indigo-600 h-2 w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
                <CardTitle className="text-xl font-semibold">
                  Multiple Projects
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                Organize your work efficiently with support for up to 4 separate
                projects, each with its own customizable task structure and team
                members.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden">
            <div className="bg-emerald-600 h-2 w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-emerald-600" />
                <CardTitle className="text-xl font-semibold">
                  Task Management
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                Complete control over your tasks with intuitive create, edit,
                and delete operations. Set priorities, deadlines, and track
                progress at every stage.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden">
            <div className="bg-amber-600 h-2 w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <BarChart2 className="h-6 w-6 text-amber-600" />
                <CardTitle className="text-xl font-semibold">
                  Progress Tracking
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                Visual analytics and progress indicators help you stay on top of
                your goals. Celebrate milestones with completion metrics and
                performance insights.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-lg text-gray-700 max-w-lg text-center mb-2">
            Ready to transform how you manage your tasks and projects?
          </p>

          {authenticated ? (
            <Button
              asChild
              variant="default"
              className="px-8 py-6 text-lg font-medium rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                Go to Dashboard
                <MoveRightIcon className="ml-1" />
              </Link>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button
                asChild
                variant="default"
                className="px-8 py-4 text-lg font-medium rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md flex-1"
              >
                <Link to="/login">Log In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-4 text-lg font-medium rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-md flex-1"
              >
                <Link to="/signup">Sign Up Free</Link>
              </Button>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">
            No credit card required. Start organizing today.
          </p>
        </div>
      </main>
    </div>
  );
}
