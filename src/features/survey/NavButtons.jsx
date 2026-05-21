import { useSurvey } from "../../Contexts/useSurvey";
import { useFormContext } from "react-hook-form";

function NavButtons() {
  const { progress, goBack, goNext, isLast, isSubmitting, currentQuestion } =
    useSurvey();
  const { trigger } = useFormContext();
  const { currentQuestion: question } = useSurvey();

  const isSingleChoice = question?.type === "single_choice";

  const handleNext = async () => {
    if (!currentQuestion) return;

    // Validate the current question before proceeding
    const isValid = await trigger(currentQuestion.id.toString());
    if (isValid) {
      goNext();
    }
  };

  return (
    <div className="flex w-full flex-row-reverse gap-8">
      {!isLast && !isSingleChoice && (
        <button
          key="btn-next"
          type="button"
          onClick={handleNext}
          className="w-full cursor-pointer rounded-full bg-[#6329c3] py-4 text-xl font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#522299] disabled:opacity-50"
        >
          Next
        </button>
      )}

      {isLast && (
        <button
          key="btn-submit"
          type="submit"
          disabled={isSubmitting}
          className="flex w-full cursor-pointer items-center justify-center rounded-full bg-[#6329c3] py-4 text-xl font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#522299] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <div className="loader-spinner"></div> : "Submit"}
        </button>
      )}

      <button
        type="button"
        onClick={goBack}
        disabled={progress <= 0}
        className="w-full cursor-pointer rounded-full border border-white/20 bg-transparent py-4 text-xl font-medium tracking-wide text-white uppercase transition-colors hover:bg-white/5 disabled:opacity-30"
      >
        Back
      </button>
    </div>
  );
}

export default NavButtons;
