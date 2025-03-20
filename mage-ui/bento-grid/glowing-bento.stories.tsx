import GlowingBento from "@/mage-ui/bento-grid/glowing-bento";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Glowing Bento",
  component: GlowingBento,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GlowingBento>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
