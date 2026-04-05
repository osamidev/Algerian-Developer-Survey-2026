import { useForm } from "react-hook-form"; function QuestionCard() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (d) => {
    alert(JSON.stringify(d));
  };
  
  return (
<form
    className="flex justify-center flex-col"
    onSubmit="{handleSubmit(onSubmit)}"
>
    <div className="flex justify-center flex-col">
        <Question />
        <Options />
        <Controls />
    </div>
</form>
); } export default QuestionCard;
