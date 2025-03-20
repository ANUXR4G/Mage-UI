import { LayoutGridDemo } from "@/mage-ui/image/layout-grid";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Layout Grid",
  component: LayoutGridDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LayoutGridDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
