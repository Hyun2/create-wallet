import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Mnemonic from "../components/mnemonic";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  margin: 30px;
`;

const CreateWallet = ({ mnemonic }) => {
  // console.log(mnemonic);
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = async (e) => {
    console.log(mnemonic, password);

    if (!mnemonic || !password) {
      return;
    }
    const { data } = await axios.post("/api/create-keystore", {
      mnemonic: mnemonic.join(" "),
      password,
    });

    let blob = new Blob([data], { type: "application/json" });
    let jsonURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = jsonURL;
    tempLink.setAttribute("download", "keystore.json");
    tempLink.click();
    setClicked(true);
  };

  return (
    <div>
      <Mnemonic mnemonic={mnemonic} />

      <Wrapper>
        <div className=" relative " style={{ marginBottom: "20px" }}>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="패스워드"
          />
        </div>

        {/* <button disabled={!password}>
          <a onClick={handleClick}>Keystore 생성</a>
        </button> */}

        <button
          style={{ marginBottom: "20px" }}
          type="button"
          disabled={!password}
          className={`${
            password ? "" : "cursor-not-allowed"
          } py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
        >
          <a onClick={handleClick}>Keystore 생성</a>
        </button>

        {clicked && (
          // <Link href="/connect-wallet">
          //   <a>지갑 연결</a>
          // </Link>

          <Link href="/connect-wallet">
            <button
              type="button"
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              <a>지갑 연결</a>
            </button>
          </Link>
        )}
      </Wrapper>
    </div>
  );
};

export default CreateWallet;

export async function getServerSideProps(context) {
  const {
    data: { mnemonic },
  } = await axios.get(`https://wallet-ashen.vercel.app/api/create-mnemonic`);

  if (!mnemonic) {
    return {
      notFound: true,
    };
  }

  // console.log(data);

  return {
    props: { mnemonic }, // will be passed to the page component as props
  };
}
