import {ShinyButtonDemo} from "@/mage-ui/button/shiny-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Shiny Button",
  component: ShinyButtonDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShinyButtonDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
