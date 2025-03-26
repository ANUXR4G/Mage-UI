import Globe from "@/mage-ui/icon/globe";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icon/Globe",
  component: Globe,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Globe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
