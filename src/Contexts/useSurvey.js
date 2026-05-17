import { useContext } from "react";
import { QuestionsContext } from "./QuestionsContext";

export function useSurvey() {
  const context = useContext(QuestionsContext);

  if (context === undefined) {
    throw new Error("useSurvey must be used within a QuestionsProvider");
  }

  return context;
}
