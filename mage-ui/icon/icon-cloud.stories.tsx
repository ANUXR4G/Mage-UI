import {IconCloudDemo} from "@/mage-ui/icon/icon-cloud";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icon/Icon Cloud",
  component: IconCloudDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof IconCloudDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
