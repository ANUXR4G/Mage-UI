import TextPressure from "@/mage-ui/text/text-pressure";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Pressure",
  component: TextPressure,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextPressure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
