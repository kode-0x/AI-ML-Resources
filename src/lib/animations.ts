import type { Variants } from 'framer-motion';

export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 28 } as const,
  gentle: { type: 'spring', stiffness: 260, damping: 24 } as const,
  tight: { type: 'spring', stiffness: 500, damping: 35 } as const,
} as const;

export const ease = {
  out: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] } as const,
  outMedium: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } as const,
  fast: { duration: 0.12, ease: 'easeOut' } as const,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: ease.out },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ease.outMedium },
  exit: { opacity: 0, transition: ease.fast },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
};

export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: spring.gentle },
  exit: { y: '100%', transition: { duration: 0.18, ease: 'easeIn' } },
};

export const chevronRotate = (isOpen: boolean) => ({
  animate: { rotate: isOpen ? 90 : 0 },
  transition: spring.snappy,
});

export const iconSwap: Variants = {
  initial: { opacity: 0, scale: 0.6, rotate: -30 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: spring.snappy },
  exit: { opacity: 0, scale: 0.6, rotate: 30, transition: ease.fast },
};
