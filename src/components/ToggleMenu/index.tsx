import { styled } from "styled-components";
import { CreateImg } from "../../assets/images";
import { useEffect, useState } from "react";

interface ToggleMenuProps {
  children: JSX.Element | JSX.Element[];
}

export const ToggleMenu = ({ children }: ToggleMenuProps) => {
  const [toggleState, setToggleState] = useState<boolean>(false);
  const [toggleViewState, setToggleViewState] = useState<boolean>(false);
  const isToggleAnimationPlaying = toggleViewState;
  const isToggleAnimationPaused = !toggleViewState;
  useEffect(() => {
    if (isToggleAnimationPlaying)
      setTimeout(() => {
        setToggleState(!toggleState);
        setToggleViewState(false);
      }, 275);
  }, [toggleViewState]);
  return (
    <div>
      {(toggleViewState || toggleState) && (
        <List visible={`${toggleState}`} animation={`${toggleViewState}`}>
          {children}
        </List>
      )}
      <Button
        aria-label="메뉴 열기"
        type="button"
        onClick={() => {
          if (isToggleAnimationPaused) setToggleViewState(true);
        }}
        visible={`${toggleState}`}
        animation={`${toggleViewState}`}
      >
        <picture>
          <source type="image/svg+xml" srcSet={CreateImg} />
          <img alt="" width="20" height="20" />
        </picture>
      </Button>
    </div>
  );
};

interface ToggleStateProps {
  visible: "true" | "false";
  animation: "true" | "false";
}

const Button = styled.button<ToggleStateProps>`
  position: fixed;
  bottom: 16px;
  right: 16px;

  width: 48px;
  height: 48px;

  outline: none;
  z-index: 3;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => theme.commons.boxShadow}
  margin: 0;
  padding: 14px;

  border-radius: 50%;

  @keyframes spinRight {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(90deg);
    }
  }

  @keyframes spinLeft {
    from {
      transform: rotate(90deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  ${(props) =>
    props.visible === "false" && props.animation === "true"
      ? "animation: spinRight 0.3s ease;"
      : "transform: rotate(90deg);"}
  ${(props) =>
    props.visible === "true" &&
    props.animation === "true" &&
    "animation: spinLeft 0.3s ease;"}
`;

const List = styled.ul<ToggleStateProps>`
  position: absolute;
  bottom: 16px;
  right: 16px;

  width: 48px;
  height: 0;

  display: flex;
  justify-content: center;

  opacity: 0;
  z-index: 2;

  ${({ theme }) => theme.commons.boxShadow}
  margin: 0;
  margin-bottom: 24px;
  padding: 0;
  padding-top: 12px;
  padding-bottom: 32px;

  border-radius: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  li {
    width: 32px;

    display: flex;
    justify-content: center;

    figure {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      figcaption {
        width: 100%;

        color: ${({ theme }) => theme.colors.background4};
        font-size: ${({ theme }) => theme.fontSizes.description};
        text-align: center;
      }
    }
  }

  @keyframes openToggleMenu {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: 104px;
      opacity: 1;
    }
  }

  @keyframes closeToggleMenu {
    from {
      height: 104px;
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }

  ${(props) =>
    props.visible === "false" &&
    props.animation === "true" &&
    "animation: openToggleMenu 0.25s ease;"}
  ${(props) =>
    props.visible === "true" && props.animation === "true"
      ? "animation: closeToggleMenu 0.25s ease;"
      : `height: 104px;
      opacity: 1;`}
`;
