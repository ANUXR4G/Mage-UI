// stories/ShinyText.stories.tsx (if you want separate stories)
import { ShinyText } from "@/mage-ui/text/shiny-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Shiny Text",
  component: ShinyText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content to display with shiny effect'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the shine animation'
    },
    speed: {
      control: { type: 'number', min: 1, max: 20, step: 0.5 },
      description: 'Animation speed in seconds'
    },
  },
} satisfies Meta<typeof ShinyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Just some shiny text!',
    disabled: false,
    speed: 3,
    className: 'text-3xl font-bold',
  },
};
