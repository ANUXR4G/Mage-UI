import FlipWords from "@/mage-ui/text/flip-words";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Flip Words",
  component: FlipWords,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FlipWords>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
