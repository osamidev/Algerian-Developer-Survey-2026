import { useForm, FormProvider } from "react-hook-form";
import { QuestionsProvider } from "../Contexts/QuestionsContext";
import mockData from "../assets/mockData.json";
import SurveyShell from "../features/survey/SurveyShell";

function SurveyPage() {
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <QuestionsProvider questions={mockData.questions}>
        <SurveyShell />
      </QuestionsProvider>
    </FormProvider>
  );
}

export default SurveyPage;
