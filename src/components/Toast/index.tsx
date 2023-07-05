import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { ToastStateAtom, ToastStateAtomType } from "../../atoms/toastState";
import { useEffect, useRef } from "react";

interface ToastProps {
  time: number;
}

export const Toast = ({ time }: ToastProps) => {
  const [toastState, setToastState] =
    useRecoilState<ToastStateAtomType>(ToastStateAtom);
  const isToastAnimationPlaying = toastState.animateState;
  const toastIdRef = useRef<number>(toastState.toastId);
  useEffect(() => {
    setTimeout(() => {
      if (toastIdRef.current === toastState.toastId) {
        setToastState((prevState) => ({ ...prevState, animateState: true }));
      }
    }, time);
  }, []);
  useEffect(() => {
    if (isToastAnimationPlaying && toastIdRef.current === toastState.toastId)
      setTimeout(() => {
        setToastState((prevState) => ({
          ...prevState,
          showState: !prevState.showState,
          animateState: false,
        }));
      }, 275);
  }, [toastState.animateState]);
  return (
    <Wrapper
      time={time}
      show={`${toastState.showState}`}
      animate={`${toastState.animateState}`}
    >
      <strong />
      <p>{toastState.message}</p>
    </Wrapper>
  );
};

interface WrapperProps {
  time: number;
  show: "true" | "false";
  animate: "true" | "false";
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  left: 5vw;
  top: 16px;

  width: 90vw;
  height: 48px;

  display: flex;
  justify-items: center;
  align-items: center;

  z-index: 4;

  ${({ theme }) => theme.commons.boxShadow}
  background-color: ${({ theme }) => theme.colors.main};
  margin: 0;
  padding: 0;

  @keyframes moveDown {
    from {
      top: 16px;
    }
    to {
      top: -56px;
    }
  }

  @keyframes moveUp {
    from {
      top: -56px;
    }
    to {
      top: 16px;
    }
  }

  ${(props) =>
    props.show === "false" &&
    (props.animate === "true" ? "animation: moveUp 0.3s ease;" : "top: -56px;")}
  ${(props) =>
    props.show === "true" &&
    props.animate === "true" &&
    "animation: moveDown 0.3s ease;"}

  p {
    margin-left: 16px;

    color: ${({ theme }) => theme.colors.background1};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  strong {
    position: absolute;
    bottom: 0;
    left: 2px;

    background-color: ${({ theme }) => theme.colors.background1};

    width: 0;
    height: 3px;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    @keyframes shrink {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    animation: shrink ${(props) => `${props.time / 1000}s`} linear;
  }
`;
