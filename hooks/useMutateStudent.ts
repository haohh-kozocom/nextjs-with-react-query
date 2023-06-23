import { addStudent, updateStudent } from "@/api/students-api";
import { ACTION } from "@/types/common";
import { useMutation } from "@tanstack/react-query";

type Props = {
  action: ACTION;
  onSuccess: () => void;
};

export const useMutateStudent = ({ action, onSuccess }: Props) =>
  useMutation({
    mutationFn: action === ACTION.ADD ? addStudent : updateStudent,
    onSuccess,
  });
