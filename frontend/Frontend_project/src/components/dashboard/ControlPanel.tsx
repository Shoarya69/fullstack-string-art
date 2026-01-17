import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Sun, Contrast, RefreshCw, Grid3X3, ZoomIn } from 'lucide-react';

interface ControlPanelProps {
  settings: {
    brightness: number;
    contrast: number;
    invert: boolean;
    stringDensity: number;
    zoom: number;
  };
  onSettingsChange: (settings: ControlPanelProps['settings']) => void;
}

export const ControlPanel = ({ settings, onSettingsChange }: ControlPanelProps) => {
  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const zoom = settings.zoom;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 space-y-8"
    >
      <div>
        <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
          Adjustments
        </h3>

        <div className="space-y-6">
          {/* Zoom */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <ZoomIn className="w-4 h-4 text-primary" />
                Zoom
              </Label>
              <span className="text-sm font-medium text-primary tabular-nums">
                {zoom}%
              </span>
            </div>
            <div className="group">
              <Slider
                value={[zoom]}
                onValueChange={([value]) => updateSetting('zoom', value)}
                min={25}
                max={200}
                step={1}
                className="w-full slider-glow"
              />
            </div>
          </div>

          {/* Brightness */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <Sun className="w-4 h-4 text-primary" />
                Brightness
              </Label>
              <span className="text-sm text-muted-foreground tabular-nums">
                {settings.brightness}%
              </span>
            </div>
            <Slider
              value={[settings.brightness]}
              onValueChange={([value]) => updateSetting('brightness', value)}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <Contrast className="w-4 h-4 text-primary" />
                Contrast
              </Label>
              <span className="text-sm text-muted-foreground tabular-nums">
                {settings.contrast}%
              </span>
            </div>
            <Slider
              value={[settings.contrast]}
              onValueChange={([value]) => updateSetting('contrast', value)}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>

          {/* String Density */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <Grid3X3 className="w-4 h-4 text-primary" />
                String Density
              </Label>
              <span className="text-sm text-muted-foreground tabular-nums">
                {settings.stringDensity}
              </span>
            </div>
            <Slider
              value={[settings.stringDensity]}
              onValueChange={([value]) => updateSetting('stringDensity', value)}
              min={50}
              max={500}
              step={10}
              className="w-full"
            />
          </div>

          {/* Invert Toggle - Animated */}
          <div className="flex items-center justify-between pt-2">
            <Label className="flex items-center gap-2 text-foreground">
              <RefreshCw className="w-4 h-4 text-primary" />
              Grayscale
            </Label>
            <button
              onClick={() => updateSetting('invert', !settings.invert)}
              className={`
                relative w-12 h-6 rounded-full transition-all duration-500 ease-out
                ${settings.invert 
                  ? 'bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.4)]' 
                  : 'bg-secondary'
                }
              `}
            >
              <motion.div
                animate={{
                  x: settings.invert ? 24 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 rounded-full
                  transition-colors duration-300
                  ${settings.invert ? 'bg-primary-foreground' : 'bg-muted-foreground'}
                `}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
