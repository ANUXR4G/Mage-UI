import VideoText from "@/mage-ui/text/video-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Video Text",
  component: VideoText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof VideoText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
