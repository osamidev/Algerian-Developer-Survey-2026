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

const submitResponses = async (responses) => {
  const submitUrl = import.meta.env.VITE_SUBMIT_API_URL;
  if (!submitUrl)
    throw new Error(
      "Submit API is not configured. Set VITE_SUBMIT_API_URL and try again.",
    );

  const data = await fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responses),
  });

  if (!data.ok) {
    throw new Error(
      `Failed to submit responses (${data.status} ${data.statusText || "Unknown error"}).`,
    );
  }

  return data.json();
};

export { getQuestions, submitResponses };
