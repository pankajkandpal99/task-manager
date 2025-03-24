import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginFormSchema, LoginFormValues } from "../../schema/authSchema";
import { Loader } from "../general/Loader";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login successful");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-primary sm:text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm text-center rounded">
              {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="w-full p-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-sm font-medium">
                        Password
                      </FormLabel>
                      <Link
                        to="#"
                        className="text-xs hover:underline text-primary"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-green-400 cursor-pointer"
                disabled={loading}
              >
                {loading ? <Loader size="small" /> : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="">Don't have an account?</span>
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
