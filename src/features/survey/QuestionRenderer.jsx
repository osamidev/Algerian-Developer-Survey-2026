import SingleChoice from "./SingleChoiceInput";
import MultipleChoice from "./MultipleChoiceInput";
import RankingInput from "./RankingInput";
import RangeInput from "./RangeInput";

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
    case "range":
      return (
        <RangeInput question={question} register={register} errors={errors} />
      );
    default:
      return null;
  }
}

export default QuestionRenderer;
