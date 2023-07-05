import styled from "styled-components";
import { SearchImg } from "../../assets/images";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SearchStateAtom } from "../../atoms/searchState";
import { ScrollStateAtom, ScrollStateAtomType } from "../../atoms/scrollState";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../atoms/selectedState";

interface SearchInputProps {
  listRef: React.RefObject<HTMLUListElement>;
}

export const SearchInput = ({ listRef }: SearchInputProps) => {
  const setScrollState =
    useSetRecoilState<ScrollStateAtomType>(ScrollStateAtom);
  const setSelectedState =
    useSetRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const [searchState, setSearchState] = useRecoilState<string>(SearchStateAtom);
  const [inputState, setInputState] = useState<string>(searchState);
  return (
    <Wrapper
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (listRef.current) listRef.current.scrollTop = 0;
        setSelectedState({ id: 0, x: 0, y: 0 });
        setScrollState((prevState) => ({ ...prevState, position: 0 }));
        setSearchState(inputState);
      }}
    >
      <input
        placeholder="검색어를 입력해주세요."
        value={inputState}
        onChange={(e) => setInputState(e.currentTarget.value)}
      />
      <button type="submit">
        <picture>
          <source type="image/svg+xml" srcSet={SearchImg} />
          <img alt="돋보기" width="16" height="16" />
        </picture>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 90vw;
  min-height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.commons.boxShadow}

  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;

  input {
    width: calc(100% - 24px);

    color: ${({ theme }) => theme.colors.background6};
    font-size: ${({ theme }) => theme.fontSizes.subText};
    font-weight: 400;

    outline: none;
  }

  input ::placeholder {
    color: ${({ theme }) => theme.colors.background5};
  }
`;
