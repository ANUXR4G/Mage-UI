import TextGenerateEffect from "@/mage-ui/text/text-generate-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Generate Effect",
  component: TextGenerateEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextGenerateEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
