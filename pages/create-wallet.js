import React, { useEffect, useState } from "react";

const CreateWallet = ({ name }) => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <input value={password} onChange={handleChange} placeholder="패스워드" />
      {/* <button onClick={handleClick}>Keystore 생성</button> */}
      <button disabled={password === "" ? true : false}>
        <a href="/api/create-keystore">Keystore 생성</a>
      </button>
    </div>
  );
};

export default CreateWallet;

// export async function getServerSideProps(context) {
//   const res = await fetch(`http://localhost:3000/api/create-keystore`);
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   console.log(data);

//   return {
//     props: { name: data.name }, // will be passed to the page component as props
//   };
// }
