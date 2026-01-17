import { Stage, Layer, Circle, Line } from "react-konva";
import { useMemo, useState, useEffect, FC } from "react";
import { HexColorPicker } from "react-colorful";

interface StringArtCanvasProps {
  totalPoints?: number;
  radius?: number;
  connections?: [number, number][];
}

const StringArtCanvas: FC<StringArtCanvasProps> = ({
  totalPoints = 500,
  radius = 400,
  connections = [],
}) => {
  const size: number = 800;
  const center: number = size / 2;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const points: { x: number; y: number }[] = useMemo(() => {
    return Array.from({ length: totalPoints }, (_, i) => {
      const angle: number = (i / totalPoints) * Math.PI * 2;
      return {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
      };
    });
  }, [totalPoints, radius]);

  const [lines, setLines] = useState<{ from: number; to: number }[]>([]);
  const [color, setColor] = useState<string>("#000000");
  const [bgcolor, setbgColor] = useState<string>("#ffffff");
  
  const [thikness, setThikness] = useState<number>(0.5);
  
  const currentLine = lines[currentIndex];
  
  const fromIndex: number | undefined = currentLine?.from;
  const toIndex: number | undefined = currentLine?.to;

  useEffect(() => {
    setLines(
      connections.map(([a, b]) => ({
        from: a,
        to: b,
      }))
    );
    setCurrentIndex(0);
  }, [connections]);

  function autoComplete(): void {
    let i: number = currentIndex;

    const interval = setInterval(() => {
      if (i >= lines.length) {
        clearInterval(interval); 
        return;
      }
      setCurrentIndex(i);
      i++;
    }, 20); 
   }

   function resetToStart(): void {
     setCurrentIndex(0); 
   }

   function showNext(): void {
     if (currentIndex >= lines.length) return;
     setCurrentIndex((i) => i + 1);
   }

   function showPrevious(): void {
     if (currentIndex <= 0) return;
     setCurrentIndex((i) => i - 1);
   }

   return (
     <>
       <div className="w-full">
         <Stage width={size} height={size} style={{ backgroundColor: bgcolor }} className="flex flex-col items-center p-4"> 
           <Layer className="p-4">
             {points.map((p, i) => (
               <Circle key={i} x={p.x} y={p.y} radius={2} fill="#888" />
             ))}
             {lines.map((l, i) => (
               <Line
                 key={i}
                 points={[
                   points[l.from].x,
                   points[l.from].y,
                   points[l.to].x,
                   points[l.to].y,
                 ]}
                 stroke={color}
                 strokeWidth={i < currentIndex ? thikness : 0}
               />
             ))}
           </Layer>
         </Stage>

         <div style={{ marginTop: 12, display: "flex", gap:10 }}>
           <button onClick={showPrevious} className="btn btn-primary">◀ Previous</button>
           <button onClick={showNext} className="btn btn-primary">Next ▶</button>
           <button onClick={autoComplete} className="btn btn-primary">|| auto</button>
           <button onClick={resetToStart} className="btn btn-primary">[[Reset]]</button>
           <br />
           <div className="card w-72 bg-base-200 shadow-xl border border-base-300">
             <div className="card-body gap-4">
               <h2 className="card-title text-sm">Pick String Color</h2>
               <HexColorPicker color={color} onChange={setColor} />
               <div className="flex items-center justify-between">
                 <span className="text-sm font-mono">{color}</span>
                 <div
                   className="w-6 h-6 rounded border"
                   style={{ backgroundColor: color }}
                 />
               </div>
             </div>
             <input
               type="range"
               min="0"
               max="10"
               step="0.01"
               value={thikness}
               onChange={(e) => setThikness(Number(e.target.value))}
               className="range range-primary"
             />
           </div>
           <div className="flex card w-72 bg-base-200 shadow-xl border border-base-300">{currentIndex || 0}<button className="btn btn-primary m-2">from pt:- {fromIndex || 0}</button><button className="btn btn-accent m-2">to pt:- {toIndex || 0}</button></div>
         </div>
         <div className="card-body gap-4">
           <h2 className="card-title text-sm">Pick Background Color</h2>
           <HexColorPicker color={bgcolor} onChange={setbgColor} />
           <div className="flex items-center justify-between">
             <span className="text-sm font-mono">{bgcolor}</span>
             <div
               className="w-6 h-6 rounded border"
               style={{ backgroundColor: bgcolor }}
             />
           </div>
         </div>
       </div>
     </>
   );
};

export default StringArtCanvas;