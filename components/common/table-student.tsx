"use client";

import { getListStudent } from "@/api/students-api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { LIMIT } from "@/constants/common";
import { useMemo } from "react";
import { ROUTE_PATH } from "@/configs/route-path";
import { useMutateStudent } from "@/hooks";
import { ACTION } from "@/types/common";
import { Students } from "@/types/student";
import { toast } from "react-toastify";
import Skeleton from "../ui/skeleton";
import Spinner from "../ui/spinner";

export default function TableStudent() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const page = useMemo(() => {
    const curPage = Number(searchParams.get("page")) || 1;
    return curPage;
  }, [searchParams]);

  const { data, isLoading, isFetching, isFetched } = useQuery({
    queryKey: ["students", page],
    queryFn: ({ signal }) => getListStudent(page, signal!),
    keepPreviousData: true,
  });

  const totalPage = useMemo(() => {
    const totalStudentsCount = Number(data?.headers["x-total-count"] || 0);
    const curTotalPage = Math.ceil(totalStudentsCount / LIMIT);
    return curTotalPage;
  }, [data?.headers]);

  const onSuccess = () => {
    toast.success(`${ACTION.DELETE} student success`);
    queryClient.invalidateQueries({
      predicate: (query) => {
        let pageCompare = JSON.stringify(query?.queryKey[1]);
        return query.queryKey[0] === "students" && +pageCompare >= +page;
      },
    });
  };

  const onMutate = (student: Students) => {
    queryClient.cancelQueries({ queryKey: ["students"] });

    // Snapshot the previous value
    const previousData = queryClient.getQueryData(["students", page]);
    // Optimistically update to the new value
    queryClient.setQueryData(["students", page], (old: any) => ({
      ...old,
      data: old?.data?.filter((item: any) => item.id !== student.id),
    }));
    return { previousData };
  };

  const onError = (_error: any, _: any, context: { previousData: unknown }) => {
    queryClient.setQueryData(["students", page], context?.previousData);
    toast.error(`${ACTION.DELETE} student error`);
  };

  const mutation = useMutateStudent({
    action: ACTION.DELETE,
    onMutate,
    onSuccess,
    onError,
  });

  const handleDelete = (student: Students) => {
    mutation.mutate(student);
  };

  return (
    <>
      {isLoading && !data && <Skeleton />}
      {data && (
        <>
          <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Avatar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6">{student.id}</td>
                    <td className="py-4 px-6">
                      <Image
                        src={student.avatar}
                        alt="student"
                        width={20}
                        height={20}
                      />
                    </td>
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                    >
                      {student.last_name}
                    </th>
                    <td className="py-4 px-6">{student.email}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`${ROUTE_PATH.EDIT_STUDENT}/${student.id}`}
                        className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium text-red-600 dark:text-red-500"
                        onClick={() => handleDelete(student as Students)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Spinner isFetching={isFetching && !isFetched} />
          </div>
          <div className="mt-6 flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  {page === 1 ? (
                    <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                      Previous
                    </span>
                  ) : (
                    <Link
                      className="rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                      href={`/student?page=${page - 1}`}
                    >
                      Previous
                    </Link>
                  )}
                </li>
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = page === pageNumber;
                    return (
                      <li key={pageNumber}>
                        <Link
                          href={`/student?page=${pageNumber}`}
                          className={`border border-gray-300   py-2 px-3 leading-tight  hover:bg-gray-100 hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-100 text-gray-700"
                              : "bg-white text-gray-500"
                          }`}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    );
                  })}
                <li>
                  {page === totalPage ? (
                    <span className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                      Next
                    </span>
                  ) : (
                    <Link
                      className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                      href={`/student?page=${page + 1}`}
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
