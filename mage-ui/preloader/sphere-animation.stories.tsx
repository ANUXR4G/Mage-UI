import SphereAnimation from "@/mage-ui/preloader/sphere-animation";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Preloader/Sphere Animation",
  component: SphereAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SphereAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
