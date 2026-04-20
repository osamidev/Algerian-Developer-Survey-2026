export default function SingleChoice({ question, register, errors }) {
  const fieldName = `q_${question.id}`;
  const { ref, ...rest } = register(fieldName, {
    required: question.required ? "Please select an option" : false,
  });

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-3xl font-bold font-primary mb-6 text-text-high">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-4 p-4 border border-border-subtle rounded-xl cursor-pointer hover:bg-background-surface transition-colors focus-within:border-brand-primary"
          >
            <input
              type="radio"
              value={String(option.id)} // ← the option ID is the value
              {...rest}
              ref={ref}
              className="w-5 h-5 accent-brand-primary"
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
