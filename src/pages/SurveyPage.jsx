import { useForm, FormProvider } from "react-hook-form";
import { QuestionsProvider } from "../Contexts/QuestionsContext";
import SurveyShell from "../features/survey/SurveyShell";
import localQuestions5 from "../assets/localQuestions5.json";

function SurveyPage() {
  const methods = useForm({ mode: "onSubmit" });
  const useLocalQuestions = import.meta.env.VITE_USE_LOCAL_QUESTIONS === "true";

  return (
    <FormProvider {...methods}>
      <QuestionsProvider
        surveyData={useLocalQuestions ? localQuestions5 : undefined}
      >
        <SurveyShell />
      </QuestionsProvider>
    </FormProvider>
  );
}

export default SurveyPage;
