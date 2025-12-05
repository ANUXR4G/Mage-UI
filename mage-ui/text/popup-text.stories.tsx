// CORRECT - Named import
import { PopupText } from "@/mage-ui/text/popup-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Popup Text",
  component: PopupText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: 'text' },
    delay: { control: { type: 'number', min: 0, max: 500, step: 10 } },
    duration: { control: { type: 'number', min: 0.1, max: 3, step: 0.1 } },
  },
} satisfies Meta<typeof PopupText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello, MAGE-UI !",
    className: "text-2xl font-semibold text-white",
    delay: 100,
    duration: 0.6,
    splitType: "chars",
  },
};
