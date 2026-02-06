"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowRight, UserPlus, ShieldCheck, Mail, Lock } from "lucide-react";
import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { z } from "zod";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const dispatch = useDispatch();
   const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const validation = registerSchema.safeParse(formData);

  if (!validation.success) {
    const firstError =
      validation.error.errors[0]?.message || "Invalid form data";
    toast.error(firstError);
    return;
  }

  try {
    const res = await signUpUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }).unwrap();

    dispatch(
      setUser({
        user: res?.data?.user,
        accessToken: res?.data?.accessToken,
      }),
    );

    toast.success(res?.message || "Registration successful 🎉");

    // ✅ Immediate redirect (toast will still show)
    router.push("/dashboard/membership");
  } catch (err: any) {
    toast.error(err?.data?.message || "Something went wrong");
  }
};

 

  return (
    <div className="min-h-screen flex items-center justify-center mt-12">
      <Card className="w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl border-none overflow-hidden  bg-card">
  
  {/* ===== LOGO + LANGUAGE ===== */}
                      <div className=" flex flex-col items-center gap-4">
                     
                          {/* LOGO */}
                          <div className="h-24 w-24 relative rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Image
                              src="/logo.png"
                              alt="Logo"
                              fill
                              className="object-contain p-3"
                            />
                          </div>
              
                 
                        <div className="text-center">
                          <h1 className="text-2xl font-bold tracking-tight">
                            {t("auth.register.registerTitle")}
                          </h1>
                          {/* <p className="text-sm text-foreground/60 mt-1">
                            {t("auth.register.registerSubtitle")}
                          </p> */}
                        </div>
                      </div>
              
        {/* Right Side - Form */}
        <div className="flex p-8 bg-card">
    
          

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("auth.register.name")}</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    name="name"
                    value={formData.name}
                    placeholder="Type your name"
                    onChange={handleChange}
                    className="h-12 pl-10 rounded-xl border-input bg-background/50 focus:bg-background transition-all font-medium"
                    required
                  />
                </div>
              </div>
             

              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("auth.register.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Type your email"
                    onChange={handleChange}
                    className="h-12 pl-10 rounded-xl border-input bg-background/50 focus:bg-background transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("auth.register.password")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Type your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 pl-10 rounded-xl border-input bg-background/50 focus:bg-background transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground"> {t("auth.register.confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Type your confirm password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="h-12 pl-10 rounded-xl border-input bg-background/50 focus:bg-background transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-base font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-95"
            >
              {isLoading ? t("auth.register.creatingAccount") : t("auth.register.joinFoundation")}
            </Button>

            <p className="text-center text-sm font-bold text-muted-foreground mt-6">
              {t("auth.register.alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("auth.register.signIn")}
              </Link>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
}
