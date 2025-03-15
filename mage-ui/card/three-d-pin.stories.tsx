"use client"
import { PinContainer } from "@/mage-ui/card/three-d-pin";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PinContainer> = {
  title: "Card/ThreeDPin",
  component: PinContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PinContainer>;

export const Primary: Story = {
  args: {
    title: "/mageui.live",
    href: "https://github.com/nodesinfinity",
    children: (
      <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] p-4">
        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
          Mage UI
        </h3>
        <div className="text-base !m-0 !p-0 font-normal">
          <span className="text-slate-500">
            Customizable Tailwind CSS and Framer Motion Components.
          </span>
        </div>
        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
      </div>
    ),
  },
};
