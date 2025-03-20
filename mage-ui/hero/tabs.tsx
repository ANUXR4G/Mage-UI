"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export default function TabsPage() {
  const tabs: Tab[] = [
    {
      title: "Product",
      value: "product",
      content: <TabContent title="Product Tab" />,
    },
    {
      title: "Services",
      value: "services",
      content: <TabContent title="Services Tab" />,
    },
    {
      title: "Playground",
      value: "playground",
      content: <TabContent title="Playground Tab" />,
    },
    {
      title: "Content",
      value: "content",
      content: <TabContent title="Content Tab" />,
    },
    {
      title: "Random",
      value: "random",
      content: <TabContent title="Random Tab" />,
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const Tabs = ({
  tabs: propTabs,
}: {
  tabs: Tab[];
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative px-4 py-2 rounded-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full"
              />
            )}
            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv tabs={tabs} active={active} hovering={hovering} />
    </>
  );
};

const FadeInDiv = ({
  tabs,
  active,
  hovering,
}: {
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  return (
    <div className="relative w-full h-full mt-32">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{ y: tab.value === active.value ? [0, 40, 0] : 0 }}
          className="w-full h-full absolute top-0 left-0"
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

const TabContent = ({ title }: { title: string }) => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
      <p>{title}</p>
      <Image
        src="/linear.webp"
        alt="dummy image"
        width={1000}
        height={1000}
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
    </div>
  );
};
