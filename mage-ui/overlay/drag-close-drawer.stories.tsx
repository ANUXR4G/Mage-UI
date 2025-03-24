import { DragCloseDrawerExample } from "@/mage-ui/overlay/drag-close-drawer";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Overlay/Drag Close Drawer",
  component: DragCloseDrawerExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DragCloseDrawerExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
