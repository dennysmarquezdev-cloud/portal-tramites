import React from "react";
import { cn } from "@/lib/utils";

interface TailwindBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const Hero = ({ children, className }: TailwindBackgroundProps) => {
  return (
    <div className={cn("w-full relative h-screen", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      {children}
    </div>
  );
};

export default Hero;
