# 니모닉 지갑 개발

![](https://blog.kakaocdn.net/dn/cRcBrR/btrnGHYLVRQ/OsvhpobnN39AFWJqRjtAGK/img.gif)

데모 애플리케이션: [https://wallet-ashen.vercel.app/](https://wallet-ashen.vercel.app/)

니모닉(Mnemonic)과 패스워드를 이용해서 지갑의 Keystore를 만들고, 생성된 Keystore를 이용해서 지갑을 연결시켜 보자.

## 니모닉 코드

지갑을 복구하기 위해 필요한 12개 또는 24개의 단어 조합이다. 니모닉 코드는 해시 함수를 재귀적으로 반복하는 키 스트레칭 과정을 거쳐 마스터 시드를 생성하고, 그 마스터 시드는 HD지갑 동작의 바탕이 된다.

니모닉 코드와 패스워드를 이용해 마스터 시드를 만들었다. 마스터 시드가 포함된 포함된 키스토어는 아래와 같은 형태를 갖는다.

![](https://imgur.com/B8KWKQn.jpg)

`eth-lightwallet` 패키지의 `keystore.generateRandomSeed()`를 이용해 니모닉을 만들고 `keystore.createVault()`를 이용해 키스토어 파일을 만들었다.

프론트에서는 `web3.js`를 이용해서 키스토어 파일을 읽어들여 지갑을 연결시키는 작업을 하였다.

## 회고

`eth-lightwallet`과 `web3.js`등 DApp 개발과 관련된 기본적인 라이브러리를 한 번 사용해보는 경험을 할 수 있어서 좋았다.

추후에 지갑의 기본적인 기능(송금 등)을 추가하는 등의 개선작업을 하면서 지갑의 원리, 프론트화면에 그리는 방법 등에 대한 이해를 높이기 위해 노력해야 겠다.
