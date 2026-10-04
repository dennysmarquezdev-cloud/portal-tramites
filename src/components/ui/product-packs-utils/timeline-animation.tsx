import React, { ElementType, ReactNode, RefObject } from "react";
import { motion } from "framer-motion";

export interface TimelineAnimationProps {
  children: ReactNode;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement | null>;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const TimelineAnimation: React.FC<TimelineAnimationProps> = ({
  children,
  animationNum = 1,
  as: Component = "div",
  className = "",
  style = {},
  onClick
}) => {
  const delay = Math.max(0, (animationNum - 1) * 0.1);
  const TagName = typeof Component === "string" ? Component : "div";
  const MotionComponent = (motion as any)[TagName] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.45, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  );
};

export default TimelineAnimation;
