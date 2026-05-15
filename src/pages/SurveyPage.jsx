import { useForm, FormProvider } from "react-hook-form";
import { QuestionsProvider } from "../Contexts/QuestionsContext";
import { getQuestions } from "../services/apiQuestions";
import mockQuestions from "../assets/mockQuestions.json";
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
      <QuestionsProvider surveyData={mockQuestions}>
        <SurveyShell />
      </QuestionsProvider>
    </FormProvider>
  );
}

export default SurveyPage;
