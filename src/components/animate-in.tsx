'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'right' | 'left' | 'none'
  distance?: number
  className?: string
}

const getOffset = (direction: Props['direction'], distance: number) => {
  if (direction === 'up')    return { y: distance, x: 0 }
  if (direction === 'right') return { x: -distance, y: 0 }
  if (direction === 'left')  return { x: distance, y: 0 }
  return { x: 0, y: 0 }
}

/** Animates on mount (use for above-the-fold content). */
export function AnimateIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 24,
  className,
}: Props) {
  const offset = getOffset(direction, distance)
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Animates when scrolled into view (use for below-the-fold sections). */
export function AnimateInView({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 20,
  className,
}: Props) {
  const offset = getOffset(direction, distance)
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
