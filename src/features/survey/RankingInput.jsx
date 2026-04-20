
function RankingInput({ question, register, errors }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">{question.text}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={question.options.length}
              {...register(question.id, {
                required: "Ranking is required",
                validate: (value) => {
                  const numValue = parseInt(value, 10);
                  if (isNaN(numValue)) {
                    return "Please enter a valid number";
                  }
                  if (numValue < 1 || numValue > question.options.length) {
                    return `Please enter a number between 1 and ${question.options.length}`;
                  }
                  return true;
                },
              })}
              className={`w-16 px-3 py-2 border ${
                errors[question.id] ? "border-red-500" : "border-border-subtle"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary`}
            />
            <span>{option}</span>   
            </div>
        ))}
        {errors[question.id] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[question.id].message}
          </p>
        )}
      </div>
    </div>
  );
}

export default RankingInput;