import { InteractiveGridPatternDemo } from "@/mage-ui/background/interactive-grid-pattern";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Interactive Grid Pattern",
  component: InteractiveGridPatternDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InteractiveGridPatternDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
