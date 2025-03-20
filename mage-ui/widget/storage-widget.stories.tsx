import StorageWidget from "@/mage-ui/widget/storage-widget";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Storage Widget",
  component: StorageWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StorageWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
