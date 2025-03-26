import HoverPopup from "@/mage-ui/icon/hover-popup";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icon/Hover Popup",
  component: HoverPopup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
