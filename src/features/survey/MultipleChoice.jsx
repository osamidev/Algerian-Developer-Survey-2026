import React from "react";
import { Controller } from "react-hook-form";
import { Check } from "lucide-react";

export default function MultipleChoice({ question, control }) {
  const fieldName = question.id.toString();

  return (
    <div className="flex w-full flex-col">
      <Controller
        name={fieldName}
        control={control}
        defaultValue={[]}
        rules={{
          validate: () => true, // ignored for now
        }}
        render={({ field }) => (
          <div className="flex flex-col gap-4">
            {question.options.map((option) => {
              const { id, text } = option;
              const stringId = String(id);
              const isSelected = field.value?.includes(stringId);

              const handleChange = () => {
                const current = field.value ?? [];
                const next = isSelected
                  ? current.filter((v) => v !== stringId)
                  : [...current, stringId];
                field.onChange(next);
              };

              return (
                <label
                  key={id}
                  onClick={handleChange}
                  className="group flex w-full cursor-pointer items-center gap-4 rounded-[12px] border border-[#5D29B7] px-[24px] py-[16px] transition-colors"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-around rounded-md border transition-colors ${
                      isSelected
                        ? "bg-brand-light border-brand-light"
                        : "border-brand-light bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <Check
                        stroke="var(--background-main)"
                        strokeWidth={4}
                        size={18}
                      />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-text-high font-secondary font-medium">
                    {text}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}
