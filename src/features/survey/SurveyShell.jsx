import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useSurvey } from "../../Contexts/useSurvey";
import QuestionRenderer from "./QuestionRenderer";
import NavButtons from "./NavButtons";
import Header from "./Header";
import toast from "react-hot-toast";
import { submitResponses } from "../../services/apiSurvey";

const questionSlideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    y: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

const MotionDiv = motion.div;

function SurveyShell() {
  const {
    currentQuestion,
    progress,
    setIsSubmitting,
    navigationDirection,
    isLoading,
    questions,
  } = useSurvey();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext();

  async function onSubmit(data) {
    setIsSubmitting(true);
    // Small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const id = 18; // replace with real user id if available

    const submission = { user_id: id, answers: [] };

    // Build a quick lookup for question metadata
    const qLookup = new Map((questions || []).map((q) => [String(q.id), q]));

    for (const key in data) {
      const qIdNum = parseInt(key, 10);
      const rawVal = data[key];
      const meta = qLookup.get(String(key));
      const qType = meta?.type || null; // e.g. 'multiple_choice', 'single_choice', 'numeric', 'ranking', 'range'

      if (Array.isArray(rawVal)) {
        if (rawVal.length > 0 && typeof rawVal[0] === "object") {
          // ranking: push one entry per item preserving order
          for (const item of rawVal) {
            const ans = item?.id ? parseInt(item.id, 10) : parseInt(item, 10);
            submission.answers.push({
              question_id: qIdNum,
              type: "ranking",
              answer: ans,
            });
          }
        } else {
          // multiple-choice: push one entry per selected option
          for (const item of rawVal) {
            const ans = typeof item === "number" ? item : parseInt(item, 10);
            submission.answers.push({
              question_id: qIdNum,
              type: "multiple_choice",
              answer: ans,
            });
          }
        }
      } else {
        // single value
        const isNumber =
          typeof rawVal === "number" ||
          (!isNaN(parseFloat(rawVal)) && isFinite(rawVal));
        const answerVal = isNumber ? Number(rawVal) : rawVal;

        let outType = "single_choice";
        if (qType === "numeric") outType = "numeric";
        else if (qType === "range") outType = "rating";
        else if (qType === "ranking") outType = "ranking";
        else if (qType === "multiple_choice") outType = "multiple_choice";

        submission.answers.push({
          question_id: qIdNum,
          type: outType,
          answer: answerVal,
        });
      }
    }
    try {
      await submitResponses(submission);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit responses. Please try again.");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="bg-background-main scrollbar-hide relative flex h-dvh max-w-dvw flex-col items-center overflow-hidden text-white">
      {/* Cozy Top Gradient */}
      <div className="from-brand-primary/20 pointer-events-none absolute top-0 right-0 left-0 h-[45vh] bg-linear-to-b to-transparent opacity-80"></div>

      <div className="z-10 flex w-full flex-col items-center">
        <Header progress={progress} />
      </div>
      {isLoading ? (
        <div className="bg-background-main flex h-dvh w-full items-center justify-center px-4 text-white">
          <div className="w-full max-w-125 space-y-6 px-4">
            <div className="h-7 w-32 animate-pulse rounded-full bg-white/10" />
            <div className="h-14 w-full animate-pulse rounded-2xl bg-white/10" />
            <div className="space-y-4">
              <div className="h-16 w-full animate-pulse rounded-xl bg-white/10" />
              <div className="h-16 w-full animate-pulse rounded-xl bg-white/10" />
              <div className="h-16 w-full animate-pulse rounded-xl bg-white/10" />
              <div className="h-16 w-full animate-pulse rounded-xl bg-white/10" />
            </div>
            <div className="h-20 w-full animate-pulse rounded-2xl bg-white/10" />
          </div>
        </div>
      ) : (
        <div className="z-10 flex min-h-0 w-full max-w-125 flex-1 flex-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-between"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-32">
              <AnimatePresence mode="wait" custom={navigationDirection}>
                {currentQuestion && (
                  <MotionDiv
                    key={currentQuestion.id}
                    custom={navigationDirection}
                    variants={questionSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex flex-col"
                  >
                    <div className="mb-8 flex flex-col">
                      <h2 className="mb-4 font-mono text-2xl leading-[1.3] font-bold tracking-wide text-white antialiased">
                        {currentQuestion.text}
                      </h2>
                      <span className="font-mono text-sm tracking-wider text-white/50">
                        {currentQuestion.description || "Select one that apply"}
                      </span>
                    </div>
                    <QuestionRenderer
                      question={currentQuestion}
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
            <div className="bg-background-main sticky bottom-0 z-20 w-full shrink-0 rounded-t-2xl px-4 py-6">
              <NavButtons />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SurveyShell;
