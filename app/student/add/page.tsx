import FormStudent from "@/components/common/form-student";
import { ACTION } from "@/types/common";

export default function AddStudentPage() {
  return <FormStudent action={ACTION.ADD} />;
}
