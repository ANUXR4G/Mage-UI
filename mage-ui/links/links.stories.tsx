import { Links } from "@/mage-ui/links/links";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Links/Links",
  component: Links,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Links>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
