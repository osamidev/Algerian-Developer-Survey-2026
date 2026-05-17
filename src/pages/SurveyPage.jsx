import { useForm, FormProvider } from "react-hook-form";
import { QuestionsProvider } from "../Contexts/QuestionsContext";
import SurveyShell from "../features/survey/SurveyShell";

function SurveyPage() {
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <QuestionsProvider>
        <SurveyShell />
      </QuestionsProvider>
    </FormProvider>
  );
}

export default SurveyPage;
