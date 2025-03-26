import { TextAnimateDemo } from "@/mage-ui/text/text-animate";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Animate",
  component: TextAnimateDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextAnimateDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
