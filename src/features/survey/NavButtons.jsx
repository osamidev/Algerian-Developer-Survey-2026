import { useSurvey } from "../../Contexts/QuestionsContext";
// import { useFormContext } from "react-hook-form";

function NavButtons() {
  const { progress, goBack, goNext, isLast, isSubmitting } = useSurvey();
  // const { isValid } = useFormContext();

  return (
    <div className="flex w-full flex-row-reverse gap-8">
      {!isLast ? (
        <button
          key="btn-next"
          type="button"
          onClick={goNext}
          className="w-full rounded-full bg-[#6329c3] py-4 text-xl font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#522299] disabled:opacity-50"
        >
          Next
        </button>
      ) : (
        <button
          key="btn-submit"
          type="submit"
          className="flex w-full items-center justify-center rounded-full bg-[#6329c3] py-4 text-xl font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#522299] disabled:opacity-50"
        >
          {isSubmitting ? <div className="loader-spinner"></div> : "Submit"}
        </button>
      )}

      <button
        type="button"
        onClick={goBack}
        disabled={progress <= 0}
        className="w-full rounded-full border border-white/20 bg-transparent py-4 text-xl font-medium tracking-wide text-white uppercase transition-colors hover:bg-white/5 disabled:opacity-30"
      >
        Back
      </button>
    </div>
  );
}

export default NavButtons;
