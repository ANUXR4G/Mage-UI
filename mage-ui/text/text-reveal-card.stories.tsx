import TextRevealCard from "@/mage-ui/text/text-reveal-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Reveal Card",
  component: TextRevealCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextRevealCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
