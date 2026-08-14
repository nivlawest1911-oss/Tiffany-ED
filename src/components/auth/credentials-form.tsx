"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const credentialsSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type CredentialsFormValues = z.infer<typeof credentialsSchema>;

interface CredentialsFormProps {
  isLoading: string | null;
  setIsLoading: (provider: string | null) => void;
}

export function CredentialsForm({ isLoading, setIsLoading }: CredentialsFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
  });

  const onSubmit = async (data: CredentialsFormValues) => {
    try {
      setIsLoading("credentials");
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });
      
      if (error) {
        console.error("Credentials error", error);
        setIsLoading(null);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(null);
    }
  };

  const isAnyLoading = isLoading !== null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-100">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="name@example.com"
          disabled={isAnyLoading}
          className="bg-slate-950 border-slate-800 text-slate-100 focus-visible:ring-amber-500 duration-200"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-slate-100">Password</Label>
          <a href="#" className="text-sm font-medium text-amber-500 hover:text-amber-400 duration-200">
            Forgot password?
          </a>
        </div>
        <Input 
          id="password" 
          type="password"
          disabled={isAnyLoading}
          className="bg-slate-950 border-slate-800 text-slate-100 focus-visible:ring-amber-500 duration-200"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full bg-amber-500 text-slate-950 hover:bg-amber-600 duration-200 ease-out active:scale-[0.98] font-semibold focus-visible:ring-amber-500 focus-visible:ring-offset-slate-900"
        disabled={isAnyLoading}
      >
        {isLoading === "credentials" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Sign In
      </Button>
    </form>
  );
}
