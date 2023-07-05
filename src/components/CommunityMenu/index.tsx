import styled from "styled-components";
import { useRef } from "react";
import { SearchInput } from "../SearchInput";
import { CategoryList } from "../category/list";
import { CommunityPagePostList } from "../post/list";

export const CommunityPageMenu = () => {
  const listRef = useRef<HTMLUListElement>(null);
  return (
    <Wrapper>
      <SearchInput listRef={listRef} />
      <CategoryList listRef={listRef} />
      <CommunityPagePostList listRef={listRef} />
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
