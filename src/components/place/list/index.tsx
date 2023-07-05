import styled from "styled-components";
import { useEffect } from "react";
import { SearchStateAtom } from "../../../atoms/searchState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../../atoms/selectedState";
import { PlaceStateAtom } from "../../../atoms/placeState";
import {
  ScrollStateAtom,
  ScrollStateAtomType,
} from "../../../atoms/scrollState";
import { PlaceResponseType } from "../../../types/place/response";

interface PlaceListProps {
  listRef: React.RefObject<HTMLUListElement>;
}

export const PlaceList = ({ listRef }: PlaceListProps) => {
  const placeState = useRecoilValue<PlaceResponseType[]>(PlaceStateAtom);
  const searchState = useRecoilValue<string>(SearchStateAtom);
  const setSelectedState =
    useSetRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const [scrollState, setScrollState] =
    useRecoilState<ScrollStateAtomType>(ScrollStateAtom);
  const isSearchStateSet = searchState !== "";
  useEffect(
    () =>
      scrollState.page === "place"
        ? listRef.current?.scroll(0, scrollState.position)
        : setScrollState({ page: "place", position: 0 }),
    []
  );
  return (
    <Wrapper
      ref={listRef}
      onScroll={(e: React.UIEvent<HTMLUListElement>) =>
        setScrollState({ page: "place", position: e.currentTarget.scrollTop })
      }
    >
      {isSearchStateSet
        ? [...placeState]
            .filter((v) => v.type.includes(searchState))
            .sort((a, b) => a.distance! - b.distance!)
            .map((v, i, o) => (
              <li key={`place${i}`}>
                <button
                  type="button"
                  aria-label="장소 상세보기"
                  onClick={() =>
                    setSelectedState({
                      id: v.id,
                      x: v.x,
                      y: v.y,
                    })
                  }
                >
                  <p>{`${v.type} 소화전`}</p>
                  <span>{`${v.distance?.toFixed(1)}km`}</span>
                </button>
                {i < o.length - 1 && <hr />}
              </li>
            ))
        : [...placeState]
            .sort((a, b) => (a.distance! > b.distance! ? 1 : -1))
            .map((v, i) => (
              <li key={`place${i}`}>
                <button
                  type="button"
                  aria-label="장소 상세보기"
                  onClick={() =>
                    setSelectedState({
                      id: v.id,
                      x: v.x,
                      y: v.y,
                    })
                  }
                >
                  <p>{`${v.type} 소화전`}</p>
                  <span>{`${v.distance?.toFixed(1)}km`}</span>
                </button>
                {i < placeState.length - 1 && <hr />}
              </li>
            ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 90vw;
  height: calc(100vh - 456px);

  overflow-y: scroll;

  ${({ theme }) => theme.commons.boxShadow}

  padding: 0px;

  li {
    width: 100%;

    button {
      padding: 16px;
      padding-top: 12px;
      padding-bottom: 12px;

      width: 100%;
      min-height: 32px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        color: ${({ theme }) => theme.colors.background7};
        font-size: ${({ theme }) => theme.fontSizes.text};
      }

      span {
        margin-left: 8px;

        text-align: end;

        color: ${({ theme }) => theme.colors.background4};
        font-size: ${({ theme }) => theme.fontSizes.description};
      }
    }

    hr {
      margin-left: 16px;
      margin-right: 16px;

      width: calc(100% - 32px);

      border: 1px solid ${({ theme }) => theme.colors.background2};
    }
  }
`;
