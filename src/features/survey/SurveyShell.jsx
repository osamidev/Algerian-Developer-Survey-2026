import { useFormContext } from "react-hook-form";
import { useSurvey } from "../../Contexts/QuestionsContext";
import QuestionRenderer from "./QuestionRenderer";
import NavButtons from "./NavButtons";
import Header from "./Header";

function SurveyShell() {
  const { currentQuestion, progress } = useSurvey();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data) => {
    console.log("Final Survey Data Submitted:", data);
  };

  return (
    <div className="min-h bg-background-main text-text-high min-h-dvh w-dvw flex flex-col items-center">
      <Header progress={progress} />
      <div className="flex-1 w-full max-w-2xl p-4 flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 shadow-lg mt-8 flex flex-col flex-1 min-h-screen"
        >
          <div className="flex-1 overflow-y-auto">
            <QuestionRenderer
              question={currentQuestion}
              register={register}
              errors={errors}
            />
          </div>
          <NavButtons />
        </form>
      </div>
    </div>
  );
}

export default SurveyShell;
