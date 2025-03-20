import EnhancedTimeline from "@/mage-ui/progress/timeline";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Progress/Timeline",
  component: EnhancedTimeline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EnhancedTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
