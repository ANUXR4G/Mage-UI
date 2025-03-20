import CharacterCursorEffect from "@/mage-ui/cursor-effects/character-cursor-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Character Cursor Effect",
  component: CharacterCursorEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CharacterCursorEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
