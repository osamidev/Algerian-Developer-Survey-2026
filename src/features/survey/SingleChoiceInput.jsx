import { Check } from "lucide-react";
import { useWatch } from "react-hook-form"; // to check which option is selected
import { useSurvey } from "../../Contexts/useSurvey";

export default function SingleChoice({ question, register, errors }) {
  const fieldName = question.id.toString();
  const { ref, ...rest } = register(fieldName, {
    required: false,
  });

  const { goNext } = useSurvey();

  const handleSelect = (event) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }
    rest.onChange?.(event);
    queueMicrotask(goNext);
  };

  // watch the value of the radio input
  const selectedValue = useWatch({
    name: fieldName,
  });

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === String(option.id);

          return (
            <label
              key={option.id}
              className={`group flex w-full cursor-pointer items-center justify-between rounded-[12px] border border-[#5D29B7] px-[24px] py-[16px] transition-colors ${
                isSelected ? "bg-[#201042]" : "hover:bg-[#201042]/50"
              }`}
            >
              <input
                type="radio"
                value={String(option.id)}
                {...rest}
                ref={ref}
                className="sr-only" // hidden input
                onChange={handleSelect}
              />
              <div className="flex items-center justify-center text-base font-medium text-white/90">
                <span>{option.text}</span>
              </div>

              {isSelected && (
                <div className="shrink-0 pl-4">
                  <Check
                    className="h-[24px] w-[24px] text-[#A874F5]"
                    strokeWidth={2.5}
                  />
                </div>
              )}
            </label>
          );
        })}
      </div>
      {errors[fieldName] && (
        <p className="font-secondary mt-4 text-sm text-red-400">
          {errors[fieldName].message}
        </p>
      )}
    </div>
  );
}
