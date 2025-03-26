import { FlickeringGridRoundedDemo } from "@/mage-ui/background/flicking-grid";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Flicking Grid",
  component: FlickeringGridRoundedDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FlickeringGridRoundedDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
