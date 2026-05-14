import { useFormContext } from "react-hook-form";

function NumericInput({ question }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="focus-within:border-brand-primary relative border-b-2 border-white pb-2 transition-colors duration-300">
        <input
          type="number"
          id={question.id.toString()}
          placeholder="Example: 25"
          className="w-full appearance-none bg-transparent font-mono text-base text-white placeholder-white/40 ring-0 outline-none"
          {...register(question.id.toString(), {
            required: false,
            valueAsNumber: true,
            min: { value: 0, message: "Must be a positive number" },
            max: { value: 100, message: "Must be less than 100" },
          })}
        />
      </div>

      {errors[question.id.toString()] && (
        <p className="mt-2 font-mono text-sm text-red-500">
          {errors[question.id.toString()].message}
        </p>
      )}
    </div>
  );
}

export default NumericInput;
