"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  forwardRef,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  HTMLMotionProps,
} from "framer-motion";
import useMeasure from "react-use-measure";
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Utility function for classNames (Tailwind CSS)
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Spring animation configuration
const springConfig = { stiffness: 200, damping: 20, bounce: 0.2 };

// Expandable Context
interface ExpandableContextType {
  isExpanded: boolean;
  toggleExpand: () => void;
  expandDirection: "vertical" | "horizontal" | "both";
  expandBehavior: "replace" | "push";
  transitionDuration: number;
  easeType: string;
  initialDelay: number;
  onExpandEnd?: () => void;
  onCollapseEnd?: () => void;
}

const ExpandableContext = createContext<ExpandableContextType>({
  isExpanded: false,
  toggleExpand: () => { },
  expandDirection: "vertical",
  expandBehavior: "replace",
  transitionDuration: 0.3,
  easeType: "easeInOut",
  initialDelay: 0,
});

const useExpandable = () => useContext(ExpandableContext);

// Animation Presets
const ANIMATION_PRESETS: Record<
  string,
  { initial: any; animate: any; exit: any }
> = {
  "blur-sm": {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
};

const getAnimationProps = (
  preset: keyof typeof ANIMATION_PRESETS | undefined,
  animateIn?: { initial?: any; animate?: any; transition?: any },
  animateOut?: { exit?: any }
) => {
  const defaultAnimation = { initial: {}, animate: {}, exit: {} };
  const presetAnimation = preset ? ANIMATION_PRESETS[preset] : defaultAnimation;
  return {
    initial: animateIn?.initial || presetAnimation.initial,
    animate: animateIn?.animate || presetAnimation.animate,
    exit: animateOut?.exit || presetAnimation.exit,
  };
};

// Expandable Component
type ExpandablePropsBase = Omit<HTMLMotionProps<"div">, "children">;
interface ExpandableProps extends ExpandablePropsBase {
  children: ReactNode | ((props: { isExpanded: boolean }) => ReactNode);
  expanded?: boolean;
  onToggle?: () => void;
  transitionDuration?: number;
  easeType?: string;
  expandDirection?: "vertical" | "horizontal" | "both";
  expandBehavior?: "replace" | "push";
  initialDelay?: number;
  onExpandStart?: () => void;
  onExpandEnd?: () => void;
  onCollapseStart?: () => void;
  onCollapseEnd?: () => void;
}

const Expandable = forwardRef<HTMLDivElement, ExpandableProps>(
  (
    {
      children,
      expanded,
      onToggle,
      transitionDuration = 0.3,
      easeType = "easeInOut",
      expandDirection = "vertical",
      expandBehavior = "replace",
      initialDelay = 0,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      ...props
    },
    ref
  ) => {
    const [isExpandedInternal, setIsExpandedInternal] = useState(false);
    const isExpanded = expanded !== undefined ? expanded : isExpandedInternal;
    const toggleExpand = onToggle || (() => setIsExpandedInternal((prev) => !prev));

    useEffect(() => {
      if (isExpanded) {
        onExpandStart?.();
      } else {
        onCollapseStart?.();
      }
    }, [isExpanded, onExpandStart, onCollapseStart]);

    const contextValue: ExpandableContextType = {
      isExpanded,
      toggleExpand,
      expandDirection,
      expandBehavior,
      transitionDuration,
      easeType,
      initialDelay,
      onExpandEnd,
      onCollapseEnd,
    };

    return (
      <ExpandableContext.Provider value={contextValue}>
        <motion.div
          ref={ref}
          initial={false}
          animate={{
            transition: { duration: transitionDuration, ease: easeType, delay: initialDelay },
          }}
          {...props}
        >
          {typeof children === "function" ? children({ isExpanded }) : children}
        </motion.div>
      </ExpandableContext.Provider>
    );
  }
);
Expandable.displayName = "Expandable";

// ExpandableContent Component
const ExpandableContent = forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref"> & {
    preset?: keyof typeof ANIMATION_PRESETS;
    animateIn?: { initial?: any; animate?: any; transition?: any };
    animateOut?: { exit?: any };
    stagger?: boolean;
    staggerChildren?: number;
    keepMounted?: boolean;
  }
>(
  (
    {
      children,
      preset,
      animateIn,
      animateOut,
      stagger = false,
      staggerChildren = 0.1,
      keepMounted = false,
      ...props
    },
    ref
  ) => {
    const { isExpanded, transitionDuration, easeType } = useExpandable();
    const [measureRef, { height: measuredHeight }] = useMeasure();
    const animatedHeight = useMotionValue(0);
    const smoothHeight = useSpring(animatedHeight, springConfig);

    useEffect(() => {
      if (isExpanded) {
        animatedHeight.set(measuredHeight);
      } else {
        animatedHeight.set(0);
      }
    }, [isExpanded, measuredHeight, animatedHeight]);

    const animationProps = getAnimationProps(preset, animateIn, animateOut);

    return (
      <motion.div
        ref={ref}
        style={{ height: smoothHeight, overflow: "hidden" }}
        transition={{ duration: transitionDuration, ease: easeType }}
        {...props}
      >
        <AnimatePresence initial={false}>
          {(isExpanded || keepMounted) && (
            <motion.div
              ref={measureRef}
              initial={animationProps.initial}
              animate={animationProps.animate}
              exit={animationProps.exit}
              transition={{ duration: transitionDuration, ease: easeType }}
            >
              {stagger ? (
                <motion.div
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: staggerChildren } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {React.Children.map(children as React.ReactNode, (child, index) => (
                    <motion.div
                      key={index}
                      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                      {child}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                children
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
ExpandableContent.displayName = "ExpandableContent";

// ExpandableCard Component
interface ExpandableCardProps {
  children: ReactNode;
  className?: string;
  collapsedSize?: { width?: number; height?: number };
  expandedSize?: { width?: number; height?: number };
  hoverToExpand?: boolean;
  expandDelay?: number;
  collapseDelay?: number;
}

const ExpandableCard = forwardRef<HTMLDivElement, ExpandableCardProps>(
  (
    {
      children,
      className = "",
      collapsedSize = { width: 320, height: 211 },
      expandedSize = { width: 480, height: undefined },
      hoverToExpand = false,
      expandDelay = 0,
      collapseDelay = 0,
      ...props
    },
    ref
  ) => {
    const { isExpanded, toggleExpand, expandDirection } = useExpandable();
    const [measureRef, { width, height }] = useMeasure();
    const animatedWidth = useMotionValue(collapsedSize.width || 0);
    const animatedHeight = useMotionValue(collapsedSize.height || 0);
    const smoothWidth = useSpring(animatedWidth, springConfig);
    const smoothHeight = useSpring(animatedHeight, springConfig);

    useEffect(() => {
      if (isExpanded) {
        animatedWidth.set(expandedSize.width || width);
        animatedHeight.set(expandedSize.height || height);
      } else {
        animatedWidth.set(collapsedSize.width || width);
        animatedHeight.set(collapsedSize.height || height);
      }
    }, [isExpanded, collapsedSize, expandedSize, width, height, animatedWidth, animatedHeight]);

    const handleHover = () => {
      if (hoverToExpand && !isExpanded) {
        setTimeout(toggleExpand, expandDelay);
      }
    };

    const handleHoverEnd = () => {
      if (hoverToExpand && isExpanded) {
        setTimeout(toggleExpand, collapseDelay);
      }
    };

    return (
      <motion.div
        ref={ref}
        className={cn("cursor-pointer", className)}
        style={{
          width: expandDirection === "vertical" ? collapsedSize.width : smoothWidth,
          height: expandDirection === "horizontal" ? collapsedSize.height : smoothHeight,
        }}
        transition={springConfig}
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        {...props}
      >
        <div
          className={cn(
            "grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-[2rem]",
            "shadow-[inset_0_0_1px_1px_#ffffff4d] sm:shadow-[inset_0_0_2px_1px_#ffffff4d]",
            "ring-1 ring-black/5",
            "max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)]",
            "mx-auto w-full",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-[2rem] p-1 sm:p-1.5 md:p-2 shadow-md shadow-black/5">
            <div className="rounded-md sm:rounded-lg md:rounded-3xl bg-white p-2 sm:p-3 md:p-4 shadow-xl ring-1 ring-black/5">
              <div className="w-full h-full overflow-hidden">
                <div ref={measureRef} className="flex flex-col h-full">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
ExpandableCard.displayName = "ExpandableCard";

// ExpandableTrigger Component
const ExpandableTrigger = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const { toggleExpand } = useExpandable();
    return (
      <div ref={ref} onClick={toggleExpand} className="cursor-pointer" {...props}>
        {children}
      </div>
    );
  }
);
ExpandableTrigger.displayName = "ExpandableTrigger";

// ExpandableCardHeader Component
const ExpandableCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      <motion.div layout className="flex justify-between items-start">
        {children}
      </motion.div>
    </div>
  )
);
ExpandableCardHeader.displayName = "ExpandableCardHeader";

// ExpandableCardContent Component
const ExpandableCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 pt-0 px-4 overflow-hidden flex-grow", className)}
      {...props}
    >
      <motion.div layout>{children}</motion.div>
    </div>
  )
);
ExpandableCardContent.displayName = "ExpandableCardContent";

// ExpandableCardFooter Component
const ExpandableCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-start p-4 pt-0", className)} {...props} />
  )
);
ExpandableCardFooter.displayName = "ExpandableCardFooter";

// WeatherForecastCard Component
function WeatherForecastCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      <ExpandableTrigger>
        <ExpandableCard
          collapsedSize={{ width: 300, height: 220 }}
          expandedSize={{ width: 500, height: 420 }}
          hoverToExpand={false}
          expandDelay={100}
          collapseDelay={400}
        >
          <ExpandableCardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sun className="w-8 h-8 text-yellow-400 mr-2" />
                <ExpandableContent preset="blur-sm" keepMounted={true}>
                  <h3 className="font-medium text-lg">Today's Weather</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    72°F
                  </Badge>
                </ExpandableContent>
              </div>
            </div>
          </ExpandableCardHeader>

          <ExpandableCardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-2xl font-bold">72°F</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Feels like 75°F
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Sunny</p>
                <ExpandableContent
                  preset="blur-sm"
                  stagger
                  staggerChildren={0.1}
                  keepMounted={true}
                  animateIn={{
                    initial: { opacity: 0, y: 20, rotate: -5 },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    High 78° / Low 65°
                  </p>
                </ExpandableContent>
              </div>
            </div>
            <ExpandableContent
              preset="blur-sm"
              stagger
              staggerChildren={0.1}
              keepMounted={true}
              animateIn={{
                initial: { opacity: 0, y: 20, rotate: -5 },
                animate: { opacity: 1, y: 0, rotate: 0 },
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Humidity</span>
                  </div>
                  <span>45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Wind</span>
                  </div>
                  <span>8 mph</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Precipitation</span>
                  </div>
                  <span>0%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">5-Day Forecast</h4>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                  <div key={day} className="flex justify-between items-center">
                    <span>{day}</span>
                    <div className="flex items-center">
                      <Sun className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>{70 + index}°F</span>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableContent>
          </ExpandableCardContent>
          <ExpandableCardFooter>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: 5 minutes ago
            </p>
          </ExpandableCardFooter>
        </ExpandableCard>
      </ExpandableTrigger>
    </Expandable>
  );
}

// Main Page Component
export default function WeatherPage() {
  return (
    <div className="min-h-screen flex items-start justify-center">
      <div className="max-w-7xl mx-auto">
        <WeatherForecastCard />
      </div>
    </div>
  );
}