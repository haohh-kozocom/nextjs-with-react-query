import { getStudent } from "@/api/students-api";
import { useQuery } from "@tanstack/react-query";

export const useStudent = (id: string | undefined) =>
  useQuery({
    queryKey: ["student", id],
    queryFn: getStudent,
    enabled: id !== undefined,
  });
