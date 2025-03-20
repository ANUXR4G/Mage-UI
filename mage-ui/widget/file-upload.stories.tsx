import FileUpload from "@/mage-ui/widget/file-upload";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/File Upload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
