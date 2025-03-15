import type { Meta, StoryObj } from "@storybook/react";
import { ThreeDCardEffect } from "@/mage-ui/card/three-d-card-effect";

const meta: Meta<typeof ThreeDCardEffect> = {
  title: "Card/ThreeDCardEffect",
  component: ThreeDCardEffect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <ThreeDCardEffect {...args} />, // Only this appears in "Show Code"
};
