import { styled } from "styled-components";
import { ArrowImg } from "../../assets/images";
import { useEffect, useState } from "react";

interface CollapseMenu {
  children: JSX.Element | JSX.Element[];
}

export const CollapseMenu = ({ children }: CollapseMenu) => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  const [collapseViewState, setCollapseViewState] = useState<boolean>(false);
  const isToggleAnimationPlaying = collapseViewState;
  const isToggleAnimationPaused = !collapseViewState;
  useEffect(() => {
    if (isToggleAnimationPlaying)
      setTimeout(() => {
        setCollapseState(!collapseState);
        setCollapseViewState(false);
      }, 275);
  }, [collapseViewState]);
  return (
    <div>
      <Button
        aria-label="메뉴 열기"
        type="button"
        onClick={() => {
          if (isToggleAnimationPaused) setCollapseViewState(true);
        }}
        visible={`${collapseState}`}
        animation={`${collapseViewState}`}
      >
        상세 정보 입력
        <picture>
          <source type="image/svg+xml" srcSet={ArrowImg} />
          <img alt="" />
        </picture>
      </Button>
      <List visible={`${collapseState}`} animation={`${collapseViewState}`}>
        {children}
      </List>
    </div>
  );
};

interface CollapseProps {
  visible: "true" | "false";
  animation: "true" | "false";
}

const Button = styled.button<CollapseProps>`
  display: flex;
  align-items: center;
  gap: 4px;

  -webkit-tap-highlight-color: transparent;

  picture {
    transform: rotate(90deg);

    @keyframes turnLeft {
      from {
        transform: rotate(90deg);
      }
      to {
        transform: rotate(180deg);
      }
    }

    @keyframes turnRight {
      from {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(90deg);
      }
    }

    ${(props) =>
      props.visible === "false" && props.animation === "true"
        ? "animation: turnLeft 0.3s ease;"
        : "transform: rotate(90deg);"}
    ${(props) =>
      props.visible === "true" &&
      (props.animation === "true"
        ? "animation: turnRight 0.3s ease;"
        : "transform: rotate(180deg);")}
  }
`;

const List = styled.ul<CollapseProps>`
  li {
    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  @keyframes openCollapseMenu {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: 87px;
      opacity: 1;
    }
  }

  @keyframes closeCollapseMenu {
    from {
      height: 87px;
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }

  ${(props) =>
    props.visible === "false" &&
    (props.animation === "true"
      ? "animation: openCollapseMenu 0.3s ease;"
      : "height:0; opacity:0;")}
  ${(props) =>
    props.visible === "true" &&
    props.animation === "true" &&
    "animation: closeCollapseMenu 0.3s ease;"}
`;
