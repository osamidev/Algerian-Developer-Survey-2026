import { useFormContext } from "react-hook-form";
import { useSurvey } from "../../Contexts/QuestionsContext";

function NavButtons() {
  const { progress, goBack, goNext, isLast } = useSurvey();
  const {} = useFormContext();

  return (
    <div className="mt-8 flex justify-between items-center border-t border-border-subtle pt-6">
      <button
        type="button"
        onClick={goBack}
        disabled={progress <= 0}
        className="px-4 py-2 text-brand-light hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-secondary transition-colors"
      >
        Back
      </button>

      {!isLast ? (
        <button
          type="button"
          onClick={goNext}
          className="bg-brand-primary text-text-high hover:bg-brand-hover px-6 py-2 rounded-md font-primary font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          disabled={!isValid}
          className="bg-brand-accent text-background-main hover:opacity-90 px-6 py-2 rounded-md font-primary font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Survey
        </button>
      )}
    </div>
  );
}

export default NavButtons;
