import CalendarEvent, { testCalendarEventProps } from "@/mage-ui/widget/calendar-event";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Calendar event",
  component: CalendarEvent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CalendarEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testCalendarEventProps,
};
