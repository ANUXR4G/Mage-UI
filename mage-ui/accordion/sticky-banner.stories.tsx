import StickyBanner from "@/mage-ui/accordion/sticky-banner";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Accordion/Sticky Banner",
  component: StickyBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StickyBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
