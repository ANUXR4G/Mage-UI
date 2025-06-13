import MagnetLines from "@/mage-ui/background/magnet-lines";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Magnet Lines",
  component: MagnetLines,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MagnetLines>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
