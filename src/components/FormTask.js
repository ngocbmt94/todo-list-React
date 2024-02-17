import { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormTask({ onSubmit, data, layout }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // reload form if data is changed
  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const style = {
    col: "flex-col",
    row: "gap-5 justify-center md:flex-row md:justify-between",
  };

  // submit and reset form
  const onSubmitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={`flex ${style[layout]}`}>
      <input id="id" {...register("id")} hidden />

      <div className="mb-5 w-full">
        <input id="title" {...register("title", { required: true })} type="text" placeholder="Add title..." className={`bg-transparent outline-none border-b-2 ${errors.title ? "border-rose-500" : "border-gray-500"}  pb-1 w-full focus:border-fuchsia-500`} />
        {errors.title && <span className="text-sm text-rose-500">This field is required *</span>}
      </div>

      <div className="mb-5 w-full">
        <input id="description" {...register("description", { required: true })} type="text" placeholder="Add description..." className={`bg-transparent outline-none border-b-2 ${errors.description ? "border-rose-500" : "border-gray-500"}  pb-1 w-full focus:border-fuchsia-500`} />
        {errors.description && <span className="text-sm text-rose-500">This field is required *</span>}
      </div>

      <input type="submit" value="Submit" hidden />
    </form>
  );
}

export default FormTask;
