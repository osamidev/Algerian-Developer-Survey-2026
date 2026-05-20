import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useSurvey } from "../../Contexts/useSurvey";
import SomethingWentWrong from "../../pages/SomethingWentWrong";
import QuestionRenderer from "./QuestionRenderer";
import NavButtons from "./NavButtons";
import Header from "./Header";
import toast from "react-hot-toast";
import { submitResponses } from "../../services/apiSurvey";
import { useAuth } from "../../Contexts/useAuth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Home } from "lucide-react";
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
import { transformSurveyData } from "../../utils/transformData";

const categoryColors = {
  background: "bg-blue-500/20 text-blue-300",
  education: "bg-green-500/20 text-green-300",
  tech_stack: "bg-purple-500/20 text-purple-300",
  ai: "bg-pink-500/20 text-pink-300",
  career: "bg-yellow-500/20 text-yellow-300",
  salary: "bg-emerald-500/20 text-emerald-300",
  remote_work: "bg-cyan-500/20 text-cyan-300",
  challenges: "bg-orange-500/20 text-orange-300",
  learning: "bg-teal-500/20 text-teal-300",
  opinions: "bg-fuchsia-500/20 text-fuchsia-300",
};

const MotionDiv = motion.div;

function SurveyShell() {
  const { user } = useAuth();
  const [hasJustSubmitted, setHasJustSubmitted] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const {
    currentQuestion,
    progress,
    setIsSubmitting,
    navigationDirection,
    isLoading,
    fetchError,
    questions,
  } = useSurvey();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setShowDesc(false);
  }, [currentQuestion?.id]);

  async function onSubmit(data) {
    setIsSubmitting(true);

    // 1. Let the helper format the answers payload
    const submission = {
      user_id: user?.user_id,
      answers: transformSurveyData(data, questions),
    };

    // 2. Handle execution and side effects
    try {
      await submitResponses(submission);
      setHasJustSubmitted(true);

      // Clean up cache
      localStorage.removeItem("surveyAnswers");
      localStorage.removeItem("currentQuestionIndex");
    } catch {
      toast.error("Failed to submit responses. Please try again.");
    } finally {
      // Putting this in finally ensures loading state resets even if an error occurs
      setIsSubmitting(false);
    }
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
        <Header progress={isCompleted ? null : progress} />
      </div>
      {isLoading ? (
        <div className="flex min-h-0 w-full max-w-125 flex-1 -translate-y-10 items-center justify-center">
          <div className="loader-bars"></div>
        </div>
      ) : fetchError ? (
        <SomethingWentWrong
          message={fetchError?.message}
          onRetry={() => window.location.reload()}
        />
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
                    <div className="mb-4 flex">
                      <span
                        className={`rounded-full px-3 py-2 font-mono text-xs font-semibold tracking-wider uppercase ${
                          categoryColors[currentQuestion.category] ||
                          "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {currentQuestion.category?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mb-8 flex flex-col">
                      <h2 className="mb-3 font-mono text-2xl leading-[1.3] font-bold tracking-wide text-white antialiased">
                        {currentQuestion.question}
                      </h2>

                      {currentQuestion.description && (
                        <div className="mt-1 flex flex-col items-start gap-3">
                          <button
                            type="button"
                            onClick={() => setShowDesc(!showDesc)}
                            className="bg-background-surface/30 cursor-pointer rounded-full px-3 py-2 font-mono text-xs tracking-wide text-white/50 decoration-white/20 underline-offset-4 transition-colors hover:text-white/80"
                          >
                            <span className="flex items-center gap-1 transition-all duration-75">
                              {`${showDesc ? "Hide" : "Show"} description`}
                              <ChevronUp
                                className={`transform ${showDesc ? "rotate-180" : ""} transition-all duration-75`}
                                size={16}
                              />
                            </span>
                          </button>

                          {showDesc && (
                            <div className="overflow-hidden font-mono text-sm leading-relaxed tracking-wider text-white/60">
                              {currentQuestion.description}
                            </div>
                          )}
                        </div>
                      )}
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
