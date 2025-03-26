import { SparklesTextDemo } from "@/mage-ui/text/sparkles-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Sparkles Text",
  component: SparklesTextDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SparklesTextDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
