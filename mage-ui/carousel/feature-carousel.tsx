"use client"
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion"

// Global styles
const globalStyles = `
  .animated-cards::before {
    pointer-events: none;
    position: absolute;
    user-select: none;
    border-radius: 1.5rem;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 300ms;
    background: radial-gradient(
      1000px circle at var(--x) var(--y),
      #c9ee80 0,
      #eebbe2 10%,
      #adc0ec 25%,
      #c9ee80 35%,
      rgba(255, 255, 255, 0) 50%,
      transparent 80%
    );
    z-index: -1;
    content: "";
    inset: -1px;
  }
  
  .animated-cards:hover::before {
    opacity: 1;
  }
`

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

// Types
type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

interface ImageSet {
  step1dark1?: string
  step1dark2?: string
  step1light1: string
  step1light2: string
  step2dark1?: string
  step2dark2?: string
  step2light1: string
  step2light2: string
  step3dark?: string
  step3light: string
  step4light: string
  alt: string
}

interface FeatureCarouselProps extends CardProps {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  image: ImageSet
}

interface StepImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

interface Step {
  id: string
  name: string
  title: string
  description: string
}

// Constants
const TOTAL_STEPS = 4

const steps = [
  {
    id: "1",
    name: "Step 1",
    title: "Beautiful Interfaces",
    description: "Create stunning user interfaces with smooth animations and modern design patterns that captivate your users.",
  },
  {
    id: "2",
    name: "Step 2",
    title: "Seamless Interactions",
    description: "Build responsive and intuitive interactions that make your application feel alive and engaging.",
  },
  {
    id: "3",
    name: "Step 3",
    title: "Performance Optimized",
    description: "Enjoy lightning-fast performance with optimized animations and efficient rendering for the best user experience.",
  },
  {
    id: "4",
    name: "Step 4",
    title: "Mobile Ready",
    description: "Your components work perfectly across all devices with responsive design and touch-friendly interactions.",
  },
] as const

// Sample images using placeholder service
const sampleImages = {
  step1light1: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  step1light2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  step2light1: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  step2light2: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  step3light: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  step4light: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  alt: "Feature demonstration"
}

/**
 * Animation presets for reusable motion configurations.
 */
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset
  delay?: number
  onAnimationComplete?: () => void
}

/**
 * Custom hook for managing cyclic transitions with auto-play functionality.
 */
function useNumberCycler(
  totalSteps: number = TOTAL_STEPS,
  interval: number = 4000
) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [isManualInteraction, setIsManualInteraction] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const setupTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
      setIsManualInteraction(false)
      setupTimer()
    }, interval)
  }, [interval, totalSteps])

  const increment = useCallback(() => {
    setIsManualInteraction(true)
    setCurrentNumber((prev) => (prev + 1) % totalSteps)
    setupTimer()
  }, [totalSteps, setupTimer])

  useEffect(() => {
    setupTimer()
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [setupTimer])

  return {
    currentNumber,
    increment,
    isManualInteraction,
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.matchMedia("(max-width: 768px)").matches
      setIsMobile(isSmall)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Components
function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants: Variants = {
  inactive: {
    scale: 0.8,
    opacity: 0.5,
  },
  active: {
    scale: 1,
    opacity: 1,
  },
}

const StepImage = forwardRef<
  HTMLImageElement,
  StepImageProps & { [key: string]: any }
>(
  (
    { src, alt, className, style, width = 800, height = 600, ...props },
    ref
  ) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        width={width}
        height={height}
        style={{
          position: "absolute",
          userSelect: "none",
          maxWidth: "unset",
          objectFit: "cover",
          ...style,
        }}
        {...props}
      />
    )
  }
)
StepImage.displayName = "StepImage"

const MotionStepImage = motion(StepImage)

/**
 * Wrapper component for StepImage that applies animation presets.
 */
const AnimatedStepImage = ({
  preset = "fadeInScale",
  delay = 0,
  onAnimationComplete,
  ...props
}: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset]
  return (
    <MotionStepImage
      {...props}
      {...presetConfig}
      transition={{
        ...presetConfig.transition,
        delay,
      }}
      onAnimationComplete={onAnimationComplete}
    />
  )
}

/**
 * Main card component that handles mouse tracking for gradient effect.
 */
function FeatureCard({
  bgClass,
  children,
  step,
}: CardProps & {
  children: React.ReactNode
  step: number
}) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="animated-cards relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-neutral-900/90 to-stone-800 transition duration-300",
          "hover:border-transparent",
          bgClass
        )}
      >
        <div className="m-10 min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-4/6 flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <motion.h2
                className="text-xl font-bold tracking-tight text-white md:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {steps[step].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <p className="text-sm leading-5 text-neutral-300 sm:text-base sm:leading-5">
                  {steps[step].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Progress indicator component that shows current step and completion status.
 */
function Steps({
  steps,
  current,
  onChange,
}: {
  steps: readonly Step[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol
        className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
        role="list"
      >
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent

          return (
            <motion.li
              key={`${step.name}-${stepIdx}`}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-neutral-500/20" : "bg-neutral-500/10"
              )}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                  (isFuture || isCurrent) && "pointer-events-none"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <motion.span
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full duration-300",
                      isCompleted && "bg-green-400 text-white",
                      isCurrent && "bg-yellow-300/80 text-neutral-800",
                      isFuture && "bg-neutral-300/10"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <IconCheck className="h-3 w-3 text-white" />
                      </motion.div>
                    ) : (
                      <span
                        className={cn(
                          "text-xs",
                          isCurrent ? "text-neutral-800" : "text-lime-300"
                        )}
                      >
                        {stepIdx + 1}
                      </span>
                    )}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "text-sm font-medium duration-300",
                      isCompleted && "text-neutral-400",
                      isCurrent && "text-lime-300",
                      isFuture && "text-neutral-500"
                    )}
                  >
                    {step.name}
                  </motion.span>
                </span>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

const defaultClasses = {
  step1img1:
    "pointer-events-none w-[50%] border border-neutral-100/10 transition-all duration-500 rounded-2xl",
  step1img2:
    "pointer-events-none w-[60%] border border-neutral-100/10 transition-all duration-500 overflow-hidden rounded-2xl",
  step2img1:
    "pointer-events-none w-[50%] border border-neutral-100/10 transition-all duration-500 rounded-2xl overflow-hidden",
  step2img2:
    "pointer-events-none w-[40%] border border-neutral-100/10 transition-all duration-500 rounded-2xl overflow-hidden",
  step3img:
    "pointer-events-none w-[90%] border border-neutral-100/10 rounded-2xl transition-all duration-500 overflow-hidden",
  step4img:
    "pointer-events-none w-[90%] border border-neutral-100/10 rounded-2xl transition-all duration-500 overflow-hidden",
} as const

/**
 * Main component that orchestrates the multi-step animation sequence.
 */
function FeatureCarousel({
  image,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
  ...props
}: FeatureCarouselProps) {
  const { currentNumber: step, increment } = useNumberCycler()

  const renderStepContent = () => {
    const content = () => {
      switch (step) {
        case 0:
          return (
            <div className="relative w-full h-full">
              <AnimatedStepImage
                alt={image.alt}
                className={cn(step1img1Class, "left-[5%] top-[30%]")}
                src={image.step1light1}
                preset="slideInLeft"
              />
              <AnimatedStepImage
                alt={image.alt}
                className={cn(step1img2Class, "right-[5%] top-[25%]")}
                src={image.step1light2}
                preset="slideInRight"
                delay={0.1}
              />
            </div>
          )
        case 1:
          return (
            <div className="relative w-full h-full">
              <AnimatedStepImage
                alt={image.alt}
                className={cn(step2img1Class, "left-[10%] top-[30%]")}
                src={image.step2light1}
                preset="fadeInScale"
              />
              <AnimatedStepImage
                alt={image.alt}
                className={cn(step2img2Class, "right-[15%] top-[35%]")}
                src={image.step2light2}
                preset="fadeInScale"
                delay={0.1}
              />
            </div>
          )
        case 2:
          return (
            <div className="relative w-full h-full">
              <AnimatedStepImage
                alt={image.alt}
                className={cn(step3imgClass, "left-[5%] top-[30%]")}
                src={image.step3light}
                preset="fadeInScale"
              />
            </div>
          )
        case 3:
          return (
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 top-1/3 flex w-[90%] -translate-x-1/2 -translate-y-1/3 flex-col gap-12 text-center text-2xl font-bold">
                <AnimatedStepImage
                  alt={image.alt}
                  className="pointer-events-none w-full overflow-hidden rounded-2xl border border-neutral-100/10"
                  src={image.step4light}
                  preset="fadeInScale"
                  delay={0.1}
                />
              </div>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          {...ANIMATION_PRESETS.fadeInScale}
          className="w-full h-full absolute"
        >
          {content()}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <FeatureCard {...props} step={step}>
      {renderStepContent()}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-0 top-5 z-50 h-full w-full cursor-pointer"
      >
        <Steps current={step} onChange={() => { }} steps={steps} />
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 z-50 h-full w-full cursor-pointer"
        onClick={increment}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      />
    </FeatureCard>
  )
}

// Demo component
function FeatureCarouselDemo() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-[34px] bg-neutral-700 p-2">
        <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
          <FeatureCarousel
            title="Interactive Feature Demo"
            description="Showcase your features with smooth animations and transitions"
            step1img1Class={cn(
              "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500",
              "rounded-[24px] left-[5%] top-[30%]",
              "group-hover:translate-y-2"
            )}
            step1img2Class={cn(
              "pointer-events-none w-[60%] border border-stone-100/10 transition-all duration-500 overflow-hidden",
              "rounded-2xl right-[5%] top-[25%]",
              "group-hover:-translate-y-6"
            )}
            step2img1Class={cn(
              "pointer-events-none w-[50%] rounded-t-[24px] overflow-hidden border border-stone-100/10 transition-all duration-500",
              "left-[10%] top-[30%]",
              "group-hover:translate-y-2"
            )}
            step2img2Class={cn(
              "pointer-events-none w-[40%] rounded-t-[24px] border border-stone-100/10 transition-all duration-500 rounded-2xl overflow-hidden",
              "right-[15%] top-[35%]",
              "group-hover:-translate-y-6"
            )}
            step3imgClass={cn(
              "pointer-events-none w-[90%] border border-stone-100/10 rounded-t-[24px] transition-all duration-500 overflow-hidden",
              "left-[5%] top-[30%]"
            )}
            step4imgClass={cn(
              "pointer-events-none w-[90%] border border-stone-100/10 rounded-t-[24px] transition-all duration-500 overflow-hidden",
              "left-[5%] top-[30%]"
            )}
            image={sampleImages}
            bgClass="bg-gradient-to-tr from-neutral-900/90 to-neutral-800/90"
          />
        </div>
      </div>
    </div>
  )
}

// Main page component
export default function FeatureCarouselPage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <FeatureCarouselDemo />
          </div>
        </div>
      </div>
    </>
  )
}