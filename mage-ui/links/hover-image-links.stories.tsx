import { HoverImageLinks } from "@/mage-ui/links/hover-image-links";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Links/Hover Image Links",
  component: HoverImageLinks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverImageLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
