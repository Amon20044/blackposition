import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import Details from "./details";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Table />
      <Details/>
    </div>
  );
}
