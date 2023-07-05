import styled from "styled-components";
import { GoBackImg } from "../../../assets/images";
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
import { Select } from "../../Select";
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
      <Confirm>소화전 추가</Confirm>
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
        <SelectField>
          <p>소화전 구분</p>
          <Select
            id="type"
            options={["지상식", "지하식", "옥내"]}
            value={inputState.type}
            setValue={(newType: string) =>
              setInputState((prevState) => ({ ...prevState, type: newType }))
            }
          />
        </SelectField>
        <CollapseMenu>
          <SelectField>
            <p>사용 가능 여부</p>
            <Select
              id="available"
              options={["모름", "가능", "불가"]}
              value={
                inputState.available
                  ? "가능"
                  : inputState.available === false
                  ? "불가"
                  : "모름"
              }
              setValue={(newAvailable: string) =>
                setInputState((prevState) => ({
                  ...prevState,
                  available:
                    newAvailable === "가능"
                      ? true
                      : newAvailable === "불가"
                      ? false
                      : undefined,
                }))
              }
            />
          </SelectField>
          <InputField
            empty={`${
              inputState.year === undefined ||
              inputState.year.toString().length === 0
            }`}
          >
            <label htmlFor="year">설치 연도</label>
            <input
              id="year"
              type="number"
              placeholder="설치 연도를 입력해주세요. (ex. 2005)"
              min="1900"
              max={`${new Date().getFullYear()}`}
              maxLength={4}
              value={inputState.year === undefined ? "" : inputState.year}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9.]/g,
                  ""
                );
                e.currentTarget.value = e.currentTarget.value.replace(
                  /(\..*)\./g,
                  "$1"
                );
                e.currentTarget.value = e.currentTarget.value.slice(
                  0,
                  e.currentTarget.maxLength
                );
              }}
              onChange={(e) => {
                if (e.currentTarget.value.length === 4) {
                  if (
                    parseInt(e.currentTarget.value) <
                    parseInt(e.currentTarget.min)
                  ) {
                    e.currentTarget.value = e.currentTarget.min;
                  }
                  if (
                    parseInt(e.currentTarget.value) >
                    parseInt(e.currentTarget.max)
                  ) {
                    e.currentTarget.value = e.currentTarget.max;
                  }
                }
                const data = e.currentTarget.valueAsNumber;
                if (
                  (data.toString().length > 1 && !isNaN(data)) ||
                  data.toString().length <= 4
                ) {
                  setInputState((prevState) => ({
                    ...prevState,
                    year: data,
                  }));
                }
              }}
            />
          </InputField>
        </CollapseMenu>
      </ul>
    </Wrapper>
  );
};

const Confirm = styled.button`
  position: fixed;
  left: 5vw;
  bottom: 5vw;

  background-color: ${({ theme }) => theme.colors.main};

  width: 90vw;
  height: 48px;

  color: ${({ theme }) => theme.colors.background1};
  font-size: ${({ theme }) => theme.fontSizes.subTitle};
  font-weight: 600;
  text-align: center;

  border-radius: 10px;
  z-index: 4;
`;

const Wrapper = styled.article`
  position: relative;

  width: 90vw;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ${({ theme }) => theme.commons.boxShadow}

  margin-bottom: 86px;

  > ul {
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

const SelectField = styled.li`
  width: 100%;

  display: flex;
  gap: 8px;

  > p {
    transform: translateY(2px);

    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;
