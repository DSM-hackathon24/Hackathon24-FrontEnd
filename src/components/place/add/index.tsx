import styled from "styled-components";
import { ArrowImg, GoBackImg } from "../../../assets/images";
import { useEffect, useState } from "react";
import { PlaceRequestType } from "../../../types/place/request";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../../atoms/selectedState";
import {
  ClickLocationStateAtom,
  ClickLocationStateAtomType,
} from "../../../atoms/clickLocationState";
import { CollapseMenu } from "../../CollapseMenu";
export const PlaceAdd = () => {
  const clickLocationState = useRecoilValue<ClickLocationStateAtomType>(
    ClickLocationStateAtom
  );
  const setSelectedState =
    useSetRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const [inputState, setInputState] = useState<PlaceRequestType>({
    type: "지상식",
    available: undefined,
    year: undefined,
    x: undefined,
    y: undefined,
  });
  useEffect(
    () =>
      setInputState((prevState) => ({
        ...prevState,
        x: clickLocationState.x,
        y: clickLocationState.y,
      })),
    [clickLocationState]
  );
  return (
    <Wrapper>
      <button
        aria-label="뒤로가기"
        type="button"
        onClick={() => setSelectedState({ id: 0, x: 0, y: 0 })}
      >
        <picture>
          <source type="image/svg+xml" srcSet={GoBackImg} />
          <img alt="뒤로가기 화살표" width="14" height="14" />
        </picture>
      </button>
      <ul>
        <InputField empty={`${!inputState.x && !inputState.y}`}>
          <label htmlFor="location">소화전 위치</label>
          <input
            id="location"
            disabled
            type="text"
            placeholder="지도를 클릭하여 위치를 설정하세요."
            value={
              inputState.x && inputState.y
                ? `${inputState.x.toFixed(3)}..., ${inputState.y.toFixed(3)}...`
                : ""
            }
          />
        </InputField>
        <CollapseMenu />
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 90vw;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ${({ theme }) => theme.commons.boxShadow}

  margin-bottom: 32px;

  ul {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

interface InputFieldProps {
  empty: "true" | "false";
}

const InputField = styled.li<InputFieldProps>`
  width: 100%;

  display: flex;
  flex-direction: column;

  label,
  input {
    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  input {
    margin-top: 4px;
    padding-bottom: 4px;

    width: 100%;

    transition: border-bottom 0.25s ease;
    border-bottom: 1px solid
      ${(props) =>
        props.empty === "true"
          ? props.theme.colors.background4
          : props.theme.colors.background7};

    ::placeholder {
      color: ${({ theme }) => theme.colors.background4};
    }
  }
`;
