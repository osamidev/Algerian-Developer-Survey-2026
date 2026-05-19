/**
 * Normalizes a raw question type to the backend's expected answer type string.
 */

/**
 * Coerces a value to a number if it looks like one, otherwise returns the original value.
 */
function normalizeValue(val) {
  const isNumber =
    typeof val === "number" || (!isNaN(parseFloat(val)) && isFinite(val));
  return isNumber ? Number(val) : val;
}

/**
 * Transforms the flat form data object into the structured array the backend expects.
 *
 * @param {Object} formData - The raw data from the form (e.g., { "12': [1, 2], "13": "text" })
 * @param {Array} questions - The original array of question metadata objects
 * @returns {Array} Formatted answers array
 */
export function transformSurveyData(formData, questions = []) {
  const answers = [];
  const qLookup = new Map(questions.map((q) => [String(q.id), q]));

  for (const [key, rawVal] of Object.entries(formData)) {
    const qIdNum = parseInt(key, 10);
    const meta = qLookup.get(String(key));
    const qType = meta?.type || null;

    // Handle Arrays (Ranking or Multiple Choice)
    if (Array.isArray(rawVal)) {
      const isRanking = rawVal.length > 0 && typeof rawVal[0] === "object";
      const targetType = isRanking ? "ranking" : "multiple_choice";

      for (const item of rawVal) {
        const parsedAns = isRanking && item?.id ? item.id : item;
        answers.push({
          question_id: qIdNum,
          type: targetType,
          answer: parseInt(parsedAns, 10),
        });
      }
    }
    // Handle Single Values and range input (0-10)
    else {
      answers.push({
        question_id: qIdNum,
        type: qType,
        answer: normalizeValue(rawVal),
      });
    }
  }

  return answers;
}
