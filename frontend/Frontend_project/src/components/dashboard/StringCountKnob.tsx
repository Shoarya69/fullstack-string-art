import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StringCountKnobProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export const StringCountKnob = ({ value, min, max, onChange }: StringCountKnobProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);
    const knobRef = useRef<HTMLDivElement>(null);
    const lastAngleRef = useRef(0);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Convert value to rotation angle (0-360)
    const valueToAngle = useCallback((val: number) => {
        const percentage = (val - min) / (max - min);
        return percentage * 360;
    }, [min, max]);

    // Convert rotation angle to value
    const angleToValue = useCallback((angle: number) => {
        // Normalize angle to 0-360
        const normalizedAngle = ((angle % 360) + 360) % 360;
        const percentage = normalizedAngle / 360;
        const rawValue = min + percentage * (max - min);
        // Round to nearest 1 for precise control
        return Math.round(rawValue);
    }, [min, max]);

    // Initialize rotation from value
    useEffect(() => {
        setRotation(valueToAngle(value));
    }, [value, valueToAngle]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);

        if (!knobRef.current) return;
        const rect = knobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        lastAngleRef.current = angle;
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        setIsDragging(true);

        if (!knobRef.current || e.touches.length === 0) return;
        const touch = e.touches[0];
        const rect = knobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
        lastAngleRef.current = angle;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !knobRef.current) return;

        const rect = knobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

        // Calculate delta angle
        let deltaAngle = angle - lastAngleRef.current;

        // Handle wrap-around
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;

        const newRotation = rotation + deltaAngle;
        setRotation(newRotation);
        lastAngleRef.current = angle;

        // Debounce the onChange callback
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const newValue = angleToValue(newRotation);
            const clampedValue = Math.max(min, Math.min(max, newValue));
            onChange(clampedValue);
        }, 150);
    }, [isDragging, rotation, angleToValue, onChange, min, max]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging || !knobRef.current || e.touches.length === 0) return;

        const touch = e.touches[0];
        const rect = knobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);

        // Calculate delta angle
        let deltaAngle = angle - lastAngleRef.current;

        // Handle wrap-around
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;

        const newRotation = rotation + deltaAngle;
        setRotation(newRotation);
        lastAngleRef.current = angle;

        // Debounce the onChange callback
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const newValue = angleToValue(newRotation);
            const clampedValue = Math.max(min, Math.min(max, newValue));
            onChange(clampedValue);
        }, 150);
    }, [isDragging, rotation, angleToValue, onChange, min, max]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -50 : 50;
        const newValue = Math.max(min, Math.min(max, value + delta));
        onChange(newValue);
    }, [value, min, max, onChange]);

    // Add/remove global mouse and touch event listeners
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

    // Cleanup debounce timer
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            <motion.div
                ref={knobRef}
                className="string-count-knob"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onWheel={handleWheel}
                style={{
                    transform: `rotate(${rotation}deg)`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="string-count-knob-inner">
                    <div className="string-count-value">{value}</div>
                    <div className="string-count-label">Strings</div>
                </div>
            </motion.div>

            <div className="text-sm text-muted-foreground">
                Drag to adjust • Scroll to fine-tune
            </div>
        </div>
    );
};
