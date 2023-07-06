import styled from "styled-components";
import { GoBackImg } from "../../../assets/images";
import { useEffect, useState } from "react";
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
import { mapCreate } from "../../../libs/apis/map/create";
import { ToastStateAtom, ToastStateAtomType } from "../../../atoms/toastState";

export const PlaceAdd = () => {
  const clickLocationState = useRecoilValue<ClickLocationStateAtomType>(
    ClickLocationStateAtom
  );
  const setToastState = useSetRecoilState<ToastStateAtomType>(ToastStateAtom);
  const setSelectedState =
    useSetRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const [inputState, setInputState] = useState<MapCreateRequestType>({
    latitude: undefined,
    longitude: undefined,
    availability: undefined,
    sortation: "지상식",
    installation: undefined,
  });
  const [warningState, setWarningState] = useState<string>("");
  const validateForm = () => {
    if (
      inputState.latitude === undefined ||
      inputState.longitude === undefined
    ) {
      setWarningState("location");
      return false;
    } else setWarningState("");
    return true;
  };
  useEffect(
    () =>
      setInputState((prevState) => ({
        ...prevState,
        latitude: clickLocationState.x,
        longitude: clickLocationState.y,
      })),
    [clickLocationState]
  );
  return (
    <Wrapper
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
          mapCreate(inputState);
          setSelectedState({ id: 0, x: 0, y: 0 });
          setToastState({
            animateState: true,
            showState: false,
            message: "등록된 장소는 앱 재시작 후 표시됩니다.",
            toastId: new Date().getTime(),
          });
        }
      }}
    >
      <Confirm type="submit">소화전 추가</Confirm>
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
        <InputField empty={`${!inputState.latitude && !inputState.longitude}`}>
          <label htmlFor="location">
            소화전 위치
            {warningState === "location" && <span>필수 입력란입니다.</span>}
          </label>
          <input
            id="location"
            disabled
            type="text"
            placeholder="지도를 클릭하여 위치를 설정하세요."
            value={
              inputState.latitude && inputState.longitude
                ? `${inputState.latitude.toFixed(
                    3
                  )}..., ${inputState.longitude.toFixed(3)}...`
                : ""
            }
          />
        </InputField>
        <SelectField>
          <p>
            소화전 구분
            {warningState === "sortation" && <span>필수 입력란입니다.</span>}
          </p>
          <Select
            id="type"
            options={["지상식", "지하식", "옥내"]}
            value={inputState.sortation}
            setValue={(newType: string) =>
              setInputState((prevState) => ({
                ...prevState,
                sortation: newType,
              }))
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
                inputState.availability
                  ? "가능"
                  : inputState.availability === false
                  ? "불가"
                  : "모름"
              }
              setValue={(newAvailable: string) =>
                setInputState((prevState) => ({
                  ...prevState,
                  availability:
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
              inputState.installation === undefined ||
              inputState.installation.toString().length === 0
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
              value={
                inputState.installation === undefined
                  ? ""
                  : inputState.installation
              }
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
                    installation: `${data}`,
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

const Wrapper = styled.form`
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

  label {
    span {
      margin-left: 4px;

      color: ${({ theme }) => theme.colors.main};
      font-size: ${({ theme }) => theme.fontSizes.description};
    }
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

    span {
      margin-left: 4px;

      color: ${({ theme }) => theme.colors.main};
      font-size: ${({ theme }) => theme.fontSizes.description};
    }
  }
`;
