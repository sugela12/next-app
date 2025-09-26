import Link from "next/link";

export default function Home() {
  return (
    <button className="bg-blue-500 text-white p-2 rounded-md">
      <Link href="/chat">Click me</Link>
    </button>
  );
}
