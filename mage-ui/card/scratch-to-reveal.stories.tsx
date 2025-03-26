import { ScratchToRevealDemo } from "@/mage-ui/card/scratch-to-reveal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Scratch To Reveal",
  component: ScratchToRevealDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScratchToRevealDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
