import Link from "next/link";

export default function ButtonAddStudent() {
  return (
    <div className="mt-6">
      <Link
        href="/students/add"
        className=" rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
      >
        Add Student
      </Link>
    </div>
  );
}
