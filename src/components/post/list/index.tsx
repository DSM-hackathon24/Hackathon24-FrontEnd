import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ScrollStateAtom,
  ScrollStateAtomType,
} from "../../../atoms/scrollState";
import { SearchStateAtom } from "../../../atoms/searchState";
import { PostItem } from "../item";
import { useBoardListQuery } from "../../../hooks/useBoardList";
import { CategoryStateAtom } from "../../../atoms/categoryState";

interface CommunityPagePostListProps {
  listRef: React.RefObject<HTMLUListElement>;
}

export const CommunityPagePostList = ({
  listRef,
}: CommunityPagePostListProps) => {
  const categoryState = useRecoilValue<string>(CategoryStateAtom);
  const boardListQuery = useBoardListQuery({
    category: categoryState === "전체" ? undefined : categoryState,
  });
  const searchState = useRecoilValue<string>(SearchStateAtom);
  const [scrollState, setScrollState] =
    useRecoilState<ScrollStateAtomType>(ScrollStateAtom);
  const hasData = boardListQuery.data && boardListQuery.data.length > 0;
  useEffect(
    () =>
      scrollState.page === "community"
        ? listRef.current?.scroll(0, scrollState.position)
        : setScrollState({ page: "community", position: 0 }),
    []
  );
  useEffect(() => {
    console.log(categoryState);
  }, [categoryState]);
  return (
    <Wrapper
      ref={listRef}
      onScroll={(e: React.UIEvent<HTMLUListElement>) =>
        setScrollState({ page: "", position: e.currentTarget.scrollTop })
      }
    >
      {hasData &&
        [...boardListQuery.data]
          .filter((v) => v.title.includes(searchState))
          .map((v) => <PostItem key={`post${v.boardId}`} post={v} />)}
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
