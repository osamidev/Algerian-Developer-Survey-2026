import { transformSurveyData } from "../utils/transformData";

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

  // 1. Grab the token from localStorage
  const token = localStorage.getItem("survey_session");

  const data = await fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 2. Pass the token securely in the Authorization header
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.parse(transformSurveyData(responses, await getQuestions())),
  });

  if (!data.ok) {
    throw new Error(
      `Failed to submit responses (${data.status} ${data.statusText || "Unknown error"}).`,
    );
  }

  return data.json();
};

export { getQuestions, submitResponses };
