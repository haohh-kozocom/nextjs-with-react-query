import FormStudent from "@/components/common/form-student";
import { ACTION } from "@/types/common";

export default function EditStudentByIdPage({
  params,
}: {
  params: { id: string };
}) {
  return <FormStudent action={ACTION.EDIT} idStudent={params.id} />;
}
