import ExpandableCard from "@/mage-ui/card/expandable-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Expandable Card",
  component: ExpandableCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ExpandableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
