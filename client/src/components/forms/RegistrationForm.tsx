import React, { useEffect } from "react";
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
import { Loader } from "../general/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  registerFormSchema,
  RegisterFormValues,
} from "../../schema/authSchema";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerUser, resetRegistration } from "../../features/auth/authSlice";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, registered } = useAppSelector((state) => state.auth);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Submitting Form Data:", data);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (registered) {
      navigate("/login", {
        state: {
          message: "Registration successful! Please login.",
          registeredEmail: form.getValues("email"),
        },
        replace: true,
      });
      dispatch(resetRegistration());
    }
  }, [registered, navigate, form, dispatch]);

  return (
    <div className="flex items-center justify-center p-4 sm:px-6 md:px-8">
      <Card className="w-full max-w-md mx-auto shadow-lg p-4 sm:p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Create an Account
          </CardTitle>
          <CardDescription>
            Fill in the details below to register.
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="flex flex-col space-y-2">
                <FormLabel className="text-sm font-medium">
                  Phone Number
                </FormLabel>
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-[50px]">
                        <FormControl>
                          <CountryCodeSelect field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            {...field}
                            className="text-sm"
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              form.setValue("phoneNumber", value.slice(0, 10));
                            }}
                            value={field.value}
                            type="tel"
                            maxLength={10}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-xs text-muted-foreground pl-1">
                  Enter 10-digit phone number without country code
                </div>
              </div> */}

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        {...field}
                        className="text-sm"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          form.setValue("phoneNumber", value.slice(0, 10));
                        }}
                        value={field.value}
                        type="tel"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 bg-primary hover:bg-green-400 cursor-pointer"
                disabled={loading}
              >
                {loading ? <Loader size="small" /> : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
