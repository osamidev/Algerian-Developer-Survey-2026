export default function MultipleChoice({ question, register, errors }) {
  const fieldName = `q_${question.id}`;
  const validation = {
    validate: (val) => {
      if (!question.required) return true;
      return (val && val.length > 0) || "Please select at least one option";
    },
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold font-primary mb-2 text-text-high">
        {question.text}
      </h2>
      <p className="text-text-medium text-sm mb-6 font-secondary">
        Select all that apply
      </p>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-4 p-4 border border-border-subtle rounded-xl cursor-pointer hover:bg-background-surface transition-colors focus-within:border-brand-primary"
          >
            <input
              type="checkbox"
              value={String(option.id)}
              {...register(fieldName, validation)}
              className="w-5 h-5 accent-brand-primary rounded"
            />
            <span className="text-text-high font-secondary font-medium">
              {option.text}
            </span>
          </label>
        ))}
      </div>
      {errors[fieldName] && (
        <p className="text-red-400 mt-4 text-sm font-secondary">
          {errors[fieldName].message}
        </p>
      )}
    </div>
  );
}
