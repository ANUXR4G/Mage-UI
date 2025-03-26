import { MorphingTextDemo } from "@/mage-ui/text/morphing-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Morphing Text",
  component: MorphingTextDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MorphingTextDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
