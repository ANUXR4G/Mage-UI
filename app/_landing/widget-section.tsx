"use client";

import React from "react";

import { ComponentCard } from "@/components/component-card";
import Marquee from "@/mage-ui/container/marquee";
import BatteryLevel from "@/mage-ui/widget/battery-level";
import ClockWithPhoto from "@/mage-ui/widget/clock-with-photo";
import Cycling from "@/mage-ui/widget/cycling";
import DeliveryCard from "@/mage-ui/widget/delivery-card";
import DirectionCard, { testDirectionProps } from "@/mage-ui/widget/direction-card";

export default function WidgetSection() {
  return (
    <ComponentCard rounded={false} className="my-4" name="Widgets" href="/docs/widget">
      <Marquee className="pt-0" applyMask={false}>
        <Cycling />
        <BatteryLevel />
        <DirectionCard directionValues={testDirectionProps.directionValues} />
        <ClockWithPhoto />
        <DeliveryCard />
      </Marquee>
    </ComponentCard>
  );
}
