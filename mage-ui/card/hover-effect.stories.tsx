import { HoverEffect, projects } from "@/mage-ui/card/hover-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HoverEffect> = {
  title: "Card/Hover Effect",
  component: HoverEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HoverEffect>;

export const Primary: Story = {
  args: {
    items: projects,
  },
};
