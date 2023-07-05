import { useState } from "react";
import { styled } from "styled-components";
import { ArrowImg } from "../../assets/images";

interface SelectProps {
  id: string;
  options: string[];
}

export const Select = ({ id, options }: SelectProps) => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  const isOptionsNotEmpty = options.length > 1;
  return isOptionsNotEmpty ? (
    <Wrapper
      expanded={`${collapseState}`}
      onClick={() => setCollapseState(!collapseState)}
    >
      <div>
        <p>{options[0]}</p>
        <picture>
          <source type="image/svg+xml" srcSet={ArrowImg} />
          <img alt="" />
        </picture>
      </div>
      {collapseState && (
        <ul>
          {options.map((v, i) => (
            <li key={`${id}select${i}`}>{v}</li>
          ))}
        </ul>
      )}
    </Wrapper>
  ) : (
    <></>
  );
};

interface WrapperProps {
  expanded: "true" | "false";
}

const Wrapper = styled.div<WrapperProps>`
  div {
    background-color: ${({ theme }) => theme.colors.background3};

    padding: 2px 8px;

    width: 72px;

    display: flex;
    justify-content: space-between;

    border-radius: 4px;

    p {
      color: ${({ theme }) => theme.colors.background7};
      font-size: ${({ theme }) => theme.fontSizes.text};
    }

    picture {
      ${(props) =>
        props.expanded === "true"
          ? "transform: rotate(0deg);"
          : "transform: rotate(180deg);"}
    }
  }

  ul {
    background-color: ${({ theme }) => theme.colors.background3};

    padding: 2px 8px;

    width: 72px;

    display: flex;
    justify-content: space-between;

    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
