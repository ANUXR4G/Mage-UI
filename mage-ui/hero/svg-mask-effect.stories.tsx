import SvgMaskEffect from "@/mage-ui/hero/svg-mask-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Svg Mask Effect",
  component: SvgMaskEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SvgMaskEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
