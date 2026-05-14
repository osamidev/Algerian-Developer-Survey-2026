function RatingInput({ question, control }) {
  return (
    <div className="flex items-center gap-4">
      {question.options.map((option) => {
        const { id, text } = option;
        return (
          <label
            key={id}
            className="group flex cursor-pointer items-center gap-2 rounded-[12px] border border-[#5D29B7] px-[16px] py-[8px] transition-colors"
          >
            <input
              type="radio"
              value={id}
              {...control.register(String(question.id), {
                required: "This question is required",
              })}
              className="sr-only"
            />
            <span className="text-text-high font-secondary font-medium">
              {text}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export default RatingInput;
