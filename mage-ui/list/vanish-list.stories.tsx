import { VanishList } from "@/mage-ui/list/vanish-list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Vanish List",
  component: VanishList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof VanishList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
