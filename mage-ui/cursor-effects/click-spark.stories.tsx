import ClickSpark from "@/mage-ui/cursor-effects/click-spark";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Click Spark",
  component: ClickSpark,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ClickSpark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
