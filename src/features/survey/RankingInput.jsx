import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

function RankingInput({ question }) {
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  // Initialize state with whatever RHF currently holds, or fallback to the default initial options.
  const [items, setItems] = useState(() => {
    return getValues(question.id.toString()) || question.options || [];
  });

  // Keep RHF state in sync and set up validation rules
  useEffect(() => {
    const fieldName = question.id.toString();

    register(fieldName);

    if (!getValues(fieldName)) {
      setValue(fieldName, items, { shouldValidate: true });
    }
  }, [
    register,
    question.id,
    setValue,
    items,
    question.options.length,
    getValues,
  ]);

  const handleReorder = (newOrder) => {
    setItems(newOrder); // update local Framer Motion visual order
    setValue(question.id.toString(), newOrder, {
      shouldValidate: true,
      shouldDirty: true,
    }); // update RHF state
  };

  return (
    <div className="flex flex-col gap-3">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="flex w-full flex-col gap-3"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id || item}
            value={item}
            className="border-border-subtle bg-background-card hover:border-brand-primary active:border-brand-primary flex cursor-grab items-center gap-4 rounded-xl border px-4 py-4 transition-colors active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5 text-white/50" />
            <span className="text-base font-medium text-white/90">
              {item.option_text || item}
            </span>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Displaying validation errors */}
      {errors[question.id] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[question.id]?.message}
        </p>
      )}
    </div>
  );
}

export default RankingInput;
