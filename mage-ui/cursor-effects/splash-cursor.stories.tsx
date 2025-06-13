import SplashCursor from "@/mage-ui/cursor-effects/splash-cursor";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Splash Cursor",
  component: SplashCursor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SplashCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
