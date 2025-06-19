import YoutubePlayerCard from "@/mage-ui/card/youtube-player-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Youtube Player Card",
  component: YoutubePlayerCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof YoutubePlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
