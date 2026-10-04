import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define the props for the WelcomeScreen component
export interface WelcomeScreenProps {
  imageUrl: string;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryActionText?: React.ReactNode;
  onSecondaryActionClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A responsive and animated welcome screen component.
 * It uses framer-motion for animations and is styled with shadcn/ui theme variables.
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  imageUrl,
  title,
  description,
  buttonText,
  onButtonClick,
  secondaryActionText,
  onSecondaryActionClick,
  className,
  children
}) => {
  // Animation variants for the container and its children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
      },
    },
  };
  
  const imageVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-between overflow-hidden',
        className
      )}
    >
      {/* Top Image Section with a curved clip-path */}
      <motion.div 
        className="relative w-full overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        style={{ maxHeight: 220 }}
      >
        <img
          src={imageUrl}
          alt="Welcome"
          className="h-48 w-full object-cover"
          style={{ clipPath: 'ellipse(100% 75% at 50% 25%)' }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" 
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-center space-y-4 px-8 py-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h1
          className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          variants={itemVariants}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-md text-sm text-muted-foreground leading-relaxed"
          variants={itemVariants}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </motion.p>

        {children && (
          <motion.div variants={itemVariants} className="w-full">
            {children}
          </motion.div>
        )}
      </motion.div>
      
      {/* Actions Section */}
      <motion.div 
        className="w-full space-y-3 px-8 pb-6 pt-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Primary Button */}
        <motion.div variants={itemVariants}>
          <Button 
            onClick={onButtonClick} 
            className="w-full h-12 text-base font-semibold shadow-lg shadow-red-500/20 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white transition-all rounded-xl" 
            size="lg"
          >
            {buttonText}
          </Button>
        </motion.div>

        {/* Secondary Action Link */}
        {secondaryActionText && onSecondaryActionClick && (
          <motion.div variants={itemVariants} className="text-center">
            <button
              type="button"
              onClick={onSecondaryActionClick}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {secondaryActionText}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
