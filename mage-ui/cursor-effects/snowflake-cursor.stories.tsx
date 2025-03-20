import SnowflakeCursor from "@/mage-ui/cursor-effects/snowflake-cursor";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Snowflake Cursor",
  component: SnowflakeCursor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SnowflakeCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
