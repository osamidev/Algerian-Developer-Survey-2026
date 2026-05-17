const questionsApiUrl = import.meta.env.VITE_QUESTIONS_API_URL;

const getQuestions = async () => {
  if (!questionsApiUrl) {
    throw new Error(
      "Questions API is not configured. Set VITE_QUESTIONS_API_URL and try again.",
    );
  }

  const data = await fetch(questionsApiUrl);

  if (!data.ok) {
    throw new Error(
      `Failed to fetch questions (${data.status} ${data.statusText || "Unknown error"}).`,
    );
  }

  return data.json();
};

export { getQuestions };
