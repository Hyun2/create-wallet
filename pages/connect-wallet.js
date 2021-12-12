import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.development";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import axios from "axios";

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
      data: { address },
    } = await axios.post("/api/connect-wallet", body);

    if (address) {
      setWalletAddress(address);
    }
  };

  return (
    <div>
      <input type="file" onChange={uploadToClient} />
      <button onClick={uploadToServer}>확인</button>
      {walletAddress && <p>{walletAddress}</p>}
    </div>
  );
};

// const InputPassword = () => {
//   <div>
//     <input placeholder="패스워드" />
//   </div>;
// };

export default ConnectWallet;
