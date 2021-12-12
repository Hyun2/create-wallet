import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const CreateMnemonic = () => {
  return <div></div>;
};

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
      mnemonic,
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
      <div>{mnemonic}</div>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="패스워드"
      />

      <button disabled={!password}>
        <a onClick={handleClick}>Keystore 생성</a>
      </button>
      {clicked && (
        <Link href="/connect-wallet">
          <a>지갑 연결</a>
        </Link>
      )}
    </div>
  );
};

export default CreateWallet;

export async function getServerSideProps(context) {
  const mnemonicRes = await fetch(`http://localhost:3000/api/create-mnemonic`);
  const data = await mnemonicRes.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // console.log(data);

  return {
    props: { mnemonic: data.mnemonic }, // will be passed to the page component as props
  };
}
