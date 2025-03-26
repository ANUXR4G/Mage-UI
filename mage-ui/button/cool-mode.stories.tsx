import { CoolModeDemo } from "@/mage-ui/button/cool-mode";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Cool Mode",
  component: CoolModeDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CoolModeDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
