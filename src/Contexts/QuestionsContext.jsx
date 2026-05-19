import { createContext, useState, useMemo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getQuestions } from "../services/apiSurvey";

const QuestionsContext = createContext(null);

export function QuestionsProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(
    Number(localStorage.getItem("currentQuestionIndex")) || 0,
  );
  const [navigationDirection, setNavigationDirection] = useState(1);
  const { getValues } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remoteData, setRemoteData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const questions = useMemo(() => {
    if (!remoteData || !remoteData.questions) return [];

    const rawQuestions = remoteData.questions;
    const optionsMap = remoteData.options || {};
    const dependsRows = remoteData.DependsRows || [];

    return rawQuestions
      .map((q) => {
        const qOptions = optionsMap[q.question_id.toString()] || [];
        const dependencies = dependsRows
          .filter(
            (r) =>
              r.question_id === q.question_id &&
              r.depends_on_option_id !== null,
          )
          .map((r) => r.depends_on_option_id);

        return {
          ...q,
          id: q.question_id,
          text: q.question_text,
          type: q.question_type,
          options: qOptions.map((opt) => ({
            ...opt,
            id: opt.option_id,
            text: opt.option_text,
          })),
          depends_on_options: dependencies, // new visibility array
        };
      })
      .sort((a, b) => a.position - b.position);
  }, [remoteData]);

  // Fetch remote questions from backend
  useEffect(() => {
    let mounted = true;

    async function fetchRemote() {
      setIsLoading(true);
      setFetchError(null);

      try {
        const data = await getQuestions();
        if (mounted) setRemoteData(data);
      } catch (err) {
        if (mounted) setFetchError(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchRemote();

    return () => {
      mounted = false;
    };
  }, []);

  const isVisible = (question) => {
    if (
      !question.depends_on_options ||
      question.depends_on_options.length === 0
    )
      return true;

    const answers = getValues();
    const allSelectedOptionIds = Object.values(answers).flatMap((val) => {
      if (Array.isArray(val)) return val.map(String);
      if (val != null) return [String(val)];
      return [];
    });

    return question.depends_on_options.some((reqOptId) =>
      allSelectedOptionIds.includes(String(reqOptId)),
    );
  };

  const goNext = () => {
    let next = currentIndex + 1;
    // Auto-skip: keep jumping forward until we find a visible question
    while (next < questions.length && !isVisible(questions[next])) {
      next++;
    }
    if (next < questions.length) {
      setNavigationDirection(1);
      setCurrentIndex(next);
      localStorage.setItem("currentQuestionIndex", next.toString());
    }
  };

  const goBack = () => {
    let prev = currentIndex - 1;
    while (prev >= 0 && !isVisible(questions[prev])) {
      prev--;
    }
    if (prev >= 0) {
      setNavigationDirection(-1);
      setCurrentIndex(prev);
      localStorage.setItem("currentQuestionIndex", prev.toString());
    }
  };

  const getOptionsCount = (options) => (options ? options.length : 0);

  let isLast = true;
  for (let i = currentIndex + 1; i < questions.length; i++) {
    if (isVisible(questions[i])) {
      isLast = false;
      break;
    }
  }

  const totalVisible = questions.filter(isVisible).length;
  const visibleSoFar = questions
    .slice(0, currentIndex + 1)
    .filter(isVisible).length;

  const progress = (((visibleSoFar - 1) / totalVisible) * 100).toFixed(0) | 0;

  const currentQuestion = questions[currentIndex];

  return (
    <QuestionsContext.Provider
      value={{
        currentQuestion: currentQuestion,
        goNext,
        goBack,
        navigationDirection,
        progress,
        isLast,
        isManyOptions: getOptionsCount(currentQuestion?.options) > 10,
        isLoading,
        setIsLoading,
        isSubmitting,
        setIsSubmitting,
        fetchError,
        remoteData,
        questions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export { QuestionsContext };
