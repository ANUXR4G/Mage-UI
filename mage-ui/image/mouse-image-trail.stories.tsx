import { ImageTrail } from "@/mage-ui/image/mouse-image-trail";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Mouse Image Trail",
  component: ImageTrail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ImageTrail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
