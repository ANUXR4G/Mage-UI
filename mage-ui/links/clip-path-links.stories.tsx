import { ClipPathLinks }from "@/mage-ui/links/clip-path-links";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Links/Clip Path Links",
  component: ClipPathLinks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ClipPathLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
