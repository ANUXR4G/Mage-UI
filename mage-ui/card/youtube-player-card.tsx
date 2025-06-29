// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Maximize2, Minimize2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

// Utility function for classNames
function cn(...inputs: (string | undefined | false)[]): string {
  return inputs.filter(Boolean).join(" ")
}

// YouTubePlayerProps interface
interface YouTubePlayerProps {
  videoId: string
  title?: string
  defaultExpanded?: boolean
  customThumbnail?: string
  className?: string
  containerClassName?: string
  expandedClassName?: string
  thumbnailClassName?: string
  thumbnailImageClassName?: string
  playButtonClassName?: string
  playIconClassName?: string
  titleClassName?: string
  controlsClassName?: string
  expandButtonClassName?: string
  backdropClassName?: string
  playerClassName?: string
}

// YouTubePlayerControlsProps interface
interface YouTubePlayerControlsProps {
  videoId: string
  expanded: boolean
  playing: boolean
  isHovered: boolean
  onToggleExpand: () => void
  controlsClassName?: string
  expandButtonClassName?: string
}

// YouTubePlayerControls Component
function YouTubePlayerControls({
  videoId,
  expanded,
  playing,
  isHovered,
  onToggleExpand,
  controlsClassName,
  expandButtonClassName,
}: YouTubePlayerControlsProps) {
  const shouldShow = !playing || isHovered || expanded

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          layoutId={`youtube-player-controls-${videoId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("absolute right-2 top-2 z-20", controlsClassName)}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="icon"
              onClick={onToggleExpand}
              className={cn(
                "h-8 w-8 rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 focus-visible:ring-ring/50 md:h-9 md:w-9",
                expandButtonClassName
              )}
              aria-label={expanded ? "Minimize video" : "Maximize video"}
            >
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {expanded ? (
                  <Minimize2 className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// YouTubePlayer Component
function YouTubePlayer({
  videoId,
  title,
  defaultExpanded = false,
  customThumbnail,
  className,
  containerClassName,
  expandedClassName,
  thumbnailClassName,
  thumbnailImageClassName,
  playButtonClassName,
  playIconClassName,
  titleClassName,
  controlsClassName,
  expandButtonClassName,
  backdropClassName,
  playerClassName,
}: YouTubePlayerProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [playing, setPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const extractVideoId = (id: string) => {
    if (id.includes("youtube.com") || id.includes("youtu.be")) {
      try {
        const url = new URL(id)
        if (id.includes("youtube.com")) {
          return url.searchParams.get("v") || ""
        } else {
          return url.pathname.substring(1)
        }
      } catch (error) {
        console.error("Invalid YouTube URL:", error)
        return id
      }
    }
    return id
  }

  const actualVideoId = extractVideoId(videoId)

  const handlePlay = () => {
    setPlaying(true)
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expanded) {
        setExpanded(false)
      }
    }
    if (expanded) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [expanded])

  const getThumbnailUrl = () => {
    if (customThumbnail) return customThumbnail
    return actualVideoId
      ? `https://i.ytimg.com/vi/${actualVideoId}/hqdefault.jpg`
      : ""
  }

  return (
    <>
      <div
        className={cn(
          "relative",
          expanded ? "invisible" : "visible",
          className
        )}
      >
        <motion.div
          layoutId={`youtube-player-${videoId}`}
          className={cn(
            "overflow-hidden border bg-card text-card-foreground shadow-lg rounded-xl",
            containerClassName
          )}
        >
          <motion.div
            layoutId={`youtube-player-content-${videoId}`}
            className={cn("relative aspect-video bg-muted", playerClassName)}
          >
            {!playing && (
              <>
                <motion.div
                  layoutId={`youtube-player-thumbnail-container-${videoId}`}
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br from-muted to-muted/80",
                    thumbnailClassName
                  )}
                >
                  {getThumbnailUrl() && (
                    <motion.img
                      layoutId={`youtube-player-thumbnail-${videoId}`}
                      src={getThumbnailUrl()}
                      alt={title || "Video thumbnail"}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover opacity-70",
                        thumbnailImageClassName
                      )}
                    />
                  )}
                </motion.div>

                <motion.div
                  layoutId={`youtube-player-content-overlay-${videoId}`}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className={cn(
                      "relative h-16 w-16 rounded-full border border-border/20 bg-background/80 backdrop-blur-sm md:h-20 md:w-20 p-0",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      playButtonClassName
                    )}
                    onClick={handlePlay}
                    aria-label="Play video"
                  >
                    <Play
                      className={cn(
                        "h-6 w-6 translate-x-[2px] fill-primary text-primary md:h-8 md:w-8",
                        playIconClassName
                      )}
                    />
                  </Button>

                  {title && (
                    <motion.h3
                      layoutId={`youtube-player-title-${videoId}`}
                      className={cn(
                        "mt-4 max-w-xs text-center text-sm font-medium text-secondary/90 md:max-w-md md:text-base",
                        titleClassName
                      )}
                    >
                      {title}
                    </motion.h3>
                  )}
                </motion.div>
              </>
            )}

            {playing && (
              <iframe
                src={`https://www.youtube.com/embed/${actualVideoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}

            <YouTubePlayerControls
              videoId={videoId}
              expanded={expanded}
              playing={playing}
              isHovered={isHovered}
              onToggleExpand={toggleExpand}
              controlsClassName={controlsClassName}
              expandButtonClassName={expandButtonClassName}
            />
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
                backdropClassName
              )}
              onClick={toggleExpand}
              aria-label="Close expanded video"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                layoutId={`youtube-player-${videoId}`}
                className={cn(
                  "overflow-hidden border bg-card text-card-foreground shadow-xl rounded-lg pointer-events-auto",
                  "w-[90vw] max-w-[1200px] max-h-[90vh] aspect-video",
                  expandedClassName
                )}
              >
                <motion.div
                  layoutId={`youtube-player-content-${videoId}`}
                  className={cn(
                    "relative aspect-video bg-muted",
                    playerClassName
                  )}
                >
                  {!playing && (
                    <>
                      <motion.div
                        layoutId={`youtube-player-thumbnail-container-${videoId}`}
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br from-muted to-muted/80",
                          thumbnailClassName
                        )}
                      >
                        {getThumbnailUrl() && (
                          <motion.img
                            layoutId={`youtube-player-thumbnail-${videoId}`}
                            src={getThumbnailUrl()}
                            alt={title || "Video thumbnail"}
                            className={cn(
                              "absolute inset-0 h-full w-full object-cover opacity-70",
                              thumbnailImageClassName
                            )}
                          />
                        )}
                      </motion.div>

                      <motion.div
                        layoutId={`youtube-player-content-overlay-${videoId}`}
                        className="absolute inset-0 flex flex-col items-center justify-center z-10"
                      >
                        <Button
                          size="lg"
                          variant="secondary"
                          className={cn(
                            "relative h-16 w-16 rounded-full border border-border/20 bg-background/80 backdrop-blur-sm md:h-20 md:w-20 p-0",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            playButtonClassName
                          )}
                          onClick={handlePlay}
                          aria-label="Play video"
                        >
                          <Play
                            className={cn(
                              "h-6 w-6 translate-x-[2px] fill-primary text-primary md:h-8 md:w-8",
                              playIconClassName
                            )}
                          />
                        </Button>

                        {title && (
                          <motion.h3
                            layoutId={`youtube-player-title-${videoId}`}
                            className={cn(
                              "mt-4 max-w-xs text-center text-sm font-medium text-foreground/90 md:max-w-md md:text-base",
                              titleClassName
                            )}
                          >
                            {title}
                          </motion.h3>
                        )}
                      </motion.div>
                    </>
                  )}

                  {playing && (
                    <iframe
                      src={`https://www.youtube.com/embed/${actualVideoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=1`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  )}

                  <YouTubePlayerControls
                    videoId={videoId}
                    expanded={expanded}
                    playing={playing}
                    isHovered={isHovered}
                    onToggleExpand={toggleExpand}
                    controlsClassName={controlsClassName}
                    expandButtonClassName={expandButtonClassName}
                  />
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">YouTube Player Demo</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <YouTubePlayer
          videoId="dQw4w9WgXcQ" // Example: Rick Astley - Never Gonna Give You Up
          title="Sample YouTube Video"
          defaultExpanded={false}
          className="mx-auto"
          containerClassName="border border-gray-200"
          thumbnailClassName="bg-gradient-to-br from-gray-100 to-gray-200"
          playButtonClassName="bg-white/90 hover:bg-white"
          titleClassName="text-white drop-shadow-md"
          controlsClassName="top-4 right-4"
          expandButtonClassName="bg-white/80 hover:bg-white"
        />

        <YouTubePlayer
          videoId="https://youtu.be/kJQP7kiw5Fk" // Example: Despacito
          title="Another Sample Video"
          defaultExpanded={false}
          className="mx-auto"
          containerClassName="border border-blue-200"
          thumbnailClassName="bg-gradient-to-br from-blue-100 to-blue-200"
          playButtonClassName="bg-blue-500/90 hover:bg-blue-500"
          titleClassName="text-white drop-shadow-lg"
          controlsClassName="top-4 right-4"
          expandButtonClassName="bg-blue-500/80 hover:bg-blue-500"
        />
      </div>
    </div>
  )
}