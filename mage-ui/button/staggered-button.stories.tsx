import StaggeredButton from "@/mage-ui/button/staggered-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Staggered Button",
  component: StaggeredButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StaggeredButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
