import { MenuSidebar } from "@/constants/menu";
import MenuItem from "./menu-item";

export default function SideBar() {
  return (
    <aside className="col-span-1 h-[100vh]" aria-label="Sidebar">
      <div className="flex h-full flex-col overflow-y-auto bg-gray-100 py-4 px-3 shadow-lg w-full">
        <ul className="space-y-2">
          {MenuSidebar.map((item) => {
            return <MenuItem item={item} key={item.key} />;
          })}
        </ul>
      </div>
    </aside>
  );
}
