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
    if (!Array.isArray(remoteData)) return [];
    return remoteData;
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
    if (!question.dependencies || question.dependencies.length === 0) return true;

    const answers = getValues();
    const allSelectedOptionIds = Object.values(answers).flatMap((val) => {
      if (Array.isArray(val)) return val.map(String);
      if (val != null) return [String(val)];
      return [];
    });

    const showIfDeps = question.dependencies.filter(d => d.condition_type === 'show_if');
    const hideIfDeps = question.dependencies.filter(d => d.condition_type === 'hide_if');

    if (hideIfDeps.length > 0) {
      const shouldHide = hideIfDeps.some(dep => allSelectedOptionIds.includes(String(dep.source_option_id)));
      if (shouldHide) return false;
    }

    if (showIfDeps.length > 0) {
      const shouldShow = showIfDeps.some(dep => allSelectedOptionIds.includes(String(dep.source_option_id)));
      if (!shouldShow) return false;
    }

    return true;
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
