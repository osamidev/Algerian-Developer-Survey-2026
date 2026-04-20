import SingleChoice from "./SingleChoice";

// QuestionRenderer.jsx
function QuestionRenderer({ question, register, errors }) {
  switch (question.type) {
    case "single_choice":
      return (
        <SingleChoice question={question} register={register} errors={errors} />
      );
    default:
      return null;

    //     case "multiple_choice":
    //   return (
    //     <MultipleChoice
    //       question={question}
    //       register={register}
    //       errors={errors}
    //     />
    //   );
    // case "numeric":
    //   return (
    //     <NumericInput question={question} register={register} errors={errors} />
    //   );
    // case "ranking":
    //   return (
    //     <RankingInput question={question} register={register} errors={errors} />
    //   );
    // default:
    //   return null;
  }
}

export default QuestionRenderer;
