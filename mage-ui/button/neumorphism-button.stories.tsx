import NeumorphismButton from "@/mage-ui/button/neumorphism-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Neumorphism Button",
  component: NeumorphismButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NeumorphismButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
