import { ComponentCard } from "@/components/component-card";
import Marquee from "@/mage-ui/container/marquee";
import Code from "@/mage-ui/skeleton/code";
import CookieBanner from "@/mage-ui/skeleton/cookie-banner";
import List from "@/mage-ui/skeleton/list";
import Receipt from "@/mage-ui/skeleton/receipt";
import Report from "@/mage-ui/skeleton/report";

export default function SkeletonSection() {
  return (
    <ComponentCard rounded={false} className="my-4" name="Skeleton" href="/docs/skeleton">
      <Marquee className="pt-0" applyMask={false} reverse>
        <Receipt />
        <List />
        <CookieBanner />
        <Code />
        <Report />
      </Marquee>
    </ComponentCard>
  );
}
