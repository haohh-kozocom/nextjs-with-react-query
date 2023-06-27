"use client";

import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useMutateStudent, useStudent } from "@/hooks";
import { ACTION, GENDER_SELECT } from "@/types/common";
import { Students } from "@/types/student";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "../ui/skeleton";
import axios, { AxiosError } from "axios";

type IFormInput = Students;

type Props = {
  action: ACTION;
  idStudent?: string;
};

export default function FormStudent({ action, idStudent }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const studentQuery = useStudent(idStudent);

  useEffect(() => {
    if (studentQuery.data) {
      reset(studentQuery.data.data);
    }
  }, [studentQuery.data, reset]);

  const onSuccess = (data: any) => {
    toast.success(`${action} student success`);
    queryClient.invalidateQueries(["students"]);
    if (action === ACTION.ADD) {
      reset();
    }

    if (action === ACTION.EDIT) {
      queryClient.setQueryData(["student", idStudent], data);
      queryClient.invalidateQueries({
        queryKey: ["student-view", idStudent],
      });
    }
  };

  const onError = (error: Error | AxiosError) => {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      toast.error(error.response?.data.error.email);
    }
  };

  const mutation = useMutateStudent({
    action,
    onSuccess,
    onError,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <span
        className="text-gray-500 mb-4 cursor-pointer hover:underline inline-block"
        onClick={() => router.back()}
      >
        Back
      </span>
      <h1 className="text-lg">
        {action === ACTION.ADD ? "Add" : "Edit"} Student
      </h1>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        {studentQuery.isFetching ? (
          <Skeleton />
        ) : (
          <>
            <div className="group relative z-0 mb-6 w-full">
              <input
                {...register("email", { required: true })}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                id="floating_email"
                type="email"
              />
              <label
                htmlFor="floating_email"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Email address
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              {GENDER_SELECT.map((gender) => (
                <div className="mb-4 flex items-center" key={gender.key}>
                  <label htmlFor={gender.id}>
                    <input
                      {...register("gender")}
                      type="radio"
                      value={gender.value}
                      id={gender.id}
                      className="mr-2"
                      required
                    />
                    {gender.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                id="floating_country"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                {...register("country")}
              />
              <label
                htmlFor="floating_country"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Country
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  id="floating_first_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register("first_name", { required: true })}
                />
                <label
                  htmlFor="floating_first_name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  First name
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  id="floating_last_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register("last_name", { required: true })}
                />
                <label
                  htmlFor="floating_last_name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Last name
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  id="floating_avatar"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register("avatar", { required: true })}
                />
                <label
                  htmlFor="floating_avatar"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Avatar
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  id="floating_btc_address"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register("btc_address")}
                />
                <label
                  htmlFor="floating_btc_address"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                >
                  BTC Address
                </label>
              </div>
            </div>
          </>
        )}

        <button
          disabled={mutation.isLoading}
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
        >
          {mutation.isLoading && (
            <div role="status" className="mr-1 inline-block">
              <svg
                aria-hidden="true"
                className="inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 h-5 w-5"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {action === ACTION.ADD ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
}
