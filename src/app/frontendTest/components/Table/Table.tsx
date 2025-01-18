'use client';
import { useRouter } from "next/navigation"; // Use 'next/navigation' in the App Router

type PageData = {
  id: number;
  name: string;
  createdAt: string;
};

export default function Table() {
  const router = useRouter();

  const fakeData: PageData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Page ${i + 1}`,
    createdAt: new Date().toISOString().split("T")[0],
  }));

  const handleRowClick = (id: number) => {
    router.push("/details"); // Update navigation logic
  };

  return (
    <div className="p-8">
      <table className="w-full border-collapse bg-black text-white shadow-md">
        <thead>
          <tr className="bg-red-700">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-red-600 cursor-pointer"
              onClick={() => handleRowClick(item.id)}
            >
              <td className="p-4 border-t">{item.name}</td>
              <td className="p-4 border-t">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
