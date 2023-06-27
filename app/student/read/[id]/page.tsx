import Hydrate from "@/components/common/hydrate";
import ViewStudent from "@/components/common/view-student";
import { Student } from "@/types/student";
import { getQueryClient } from "@/utils/queryClient";
import { dehydrate } from "@tanstack/query-core";
import Link from "next/link";

export async function generateStaticParams() {
  const students: Student[] = await fetch(
    "http://localhost:4000/students"
  ).then((res) => res.json());

  return students.map((student) => ({
    id: `${student.id}`,
  }));
}

export default async function ReadStudentByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const client = getQueryClient();
  await client.prefetchQuery({
    queryKey: ["student-view", id],
    queryFn: async () =>
      await fetch(`http://localhost:4000/students?id=${id}`).then((res) =>
        res.json()
      ),
  });

  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: () => true,
  });

  return (
    <div>
      <Link
        className="text-gray-500 mb-4 cursor-pointer hover:underline inline-block"
        href={"/student"}
      >
        Home
      </Link>
      <h1 className="text-lg">View Student</h1>
      <Hydrate state={dehydratedState}>
        <ViewStudent id={id} />
      </Hydrate>
    </div>
  );
}
