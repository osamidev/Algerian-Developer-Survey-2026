import { createContext, useContext, useState } from "react";
import { useFormContext } from "react-hook-form";

const QuestionsContext = createContext(null);

export function QuestionsProvider({ questions, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getValues } = useFormContext();

  const isVisible = (question) => {
    if (!question.show_if) return true; // no condition = always show

    const answers = getValues();

    // depends_on tells us WHICH question's answer to check
    const sourceQuestion = questions.find((q) => q.id === question.depends_on);
    const sourceAnswer = answers[`q_${sourceQuestion?.id}`];

    // Check if the user's answer is in the show_if whitelist
    if (Array.isArray(sourceAnswer)) {
      return sourceAnswer.some((v) => question.show_if.includes(v));
    }
    return question.show_if.includes(sourceAnswer);
  };

  const goNext = () => {
    let next = currentIndex + 1;
    // Auto-skip: keep jumping forward until we find a visible question
    while (next < questions.length && !isVisible(questions[next])) {
      next++;
    }
    setCurrentIndex(next);
  };

  const goBack = () => {
    let prev = currentIndex - 1;
    while (prev >= 0 && !isVisible(questions[prev])) {
      prev--;
    }
    setCurrentIndex(prev);
  };

  const getOptionsCount = (options) => options.length;

  const totalVisible = questions.filter(isVisible).length;
  const visibleSoFar = questions
    .slice(0, currentIndex + 1)
    .filter(isVisible).length;
  const progress = (visibleSoFar / totalVisible) * 100;

  const currentQuestion = questions[currentIndex];

  return (
    <QuestionsContext.Provider
      value={{
        currentQuestion: currentQuestion,
        goNext,
        goBack,
        progress,
        isLast: currentIndex === questions.length - 1,
        isManyOptions: getOptionsCount(currentQuestion.options) > 10,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionsContext);

  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }

  return context;
}
