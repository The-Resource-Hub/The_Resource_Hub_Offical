
import { Variants } from 'framer-motion';

/**
 * Variants for individual plan cards to reveal as user scrolls
 */
export const planCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  }
};

/**
 * Hero section entry animations
 */
export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

/**
 * Status reveal for current plan indicator
 */
export const statusBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 0.4
    }
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/**
 * Icon background glow pulsing
 */
export const iconGlowVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
