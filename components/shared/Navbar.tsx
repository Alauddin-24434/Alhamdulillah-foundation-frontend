"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Sun, Moon, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const lang = i18n.language as "en" | "bn";

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const changeLang = (value: "en" | "bn") => {
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value);
  };

  const handleLogout = async () => {
    await fetch(
      "https://alhamdulillah-foundation-backend.vercel.app/api/auth/logout",
      { method: "POST", credentials: "include" },
    );
    dispatch(logout());
  };

  const navItems = [
    { label: t("common.home"), href: "/" },
    { label: t("common.projects"), href: "/projects" },
    { label: t("common.about"), href: "/about" },
    { label: t("common.notices"), href: "/notices" },
  ];

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] container mx-auto rounded-2xl border transition-all duration-300 ${
        scrolled
          ? "h-16 bg-background/80 backdrop-blur-xl shadow-lg"
          : "h-20 bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="px-6 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className={`relative transition-all ${
              scrolled ? "h-14 w-14" : "h-20 w-20"
            }`}
          >
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>

          {/* LANGUAGE TOGGLE */}
          <ToggleGroup
            type="single"
            value={lang}
            onValueChange={(value) => value && changeLang(value as "en" | "bn")}
            className="border rounded-md"
          >
            <ToggleGroupItem value="en">EN</ToggleGroupItem>
            <ToggleGroupItem value="bn">BN</ToggleGroupItem>
          </ToggleGroup>

          {/* AUTH */}
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block">
                <Button variant="outline" className="rounded-full">
                  {t("common.dashboard")}
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                className="hidden md:flex rounded-full bg-red-600 text-white"
              >
                {t("common.logout")}
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button className="hidden md:flex rounded-full bg-primary text-white">
                {t("common.login")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
