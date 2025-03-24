import WaterDropGrid from "@/mage-ui/background/water-drop-grid";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Water Drop Grid",
  component: WaterDropGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WaterDropGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
