import SingleChoice from "./SingleChoice";
import MultipleChoice from "./MultipleChoice";
import RankingInput from "./RankingInput";
import NumericInput from "./NumericInput";
import RatingInput from "./RatingInput";

// QuestionRenderer.jsx
function QuestionRenderer({ question, register, control, errors }) {
  switch (question.type) {
    case "single_choice":
      return (
        <SingleChoice question={question} register={register} errors={errors} />
      );
    case "multiple_choice":
      return (
        <MultipleChoice
          question={question}
          register={register}
          control={control}
          errors={errors}
        />
      );
    case "ranking":
      return <RankingInput question={question} />;
    case "numeric":
      return <NumericInput question={question} />;
    case "rating":
      return <RatingInput question={question} />;
    default:
      return null;
  }
}

export default QuestionRenderer;
