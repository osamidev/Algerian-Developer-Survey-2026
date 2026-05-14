import { useForm, FormProvider } from "react-hook-form";
import { QuestionsProvider } from "../Contexts/QuestionsContext";
import { getQuestions } from "../services/apiQuestions";
import mockData from "../assets/mockData.json";
import SurveyShell from "../features/survey/SurveyShell";
import { useEffect } from "react";

function SurveyPage() {
  const methods = useForm({ mode: "onChange" });

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const questions = await getQuestions();
        console.log("Fetched Questions:", questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <FormProvider {...methods}>
      <QuestionsProvider questions={mockData.questions}>
        <SurveyShell />
      </QuestionsProvider>
    </FormProvider>
  );
}

export default SurveyPage;
