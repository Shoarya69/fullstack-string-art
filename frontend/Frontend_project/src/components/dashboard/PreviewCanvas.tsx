import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Stage, Layer, Circle, Line, Text } from "react-konva";
import { RgbaColorPicker } from "react-colorful";
import { StringCountKnob } from "./StringCountKnob";
interface PreviewCanvasProps {
  exist: boolean;
  // settings: {
  //   brightness: number;
  //   contrast: number;
  //   invert: boolean;
  //   stringDensity: number;
  //   zoom: number;
  // };
  isProcessing: boolean;
  totalPoints?: number;
  radius?: number;
  connections?: [number, number][];
}

export const PreviewCanvas = ({
  exist = false,
  isProcessing,
  totalPoints = 300,
  radius = 350,
  connections = [],
}: PreviewCanvasProps) => {
  const size = 800;
  const max_c = connections.length;
  const center = size / 2;
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [bgcolor, setBgColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [thickness, setThickness] = useState(0.3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const retRef = useRef(false);
  const [speed, setSpeed] = useState(1.0); // Speed multiplier for Auto mode (1.0x to 9.0x)
  const [isPreviewMode, setIsPreviewMode] = useState(false); // Toggle for Final Preview mode
  const [lines, setLines] = useState<{ from: number; to: number }[]>([]);
  const [stringLimit, setStringLimit] = useState<number>(0); // String count limit for knob control (0-4000)
  const currentLine = lines[currentIndex];
  const fromIndex: number | undefined = currentLine?.from;
  const toIndex: number | undefined = currentLine?.to;
  const points = useMemo(() => {
    return Array.from({ length: totalPoints }, (_, i) => {
      const angle = (i / totalPoints) * Math.PI * 2;
      return {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
      };
    });
  }, [totalPoints, radius]);

  useEffect(() => {
    if (!connections.length) return;

    const mappedLines = connections.map(([a, b]) => ({
      from: a,
      to: b,
    }));

    setLines(mappedLines);
    setCurrentIndex(0);
    setStringLimit(Math.min(mappedLines.length, max_c)); // Initialize to 4000 or max available
    setIsPreviewMode(false); // Reset to step-by-step mode on new data
  }, [connections]);

  function autoComplete() {
    retRef.current = false; // reset pause
    let i = currentIndex;
    // Calculate delay: speed = strings per second, so delay = 1000ms / speed
    const delay = Math.floor(1000 / speed);
    const interval = setInterval(() => {
      if (i >= lines.length) {
        clearInterval(interval);
        return;
      }
      if (retRef.current) { // check pause
        clearInterval(interval);
        return;
      }
      setCurrentIndex(i);
      i++;
    }, delay);
  }

  function resetToStart() {
    setCurrentIndex(0);
  }

  function showNext() {
    setCurrentIndex((i) => Math.min(i + 1, lines.length));
  }

  function showPrevious() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }
  const pause_op = () => {
    retRef.current = true;
  };

  // Toggle between Preview mode and Step-by-Step mode
  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
    if (!isPreviewMode) {
      // Entering preview mode - show all strings
      setCurrentIndex(lines.length);
    } else {
      // Exiting preview mode - reset to step-by-step
      setCurrentIndex(0);
    }
  };
  if (!exist) {
    return <div className="text-center text-gray-400">Nothing to preview</div>;
  }
  if (isProcessing) {
    return <div className="text-center text-gray-400">is processing wait</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden relative p-4 center-items justify-items-center"
      
    >
      <Stage
        width={size}
        height={size}
        style={{ backgroundColor: `rgba(${bgcolor.r},${bgcolor.g},${bgcolor.b},${bgcolor.a})`,
                   borderRadius: "50%",      // 🔵 perfect circle
                    overflow: "hidden",
                  }}
      >
        <Layer  >
          {points.map((p, i) => (
            <Circle key={i} x={p.x} y={p.y} radius={2} fill="#888"  />
          ))}

          {/* Render connections based on mode:
             - Preview mode: render first N connections where N = stringLimit (0-4000)
             - Step-by-step mode: render progressively based on currentIndex
             This uses array slicing (no backend calls, no regeneration) */}
          {lines.slice(0, isPreviewMode ? Math.min(stringLimit, lines.length) : currentIndex).map((l, i) => {
            const from = points[l.from];
            const to = points[l.to];
            if (!from || !to) return null;

            const isVisible = i < currentIndex;
            const isCurrentActive = i === currentIndex - 1 && !isPreviewMode; // Current active string (not in preview mode)

            // Calculate offset direction (outward from center) for nail numbers
            const offsetDistance = 15;

            // FROM nail position - offset outward from center
            const fromAngle = Math.atan2(from.y - center, from.x - center);
            const fromTextX = from.x + Math.cos(fromAngle) * offsetDistance;
            const fromTextY = from.y + Math.sin(fromAngle) * offsetDistance;

            // TO nail position - offset outward from center
            const toAngle = Math.atan2(to.y - center, to.x - center);
            const toTextX = to.x + Math.cos(toAngle) * offsetDistance;
            const toTextY = to.y + Math.sin(toAngle) * offsetDistance;

            return (
              <>
                <Line
                  key={`line-${i}`}
                  points={[from.x, from.y, to.x, to.y]}
                  stroke={`rgba(${color.r},${color.g},${color.b},${color.a})`}
                  strokeWidth={isVisible ? thickness : 0}
                />
                {/* Show numbers ONLY for the current active string */}
                {isCurrentActive && (
                  <>
                    {/* FROM nail number */}
                    <Text
                      key={`text-from-${i}`}
                      x={fromTextX - 10}
                      y={fromTextY - 8}
                      text={`${l.from}`}
                      fontSize={14}
                      fontFamily="Arial"
                      fontStyle="bold"
                      fill="#ff0000"
                      padding={2}
                      align="center"
                      verticalAlign="middle"
                      shadowColor="rgba(0,0,0,0.9)"
                      shadowBlur={5}
                      shadowOffset={{ x: 0, y: 0 }}
                    />
                    {/* TO nail number */}
                    <Text
                      key={`text-to-${i}`}
                      x={toTextX - 10}
                      y={toTextY - 8}
                      text={`${l.to}`}
                      fontSize={14}
                      fontFamily="Arial"
                      fontStyle="bold"
                      fill="#ff0000"
                      padding={2}
                      align="center"
                      verticalAlign="middle"
                      shadowColor="rgba(0,0,0,0.9)"
                      shadowBlur={5}
                      shadowOffset={{ x: 0, y: 0 }}
                    />
                  </>
                )}
              </>
            );
          })}
        </Layer>
      </Stage>

      {/* Mode Toggle Button */}
      <div className="flex justify-center mt-6 mb-4 relative z-10">
        <button
          onClick={togglePreviewMode}
          className="
            px-6 py-3
            rounded-xl
            bg-gradient-to-r from-cyan-500 to-blue-500
            text-white font-bold text-base
            shadow-lg
            transition-all duration-300 ease-out
            hover:from-cyan-600 hover:to-blue-600
            hover:shadow-xl hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
          "
        >
          {isPreviewMode ? '📋 Switch to Step-by-Step' : '🎨 Show Final Preview'}
        </button>
      </div>

      {/* String Count Control - Only show in preview mode */}
      {isPreviewMode && exist && !isProcessing && lines.length > 0 && (
        <div className="flex justify-center mt-6 mb-4">
          <StringCountKnob
            value={stringLimit}
            min={0}
            max={max_c}
            onChange={setStringLimit}
          />
        </div>
      )}

      {/* Step-by-Step Controls - Only show when NOT in preview mode */}
      {!isPreviewMode && (

        <div className="flex gap-2 mt-3 justify-center">
          <button onClick={showPrevious} className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white font-semibold
            shadow-md
            transition-all duration-200 ease-out
            hover:from-purple-600 hover:to-indigo-600
            hover:shadow-lg hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
          ">
            ◀ Previous
          </button>
          <button onClick={showNext} className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white font-semibold
            shadow-md
            transition-all duration-200 ease-out
            hover:from-purple-600 hover:to-indigo-600
            hover:shadow-lg hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
          ">
            Next ▶
          </button>
          <button onClick={autoComplete} className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white font-semibold
            shadow-md
            transition-all duration-200 ease-out
            hover:from-purple-600 hover:to-indigo-600
            hover:shadow-lg hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
          ">
            Auto
          </button>
          <button onClick={pause_op} className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white font-semibold
            shadow-md
            transition-all duration-200 ease-out
            hover:from-purple-600 hover:to-indigo-600
            hover:shadow-lg hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
          ">
            PAUSE
          </button>
          <button onClick={resetToStart} className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white font-semibold
            shadow-md
            transition-all duration-200 ease-out
            hover:from-purple-600 hover:to-indigo-600
            hover:shadow-lg hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
          ">
            Reset
          </button>
        </div>
      )}

      {/* Speed Control Section - Slider - Only show when NOT in preview mode */}
      {!isPreviewMode && (
        <div className="flex flex-col items-center gap-2 mt-4 px-6">
          <div className="flex items-center gap-3 w-full max-w-md">
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Speed:</span>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="
              flex-1 h-2 bg-gradient-to-r from-purple-200 to-indigo-200
              rounded-lg appearance-none cursor-pointer
              accent-purple-600
              focus:outline-none focus:ring-2 focus:ring-purple-400
            "
              style={{
                background: `linear-gradient(to right, #a855f7 0%, #6366f1 ${((speed - 1.0) / 8.0) * 100}%, #e9d5ff ${((speed - 1.0) / 8.0) * 100}%, #e9d5ff 100%)`
              }}
            />
            <div className="
            px-4 py-1.5
            rounded-lg
            bg-white
            border-2 border-purple-300
            text-purple-700 font-bold text-sm
            shadow-sm
            min-w-[90px] text-center
          ">
              {speed.toFixed(1)} /sec
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {speed === 1.0 ? '1 string per second' : `${speed.toFixed(1)} strings per second`}
          </div>
        </div>
      )}
      <br />
      <div className="flex flex-col items-center gap-6 p-4">

        {/* String Color Card */}
        <div className="bg-white w-72 shadow-lg rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-gray-700">Pick String Color</h2>

          <RgbaColorPicker
            color={color}
            onChange={setColor}
            style={{ width: "150px", height: "150px", borderRadius: "12px" }}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-gray-800">
              rgba({color.r}, {color.g}, {color.b}, {color.a.toFixed(2)})
            </span>
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="10"
            step="0.01"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg accent-purple-500"
          />
        </div>

        {/* Index / From-To Card */}
        <div className="bg-white w-72 shadow-lg rounded-xl border border-gray-200 p-3 flex items-center justify-between text-sm text-gray-700">
          <span>Current: {currentIndex || 0}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
              From: {fromIndex || 0}
            </button>
            <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
              To: {toIndex || 0}
            </button>
          </div>
        </div>

        {/* Background Color Card */}
        <div className="bg-white w-72 shadow-lg rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-gray-700">Pick Background Color</h2>

          <RgbaColorPicker
            color={bgcolor}
            onChange={setBgColor}
            style={{ width: "150px", height: "150px", borderRadius: "12px" }}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-gray-800">
              rgba({bgcolor.r}, {bgcolor.g}, {bgcolor.b}, {bgcolor.a.toFixed(2)})
            </span>
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{
                backgroundColor: `rgba(${bgcolor.r}, ${bgcolor.g}, ${bgcolor.b}, ${bgcolor.a})`,
              }}
            />
          </div>
        </div>
      </div>
      
    </motion.div>
  );
};
