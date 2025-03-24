import EncryptButton from "@/mage-ui/button/encrypt-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Encrypt Button",
  component: EncryptButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EncryptButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
