import BoldCopy from "@/mage-ui/text/bold-copy";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Bold Copy",
  component: BoldCopy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BoldCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "mage-ui",
  },
};
