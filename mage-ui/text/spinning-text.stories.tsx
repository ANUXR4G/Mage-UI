import { SpinningTextBasic } from "@/mage-ui/text/spinning-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Spinning Text",
  component: SpinningTextBasic,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SpinningTextBasic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
