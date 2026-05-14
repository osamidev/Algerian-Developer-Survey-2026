const questionsApiUrl = import.meta.env.VITE_QUESTIONS_API_URL;

const getQuestions = async () => {
  const data = await fetch(questionsApiUrl);

  if (!data.ok) {
    throw new Error("Failed to fetch questions");
  }

  return data.json();
};

export { getQuestions };