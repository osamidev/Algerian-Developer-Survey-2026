import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { numericInputSchema } from "./validationSchemas";

function NumericInput({ question }) {
  const { register } = useFormContext();

  const handleValidate = (value) => {
    try {
      numericInputSchema.parse({ value });
      return true;
    } catch (error) {
      const message = error.issues?.[0]?.message || "Invalid input";
      toast.error(message);
      return message;
    }
  };

  return (
    <div className="md:mt6 mt-4 flex w-full flex-col">
      <div className="focus-within:border-brand-primary relative border-b-2 border-white pb-2 transition-colors duration-300 md:pb-3">
        <input
          type="number"
          id={question.id.toString()}
          className="py w-full appearance-none bg-transparent font-mono text-base text-white placeholder-white/40 ring-0 outline-none"
          {...register(question.id.toString(), {
            valueAsNumber: true,
            required: { value: true, message: "This field is required" },
            validate: handleValidate,
          })}
        />
      </div>
    </div>
  );
}

export default NumericInput;
