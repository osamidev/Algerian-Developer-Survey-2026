import { useState } from "react";
import { useWatch, useFormContext } from "react-hook-form";

function RangeInput({ question }) {
  const { register, control } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);

  const value = useWatch({
    control,
    name: String(question.id),
    defaultValue: 5,
  });

  // Calculate percentage to position the floating value over the thumb
  const percent = ((value - 1) / 9) * 100;

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 pt-8">
      <div className="relative w-full">
        {/* Floating Value Indicator */}
        <div
          className={`bg-brand-primary absolute -top-12 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white shadow-lg transition-opacity duration-200 ${
            isDragging ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: `calc(${percent}% + (${16 - percent * 0.32}px))`,
            transform: "translateX(-50%)",
          }}
        >
          {value}
          <div className="bg-brand-primary absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45"></div>
        </div>

        <input
          type="range"
          min="1"
          max="10"
          step="1"
          {...register(String(question.id), {
            required: "This question is required",
          })}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onTouchMoveCapture={() => setIsDragging(true)}
          onTouchCancel={() => setIsDragging(false)}
          className="bg-brand-primary/30 focus:ring-brand-primary [&::-moz-range-thumb]:border-brand-primary [&::-moz-range-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:border-brand-primary [&::-webkit-slider-thumb]:bg-brand-primary h-3 w-full cursor-pointer appearance-none rounded-full outline-none focus:ring-2 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>

      <div className="text-text-medium flex w-full items-center justify-between px-2 pt-2"></div>
    </div>
  );
}

export default RangeInput;
