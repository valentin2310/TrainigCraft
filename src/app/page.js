import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1 className="text-5xl font-bold text-primary">Training Craft</h1>
      <button className="bg-secondary py-2 px-4 text-white rounded shadow-lg">Ir al login</button>
    </main>
  );
}
