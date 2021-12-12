import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  // grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 15px;
  width: 80%;
  margin: 0 auto;
`;

const WordWrapper = styled.div`
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 30px;
`;

const Mnemonic = ({ mnemonic }) => {
  console.log(mnemonic);
  return (
    <div>
      <Title>Mnemonic</Title>
      <Container>
        {mnemonic.map((word, i) => {
          return (
            <div key={i}>
              <button
                type="button"
                className="w-8 h-8 text-base rounded-full text-white bg-red-500"
              >
                <span className="p-1">{i + 1}</span>
              </button>

              <span className="py-2 px-2">{word}</span>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Mnemonic;
