import { z } from "zod";

/**
 * Zod schema for numeric input validation
 * - Cannot be empty
 * - Must be a number
 * - Optional min/max validation
 */
export const numericInputSchema = z.object({
  value: z
    .number({ required_error: "This field is required" })
    .min(0, "Must be a positive number"),
});

/**
 * Zod schema for multiple choice validation
 * - At least one option must be selected
 */
export const multipleChoiceSchema = z.object({
  value: z.array(z.string()).min(1, "Please select at least one option"),
});

/**
 * Create a dynamic schema validator for any question type
 */
export const createQuestionSchema = (question) => {
  const baseSchema = {};

  switch (question.type) {
    case "numeric":
      baseSchema[question.id.toString()] = z
        .number({
          required_error: "This field is required",
        })
        .min(0, "Must be a positive number")
        .max(100, "Must be less than 100");
      break;

    case "multiple_choice":
      baseSchema[question.id.toString()] = z
        .array(z.string())
        .min(1, "Please select at least one option");
      break;

    default:
      break;
  }

  return z.object(baseSchema);
};
