import SpotlightButton from "@/mage-ui/button/spotlight-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Spotlight Button",
  component: SpotlightButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SpotlightButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
