import styled from "styled-components";
import { useEffect } from "react";
import { dummyPosts } from "../../../libs/constants/dummyPosts";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ScrollStateAtom,
  ScrollStateAtomType,
} from "../../../atoms/scrollState";
import { SearchStateAtom } from "../../../atoms/searchState";
import {
  CategoryStateAtom,
  CategoryStateAtomType,
} from "../../../atoms/categoryState";
import { PostItem } from "../item";

interface CommunityPagePostListProps {
  listRef: React.RefObject<HTMLUListElement>;
}

export const CommunityPagePostList = ({
  listRef,
}: CommunityPagePostListProps) => {
  const categoryState =
    useRecoilValue<CategoryStateAtomType>(CategoryStateAtom);
  const searchState = useRecoilValue<string>(SearchStateAtom);
  const [scrollState, setScrollState] =
    useRecoilState<ScrollStateAtomType>(ScrollStateAtom);
  useEffect(
    () =>
      scrollState.page === "community"
        ? listRef.current?.scroll(0, scrollState.position)
        : setScrollState({ page: "community", position: 0 }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Wrapper
      ref={listRef}
      onScroll={(e: React.UIEvent<HTMLUListElement>) =>
        setScrollState({ page: "", position: e.currentTarget.scrollTop })
      }
    >
      {dummyPosts
        .filter(
          (v) =>
            v.title.includes(searchState) &&
            (categoryState.category === "전체" ||
              v.category === categoryState.category)
        )
        .map((v) => (
          <PostItem key={`post${v.id}`} post={v} />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  margin-top: 8px;
  margin-bottom: 16px;

  width: 90vw;
  height: calc(100vh - 183px);

  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow-y: auto;
`;
