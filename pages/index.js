import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/create-wallet">
        <button>지갑 생성</button>
      </Link>
      <Link href="/connect-wallet">
        <button>지갑 연결</button>
      </Link>
    </div>
  );
}
