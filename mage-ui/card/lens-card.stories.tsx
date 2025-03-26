import LensCard from "@/mage-ui/card/lens-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Lens Card",
  component: LensCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LensCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
