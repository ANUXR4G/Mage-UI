import MusicCard from "@/mage-ui/card/music-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Music Card",
  component: MusicCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MusicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
