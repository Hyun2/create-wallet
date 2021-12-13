import { useState } from "react";
import { useRouter } from "next/router";
// import { useEffect } from "react/cjs/react.development";
// import fetcher from "../utils/fetcher";
// import useSWR from "swr";
import axios from "axios";
import styled from "@emotion/styled";

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 30px 0;
`;

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const ConnectWallet = () => {
  return (
    <div>
      <UploadKeystore />
    </div>
  );
};

const UploadKeystore = () => {
  const [keystore, setKeystore] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const router = useRouter();
  // const { data, error, mutate } = useSWR("/api/users", fetcher);

  // useEffect(() => {
  //   console.log(walletAddress);
  //   if (typeof walletAddress === "string") {
  //     router.push("/create-wallet");
  //   }
  // }, [walletAddress, router]);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const k = event.target.files[0];
      setKeystore(k);
      setCreateObjectURL(URL.createObjectURL(k));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", keystore);
    const {
      data: { address, balance },
    } = await axios.post("/api/connect-wallet", body);

    if (address) {
      setWalletAddress(address);
    }
    if (balance) {
      setWalletBalance(balance);
    }
  };

  return (
    <Container>
      <Title>Keystore 파일 업로드</Title>
      <input type="file" onChange={uploadToClient} />
      {/* <button onClick={uploadToServer}>확인</button> */}
      {/* <input
        className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 focus:outline-none focus:border-transparent text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
      /> */}
      <button
        style={{ margin: "30px 0" }}
        type="button"
        onClick={uploadToServer}
        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        확인
      </button>

      {walletAddress && (
        <p style={{ textAlign: "center" }}>
          <span className="px-2 py-1  text-base rounded text-white  bg-purple-600 font-medium">
            {walletAddress}
          </span>
          <div style={{ textAlign: "center" }}>Balance: {walletBalance}</div>
          <div style={{ textAlign: "center" }}>지갑 연결 성공!</div>
        </p>
      )}
    </Container>
  );
};

// const InputPassword = () => {
//   <div>
//     <input placeholder="패스워드" />
//   </div>;
// };

export default ConnectWallet;
