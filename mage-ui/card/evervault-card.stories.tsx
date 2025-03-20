import EvervaultCard from "@/mage-ui/card/evervault-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Evervault Card",
  component: EvervaultCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EvervaultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
