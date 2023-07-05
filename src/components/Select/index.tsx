import { useState } from "react";
import { styled } from "styled-components";
import { ArrowImg } from "../../assets/images";

interface SelectProps {
  id: string;
  options: string[];
  value?: string;
  setValue: (str: string) => void;
}

export const Select = ({ id, options, value, setValue }: SelectProps) => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  const isOptionsNotEmpty = options.length > 1;
  return isOptionsNotEmpty ? (
    <Wrapper
      expanded={`${collapseState}`}
      onClick={() => setCollapseState(!collapseState)}
    >
      <div>
        <p>{value || options[0]}</p>
        <picture>
          <source type="image/svg+xml" srcSet={ArrowImg} />
          <img alt="" />
        </picture>
      </div>
      {collapseState && (
        <ul>
          {options.map((v, i) => (
            <li key={`${id}select${i}`}>
              <button type="button" onClick={() => setValue(v)}>
                {v}
              </button>
            </li>
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
    background-color: ${({ theme }) => theme.colors.background2};

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
    width: 72px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    ${({ theme }) => theme.commons.boxShadow}
    background-color: ${({ theme }) => theme.colors.background2};

    margin: 0;
    padding: 0;
    padding: 8px 0;

    border-radius: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    li {
      width: 100%;

      button {
        width: 100%;

        text-align: center;
      }
    }
  }
`;
