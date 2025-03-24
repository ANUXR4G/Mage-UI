import FuzzyOverlay from "@/mage-ui/background/fuzzy-overlay";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Fuzzy Overlay",
  component: FuzzyOverlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FuzzyOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
