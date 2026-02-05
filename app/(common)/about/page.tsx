"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { AFSectionTitle } from "@/components/shared/AFSectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      desc: "We believe in helping those in need with kindness and empathy.",
      color: "text-rose-500 bg-rose-500/10",
    },
    {
      icon: Target,
      title: "Transparency",
      desc: "Every donation is tracked and accounted for, ensuring trust.",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Using technology to solve age-old problems in our community.",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      icon: Users,
      title: "Community",
      desc: "Building a strong network of supporters and beneficiaries.",
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-40 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
            alt="Team Working"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="p-8 md:p-16 max-w-4xl animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Empowering Communities, <br />
                <span className="text-primary">Transforming Lives.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Alhamdulillah Foundation is dedicated to creating sustainable investments and charitable initiatives that uplift society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AFSectionTitle
              title="Our Mission & Vision"
              subtitle="What Drives Us"
              align="left"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to bridge the gap between resources and needs through transparent, ethical, and impactful investments. We envision a world where every individual has the opportunity to thrive.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We started with a simple idea: that collective small contributions can lead to massive change. Today, we are proud to support hundreds of families through our agricultural and development projects.
            </p>
          </div>
          <div className="relative h-[400px] rounded-bl-[100px] rounded-tr-[100px] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
              alt="Vision"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 mb-20">
        <AFSectionTitle
          title="Our Core Values"
          subtitle="The Principles That Guide Us"
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((item, i) => (
            <Card key={i} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
