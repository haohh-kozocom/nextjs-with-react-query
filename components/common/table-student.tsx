"use client";

import { getListStudent } from "@/api/students-api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { LIMIT } from "@/constants/common";
import { useMemo } from "react";

export default function TableStudent() {
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    const curPage = Number(searchParams.get("page")) || 1;
    return curPage;
  }, [searchParams]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getListStudent(page),
    keepPreviousData: true,
  });

  const totalPage = useMemo(() => {
    const totalStudentsCount = Number(data?.headers["x-total-count"] || 0);
    const curTotalPage = Math.ceil(totalStudentsCount / LIMIT);
    return curTotalPage;
  }, [data?.headers]);

  //   const deleteStudentMutation = useMutation({
  //     mutationFn: (id: number | string) => deleteStudent(id),
  //     onSuccess: (_, id) => {
  //       toast.success(`Xóa thành công student với id là ${id}`)
  //       queryClient.invalidateQueries({ queryKey: ['students', page], exact: true })
  //     }
  //   })

  //   const handleDelete = (id: number) => {
  //     deleteStudentMutation.mutate(id)
  //   }

  const handlePrefetchStudent = (id: number) => {
    // queryClient.prefetchQuery(['student', String(id)], {
    //   queryFn: () => getStudent(id),
    //   staleTime: 10 * 1000
    // })
  };

  //   const fetchStudent = (second: number) => {
  //     const id = '6'
  //     queryClient.prefetchQuery(['student', id], {
  //       queryFn: () => getStudent(id),
  //       staleTime: second * 1000
  //     })
  //   }

  //   const refetchStudents = () => {
  //     studentsQuery.refetch()
  //   }

  //   const cancelRequestStudents = () => {
  //     queryClient.cancelQueries({ queryKey: ['students', page] })
  //   }

  return (
    <>
      {isLoading && !data && (
        <div role="status" className="mt-6 animate-pulse">
          <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
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
                    onMouseEnter={() => handlePrefetchStudent(student.id)}
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
                        href={`/students/${student.id}`}
                        className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium text-red-600 dark:text-red-500"
                        // onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className={`absolute inset-0 bg-[#ffffff80] ${
                !isFetching ? "hidden" : ""
              }`}
            >
              <div className="justify-center items-center flex w-full h-full">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              </div>
            </div>
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
