import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  padding: 100px;
`;

export default function Home() {
  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "1.5rem",
        }}
      >
        니모닉 지갑 생성 데모
      </h2>
      <Link href="/create-wallet">
        <button
          style={{ marginBottom: "50px" }}
          type="button"
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          지갑 생성
        </button>
      </Link>
      <Link href="/connect-wallet">
        <button
          type="button"
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          지갑 연결
        </button>
      </Link>
    </Container>
  );
}
