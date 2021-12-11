import { useState } from "react";

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

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const k = event.target.files[0];
      console.log(k);
      setKeystore(k);
      setCreateObjectURL(URL.createObjectURL(k));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", keystore);
    const response = await fetch("/api/connect-wallet", {
      method: "POST",
      body,
    });
  };

  return (
    <div>
      <input type="file" onChange={uploadToClient} />
      <button onClick={uploadToServer}>확인</button>
    </div>
  );
};

// const InputPassword = () => {
//   <div>
//     <input placeholder="패스워드" />
//   </div>;
// };

export default ConnectWallet;
