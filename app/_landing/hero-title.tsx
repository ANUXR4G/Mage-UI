import { Anaheim } from "next/font/google";

import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { cn } from "@/lib/utils";
import WaveReveal from "@/mage-ui/text/wave-reveal";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroTitle() {
  return (
    <div className="group relative z-10 inline-block">
      <ComponentLinkWrapper link="/docs/text/wave-reveal">
        <WaveReveal
          text="MAGE-UI"
          className={cn(
            "select-none px-0 text-7xl uppercase text-amber-700 transition-opacity delay-1000 dark:text-amber-500 md:px-0 md:text-8xl",
            titleFont.className,
          )}
          delay={0}
          direction="up"
          duration="300ms"
        />
      </ComponentLinkWrapper>
    </div>
  );
}
