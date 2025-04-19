'use client';

import { motion, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import React from 'react';

/**
 * @interface AnimatedStatProps
 * @description Props for the AnimatedStat component.
 * @property {number} targetValue - The final number to animate to.
 * @property {number} [duration=1.5] - Duration of the number animation in seconds.
 * @property {number} [delay=0.2] - Delay before the number animation starts (relative to card animation).
 * @property {number} [cardDelay=0.1] - Delay for the card's appearance animation.
 * @property {string} [className=''] - Additional classes for the card container (e.g., for background/border colors).
 * @property {string} [valueClassName=''] - Additional classes for the animated number value (e.g., for text color).
 * @property {string} [suffix=''] - Suffix to display after the number (e.g., '+', '%', '万+').
 * @property {string} text - Descriptive text below the number.
 * @property {string} [suffixClassName='text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1'] - Classes for the suffix span.
 */
interface AnimatedStatProps {
  targetValue: number;
  duration?: number;
  delay?: number;
  cardDelay?: number;
  className?: string;
  valueClassName?: string;
  suffix?: string;
  text: string;
  suffixClassName?: string;
}

/**
 * @function AnimatedStat
 * @description A component that displays a statistic with a number rolling animation when it comes into view.
 * @param {AnimatedStatProps} props - The component props.
 * @returns {React.ReactElement} The animated statistic card.
 */
const AnimatedStat = ({
  targetValue,
  duration = 1.5,
  delay = 0.1, // Slightly delay number animation after card appears
  cardDelay = 0.1,
  className = '',
  valueClassName = '',
  suffix = '',
  text,
  suffixClassName = 'text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1' // Default suffix style from original code
}: AnimatedStatProps): React.ReactElement => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInViewRef = useRef(false); // Track if animation has already run

  useEffect(() => {
    // Skip if no node reference or animation already ran
    if (!nodeRef.current || isInViewRef.current) return;

    // Set up intersection observer to trigger animation when element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isInViewRef.current) {
          isInViewRef.current = true; // Mark as animated
          
          // Start the counting animation
          const node = nodeRef.current;
          const controls = animate(0, targetValue, {
            duration,
            delay, // Start number animation after card appears
            ease: "easeOut",
            onUpdate(value) {
              if (node) {
                node.textContent = Math.round(value).toString();
              }
            },
          });

          return () => controls.stop();
        }
      },
      { threshold: 0.2 } // Trigger when at least 20% of the element is visible
    );

    // Start observing the element
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    // Clean up observer on unmount
    return () => observer.disconnect();
  }, [targetValue, duration, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: cardDelay }}
      className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl ${className}`}
    >
      <div className="flex items-baseline mb-2">
        <span 
          ref={nodeRef} 
          className={`text-4xl sm:text-5xl md:text-6xl font-bold ${valueClassName}`}
        >
          0
        </span>
        {suffix && (
          <span className={suffixClassName}>
            {suffix}
          </span>
        )}
      </div>
      <p className="text-center text-base sm:text-lg opacity-80">{text}</p>
    </motion.div>
  );
};

export default AnimatedStat; 