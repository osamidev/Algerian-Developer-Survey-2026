import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useSurvey } from "../../Contexts/QuestionsContext";
import QuestionRenderer from "./QuestionRenderer";
import NavButtons from "./NavButtons";
import Header from "./Header";

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
  const { currentQuestion, progress, setIsSubmitting, navigationDirection } =
    useSurvey();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext();

  async function onSubmit(data) {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Simulating API call with data:", data);

    const formattedData = {};
    for (const key in data) {
      const qId = parseInt(key, 10);
      const val = data[key];

      if (Array.isArray(val)) {
        // multiple choice (array of strings/numbers) or ranking (array of objects)
        formattedData[qId] = val.map((v) =>
          typeof v === "object" && v?.id ? parseInt(v.id, 10) : parseInt(v, 10),
        );
      } else if (typeof val === "string" && !isNaN(val)) {
        formattedData[qId] = parseInt(val, 10);
      } else {
        formattedData[qId] = val;
      }
    }
    console.log("Final Survey Data Submitted:", formattedData);

    setIsSubmitting(false);
  }

  // bg-[#0A0A0A]
  return (
    <div className="bg-background-main scrollbar-hide relative flex h-dvh max-w-dvw flex-col items-center overflow-x-hidden overflow-y-auto text-white">
      {/* Cozy Top Gradient */}
      <div className="from-brand-primary/20 pointer-events-none absolute top-0 right-0 left-0 h-[45vh] bg-gradient-to-b to-transparent opacity-80"></div>

      <div className="z-10 flex w-full flex-col items-center">
        <Header progress={progress} />
      </div>
      <div className="z-10 flex min-h-0 w-full max-w-125 flex-1 flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col justify-between"
        >
          <div className="flex-1 overflow-hidden px-4 pb-32">
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
    </div>
  );
}

export default SurveyShell;
