import { styled } from "styled-components";
import { ArrowImg } from "../../assets/images";
import { useState } from "react";

interface CollapseMenu {
  children: JSX.Element | JSX.Element[];
}

export const CollapseMenu = ({ children }: CollapseMenu) => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  return (
    <Wrapper>
      <Button
        aria-label="메뉴 열기"
        type="button"
        onClick={() => setCollapseState(!collapseState)}
        expanded={`${collapseState}`}
      >
        상세 정보 입력
        <picture>
          <source type="image/svg+xml" srcSet={ArrowImg} />
          <img alt="" />
        </picture>
      </Button>
      <List expanded={`${collapseState}`}>{children}</List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface CollapseProps {
  expanded: "true" | "false";
}

const Button = styled.button<CollapseProps>`
  display: flex;
  align-items: center;
  gap: 4px;

  -webkit-tap-highlight-color: transparent;

  picture {
    transition: transform 0.25s ease;

    ${(props) =>
      props.expanded === "true"
        ? "transform: rotate(180deg);"
        : "transform: rotate(90deg);"}
  }
`;

const List = styled.ul<CollapseProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  transition: height 0.25s ease, opacity 0.25s ease;

  ${(props) =>
    props.expanded === "true"
      ? "height: 100%; opacity:1;"
      : "height: 0%; opacity:0;"}

  li {
    width: 100%;

    display: flex;
    gap: 8px;

    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;
