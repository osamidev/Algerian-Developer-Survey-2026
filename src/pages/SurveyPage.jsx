import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { QuestionsProvider } from "../Contexts/QuestionsContext";
import SurveyShell from "../features/survey/SurveyShell";

function SurveyPage() {
  const savedAnswers = JSON.parse(
    localStorage.getItem("surveyAnswers") || "{}",
  );
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: savedAnswers,
  });

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("surveyAnswers", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <QuestionsProvider>
        <SurveyShell />
      </QuestionsProvider>
    </FormProvider>
  );
}

export default SurveyPage;
