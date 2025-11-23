import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

interface Step {
  title: string;
  description: string;
  narration: string;
  tip: string;
  arrayState: number[];
  highlight?: string;
  color?: string;
}

const steps: Step[] = [
  {
    title: "Unsorted Array",
    description: "We start with an unsorted list of numbers.",
    narration: "Let's sort these numbers using the bubble sort algorithm.",
    tip: "Let's sort these numbers using the bubble sort algorithm.",
    arrayState: [5, 2, 8, 1, 9],
  },
  {
    title: "First Pass - Compare 5 & 2",
    description: "Compare adjacent elements. If left > right, swap them.",
    narration: "We compare the first two numbers: 5 and 2.",
    tip: "We compare the first two numbers: 5 and 2.",
    arrayState: [5, 2, 8, 1, 9],
    highlight: "5 > 2? YES → Swap",
    color: "text-red-500",
  },
  {
    title: "First Pass - Compare 5 & 8",
    description: "Continue comparing adjacent pairs.",
    narration: "Now compare 5 and 8.",
    tip: "Now compare 5 and 8.",
    arrayState: [2, 5, 8, 1, 9],
    highlight: "5 > 8? NO → No Swap",
    color: "text-green-500",
  },
  {
    title: "First Pass Complete",
    description: "After first pass, largest element reaches the end.",
    narration: "After the first pass, the largest number (9) is in its correct position.",
    tip: "After the first pass, the largest number (9) is in its correct position.",
    arrayState: [2, 5, 1, 8, 9],
    highlight: "9 ✓",
    color: "text-green-600",
  },
  {
    title: "Repeat for Remaining",
    description: "Repeat the process for the remaining unsorted portion.",
    narration: "We repeat this process for the remaining unsorted elements.",
    tip: "We repeat this process for the remaining unsorted elements.",
    arrayState: [2, 5, 1, 8, 9],
    highlight: "Pass 2, 3, 4…",
    color: "text-red-400",
  },
  {
    title: "Sorted Array",
    description: "All elements are now sorted in ascending order.",
    narration: "The array is now completely sorted in ascending order.",
    tip: "The array is now completely sorted in ascending order.",
    arrayState: [1, 2, 5, 8, 9],
    highlight: "[1, 2, 5, 8, 9] ✓ Complete!",
    color: "text-green-500 font-semibold",
  },
];

export default function InteractiveBubbleSort() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeOn, setVolumeOn] = useState(true);

  // Auto-play logic
  const playSteps = async () => {
    setIsPlaying(true);
    for (let i = step; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }
    setIsPlaying(false);
  };

  const restart = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const current = steps[step];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto mt-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
        <Play className="text-red-500" /> Interactive Animation
      </h2>
      <p className="text-gray-500 mb-4">
        See this concept come alive with step-by-step animations
      </p>

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        {["Photosynthesis Process", "How the Heart Pumps Blood", "Bubble Sort Algorithm"].map(
          (t, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                t === "Bubble Sort Algorithm"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {t}
            </button>
          )
        )}
      </div>

      <div className="bg-gray-900 rounded-xl flex p-6 text-white relative min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center items-center text-2xl"
          >
            <div className="bg-white text-black rounded-xl px-6 py-4 shadow-md">
              {current.highlight ? (
                <p className={current.color}>{current.highlight}</p>
              ) : (
                <p>[{current.arrayState.join(", ")}]</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex-1 pl-8">
          <h3 className="text-red-400 font-semibold mb-2">
            Step {step + 1}: {current.title}
          </h3>
          <p className="text-gray-300 mb-4">{current.description}</p>
          <div className="bg-gray-800 p-3 rounded-lg text-sm text-blue-300">
            <strong>Narration:</strong> {current.narration}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6">
        <p className="text-sm text-gray-700 mb-2">
          Bubble Sort Algorithm — Step {step + 1} of {steps.length}
        </p>
        <div className="flex items-center gap-2 mb-4">
          {steps.map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full ${
                step === i ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setStep(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={isPlaying ? () => setIsPlaying(false) : playSteps}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={restart}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <RotateCcw size={18} /> Restart
          </button>

          <button
            onClick={() => setVolumeOn(!volumeOn)}
            className="ml-auto bg-gray-200 text-gray-800 p-2 rounded-lg"
          >
            <Volume2 className={volumeOn ? "text-green-500" : "text-gray-400"} />

          </button>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm border border-blue-200">
        💡 Tip: {current.tip}
      </div>
    </div>
  );
}