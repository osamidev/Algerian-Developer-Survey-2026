import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useSurvey } from "../../Contexts/useSurvey";
import QuestionRenderer from "./QuestionRenderer";
import NavButtons from "./NavButtons";
import Header from "./Header";
import toast from "react-hot-toast";
import { submitResponses } from "../../services/apiSurvey";
import { useAuth } from "../../Contexts/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Home } from "lucide-react";
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
  const { user } = useAuth();
  const [hasJustSubmitted, setHasJustSubmitted] = useState(false);

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
    const submission = { user_id: user?.user_id, answers: [] };

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
      setHasJustSubmitted(true);
      localStorage.removeItem("surveyAnswers");
      localStorage.removeItem("currentQuestionIndex");
    } catch {
      toast.error("Failed to submit responses. Please try again.");
    }
    setIsSubmitting(false);
  }

  const isCompleted = user?.did_user_submit || hasJustSubmitted;

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: "Algerian Developer Survey 2026",
          text: "I just completed the Algerian Developer Survey 2026! Share your thoughts too.",
          url: window.location.origin,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="bg-background-main scrollbar-hide relative flex h-dvh max-w-dvw flex-col items-center overflow-hidden text-white">
      {/* Cozy Top Gradient */}
      <div className="from-brand-primary/20 pointer-events-none absolute top-0 right-0 left-0 h-[45vh] bg-linear-to-b to-transparent opacity-80"></div>

      <div className="z-50 flex w-full flex-col items-center">
        {/* Pass progress=100 if completed, or hide circular progress inside Header by not passing progress? The user said "hide CircularProgress bar". We can pass a flag to Header or hide it conditionally there. Let's pass a nullable progress. */}
        <Header progress={isCompleted ? null : progress} />
      </div>
      {isLoading ? (
        <div className="flex min-h-0 w-full max-w-125 flex-1 -translate-y-10 items-center justify-center">
          <div className="loader-bars"></div>
        </div>
      ) : isCompleted ? (
        <div className="z-10 flex min-h-0 w-full max-w-125 flex-1 flex-col items-center justify-center px-4 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center"
          >
            <div className="bg-brand-primary/20 text-brand-primary mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-3 font-mono text-3xl font-bold tracking-tight text-white">
              You've submitted successfully!
            </h2>
            <p className="mb-10 max-w-md font-mono text-white/50">
              Thank you for contributing to the 2026 Algerian Developer Survey.
              Your insights help shape the community.
            </p>

            <div className="flex w-full max-w-sm flex-col gap-4">
              <button
                onClick={handleShare}
                className="bg-brand-primary hover:bg-brand-hover flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-mono text-lg font-semibold text-white transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                Share Survey
              </button>
              <Link
                to="/"
                className="bg-background-surface/30 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-mono text-lg font-medium text-white transition-colors hover:bg-white/5"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
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
