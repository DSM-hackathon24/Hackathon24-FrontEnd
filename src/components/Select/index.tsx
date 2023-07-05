import { styled } from "styled-components";

interface SelectProps {
  id: string;
  options: string[];
}

export const Select = ({ id, options }: SelectProps) => {
  const isOptionsNotEmpty = options.length > 1;
  return isOptionsNotEmpty ? (
    <Wrapper>
      <p>{options[0]}</p><picture><source /><img/></picture>
      <ul>
        {options.map((v, i) => (
          <li key={`${id}select${i}`}>{v}</li>
        ))}
      </ul>
    </Wrapper>
  ) : (
    <></>
  );
};

const Wrapper = styled.div`
  p {
    background-color: ${({ theme }) => theme.colors.background3};

    padding: 2px 8px;

    border-radius: 4px;
  }
`;
