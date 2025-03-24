import { DivOrigami } from "@/mage-ui/icon/logo-origami";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icon/Logo Origami",
  component: DivOrigami,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DivOrigami>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
