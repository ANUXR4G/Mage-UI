import FlyoutButton from "@/mage-ui/button/flyout-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Flyout Button",
  component: FlyoutButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FlyoutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
