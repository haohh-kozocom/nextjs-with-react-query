import { addStudent, updateStudent } from "@/api/students-api";
import { ACTION } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  action: ACTION;
  idStudent?: string;
  onSuccess: () => void;
};

export const useMutateStudent = ({ action, idStudent, onSuccess }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: action === ACTION.ADD ? addStudent : updateStudent,
    onSuccess(data) {
      onSuccess();
      if (action === ACTION.EDIT) {
        queryClient.setQueryData(["student", idStudent], data);
        queryClient.invalidateQueries(["students"]);
      }
    },
  });
};
