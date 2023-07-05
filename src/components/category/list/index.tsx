import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { dummyCategories } from "../../../libs/constants/dummyCategories";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CategoryStateAtomType } from "../../../atoms/categoryState";
import { CategoryStateAtom } from "../../../atoms/categoryState";
import {
  ScrollStateAtom,
  ScrollStateAtomType,
} from "../../../atoms/scrollState";
import { CategoryItem } from "../item";

interface CategoryListProps {
  listRef: React.RefObject<HTMLUListElement>;
}

export const CategoryList = ({ listRef }: CategoryListProps) => {
  const setScrollState =
    useSetRecoilState<ScrollStateAtomType>(ScrollStateAtom);
  const [categoryState, setCategoryState] =
    useRecoilState<CategoryStateAtomType>(CategoryStateAtom);
  const [scrollable, setScrollable] = useState<boolean>(false);
  const categoryRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (categoryRef.current)
      setScrollable(
        categoryRef.current.scrollWidth > categoryRef.current.clientWidth
      );
  }, [categoryRef]);
  return (
    <Wrapper ref={categoryRef} scrollable={`${scrollable}`}>
      {dummyCategories.map((v, i) => (
        <CategoryItem
          key={`category${i}`}
          category={v}
          active={v === categoryState.category}
          onClick={() => {
            if (v !== categoryState.category) {
              setCategoryState((prevState) => {
                return { ...prevState, category: v };
              });
              if (listRef.current) listRef.current.scrollTop = 0;
              setScrollState((prevState) => ({ ...prevState, position: 0 }));
            }
          }}
        />
      ))}
    </Wrapper>
  );
};

interface WrapperProps {
  scrollable: "true" | "false";
}

const Wrapper = styled.ul<WrapperProps>`
  ${(props) => props.scrollable === "true" && "padding-bottom: 8px;"}

  width: 90vw;

  display: flex;
  gap: 8px;

  white-space: nowrap;

  overflow-x: auto;

  .active {
    background-color: ${({ theme }) => theme.colors.main};

    border: 1px solid ${({ theme }) => theme.colors.main};

    button {
      color: ${({ theme }) => theme.colors.background1};
    }
  }
`;
