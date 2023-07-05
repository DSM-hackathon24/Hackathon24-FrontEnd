import styled from "styled-components";
import { CheckImg, GoBackImg, UserImg } from "../../../assets/images";
import { useRecoilState } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../../atoms/selectedState";
import { useState } from "react";
import { useMapQuery } from "../../../hooks/useMap";

export const PlaceDetail = () => {
  const [selectedState, setSelectedState] =
    useRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const mapQuery = useMapQuery({ mapId: selectedState.id });
  const hasData = mapQuery.data;
  const isFoundByAdmin = hasData && !mapQuery.data.writer;
  const [toggleState, setToggleState] = useState<{ x: boolean; y: boolean }>({
    x: false,
    y: false,
  });
  return (
    <Wrapper>
      <h1>
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => setSelectedState({ id: 0, x: 0, y: 0 })}
        >
          <picture>
            <source type="image/svg+xml" srcSet={GoBackImg} />
            <img alt="뒤로가기 화살표" width="14" height="14" />
          </picture>
        </button>
        <div>
          <p>
            <figure>
              <picture>
                <source
                  type="image/svg+xml"
                  srcSet={isFoundByAdmin ? CheckImg : UserImg}
                />
                <img alt="" />
              </picture>
            </figure>
            {hasData &&
              (isFoundByAdmin
                ? `검증됨`
                : `${mapQuery.data.writer}에 의해 추가됨`)}
          </p>
          <span>{undefined || "2023-07-05"}</span>
        </div>
      </h1>
      <ul>
        <li>
          <p>소화전 구분</p>
          <b />
          <p>{hasData && mapQuery.data.sortation}</p>
        </li>
        <li>
          <p>사용 가능 여부</p>
          <b />
          <p>
            {hasData &&
              (mapQuery.data.availability === true
                ? "가능"
                : mapQuery.data.availability === false
                ? "불가"
                : "정보가 없습니다.")}
          </p>
        </li>
        <li>
          <p>설치 연도</p>
          <b />
          <p>
            {hasData && mapQuery.data.installation
              ? `${mapQuery.data.installation}년`
              : "정보가 없습니다."}
          </p>
        </li>
        <li
          onClick={() =>
            setToggleState((prevState) => ({ ...prevState, x: !prevState.x }))
          }
        >
          <p>위도</p>
          <b />
          <p>
            {hasData &&
              (toggleState.x
                ? mapQuery.data.latitude
                : `${Math.floor(mapQuery.data.latitude * 1000) / 1000}...`)}
          </p>
          {!toggleState.x && <span>(클릭하여 더 보기)</span>}
        </li>
        <li
          onClick={() =>
            setToggleState((prevState) => ({ ...prevState, y: !prevState.y }))
          }
        >
          <p>경도</p>
          <b />
          <p>
            {hasData &&
              (toggleState.y
                ? mapQuery.data.longitude
                : `${Math.floor(mapQuery.data.longitude * 1000) / 1000}...`)}
          </p>
          {!toggleState.y && <span>(클릭하여 더 보기)</span>}
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 90vw;

  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ theme }) => theme.commons.boxShadow}

  margin-bottom: 32px;

  h1 {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      font-weight: 400;

      p {
        display: flex;
        gap: 8px;

        color: ${({ theme }) => theme.colors.background7};
        font-size: ${({ theme }) => theme.fontSizes.text};
      }

      span {
        color: ${({ theme }) => theme.colors.background4};
        font-size: ${({ theme }) => theme.fontSizes.description};
      }
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      align-items: center;
      gap: 8px;

      p:first-of-type {
        width: 94.22px;
      }

      b {
        height: calc(100% - 4px);

        border-right: 1px solid ${({ theme }) => theme.colors.background7};
      }

      span {
        color: ${({ theme }) => theme.colors.background4};
        font-size: ${({ theme }) => theme.fontSizes.description};
      }
    }
  }
`;
