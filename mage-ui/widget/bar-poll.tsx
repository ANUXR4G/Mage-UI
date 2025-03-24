"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface VoteOption {
  title: string;
  votes: number;
  color: string;
}

const BarPoll = () => {
  const [votes, setVotes] = useState<VoteOption[]>([
    {
      title: "Tabs",
      votes: 1,
      color: "bg-indigo-500",
    },
    {
      title: "Spaces",
      votes: 2,
      color: "bg-fuchsia-500",
    },
    {
      title: "Who cares bro?",
      votes: 3,
      color: "bg-violet-500",
    },
  ]);

  return (
    <section className="bg-slate-900 px-4 py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-2 md:grid-cols-[1fr_400px] md:gap-12">
        <Options votes={votes} setVotes={setVotes} />
        <Bars votes={votes} />
      </div>
    </section>
  );
};

interface OptionsProps {
  votes: VoteOption[];
  setVotes: React.Dispatch<React.SetStateAction<VoteOption[]>>;
}

const Options: React.FC<OptionsProps> = ({ votes, setVotes }) => {
  const totalVotes = votes.reduce((acc, cv) => acc + cv.votes, 0);

  const handleIncrementVote = (vote: VoteOption) => {
    setVotes((prevVotes) =>
      prevVotes.map((v) =>
        v.title === vote.title ? { ...v, votes: v.votes + 1 } : v
      )
    );
  };

  return (
    <div className="col-span-1 py-12">
      <h3 className="mb-6 text-3xl font-semibold text-slate-50">
        What's your opinion?
      </h3>
      <div className="mb-6 space-y-2">
        {votes.map((vote) => (
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => handleIncrementVote(vote)}
            key={vote.title}
            className={`w-full rounded-md ${vote.color} py-2 font-medium text-white`}
          >
            {vote.title}
          </motion.button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="mb-2 italic text-slate-400">{totalVotes} votes</span>
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            setVotes((prevVotes) => prevVotes.map((v) => ({ ...v, votes: 0 })));
          }}
          className="rounded-sm bg-slate-700 px-2 py-1.5 text-sm font-medium text-slate-200"
        >
          Reset count
        </motion.button>
      </div>
    </div>
  );
};

interface BarsProps {
  votes: VoteOption[];
}

const Bars: React.FC<BarsProps> = ({ votes }) => {
  const totalVotes = votes.reduce((acc, cv) => acc + cv.votes, 0);

  return (
    <div
      className="col-span-1 grid min-h-[200px] gap-2"
      style={{
        gridTemplateColumns: `repeat(${votes.length}, minmax(0, 1fr))`,
      }}
    >
      {votes.map((vote) => {
        const height = vote.votes ? ((vote.votes / totalVotes) * 100).toFixed(2) : "0";
        return (
          <div key={vote.title} className="col-span-1">
            <div className="relative flex h-full w-full items-end overflow-hidden rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800">
              <motion.span
                animate={{ height: `${height}%` }}
                className={`relative z-0 w-full ${vote.color}`}
                transition={{ type: "spring" }}
              />
              <span className="absolute bottom-0 left-[50%] mt-2 inline-block w-full -translate-x-[50%] p-2 text-center text-sm text-slate-50">
                <b>{vote.title}</b>
                <br />
                <span className="text-xs text-slate-200">{vote.votes} votes</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarPoll;