"use client";

import { Meta, StoryObj } from "@storybook/react";
import { StarsCard } from "@/mage-ui/card/stars-card";




// ✅ **Correct Default Export for Storybook**
export default {
  title: "Card/Stars Card",
  component: StarsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StarsCard>;

// Define Story Type
type Story = StoryObj<typeof StarsCard>;

// Export Story Variants
export const Primary: Story = {
  args: {
  },
};
