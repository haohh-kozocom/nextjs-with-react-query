import ButtonAddStudent from "@/components/common/button-add-student";
import TableStudent from "@/components/common/table-student";

export default function StudentPage() {
  return (
    <div>
      <h1 className="text-lg">Students</h1>
      <ButtonAddStudent />
      <TableStudent />
    </div>
  );
}
