import { AuroraTextDemo } from "@/mage-ui/text/aurora-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Aurora Text",
  component: AuroraTextDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AuroraTextDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
