import { addStudent, deleteStudent, updateStudent } from "@/api/students-api";
import { ACTION } from "@/types/common";
import { Students } from "@/types/student";
import { useMutation } from "@tanstack/react-query";

type Props = {
  action: ACTION;
  onMutate?: (student: Students) => void;
  onSuccess?: (data?: any) => void;
  onError?: (_error: any, _: any, context: any) => void;
};

export const useMutateStudent = ({
  action,
  onSuccess,
  onMutate,
  onError,
}: Props) => {
  let functionMutation;

  switch (action) {
    case ACTION.ADD: {
      functionMutation = addStudent;
      break;
    }
    case ACTION.EDIT: {
      functionMutation = updateStudent;
      break;
    }
    case ACTION.DELETE: {
      functionMutation = deleteStudent;
      break;
    }
  }

  return useMutation({
    mutationFn: functionMutation,
    onSuccess,
    onMutate,
    onError,
  });
};
