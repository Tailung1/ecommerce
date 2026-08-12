import type { Categories } from "../../categories.types";

export default function CategoryList({ categoriesData }: { categoriesData: Categories }) {
  return (
    <div>
      {categoriesData.map((s) => (
        <div>{s.name}</div>
      ))}
    </div>
  );
}
