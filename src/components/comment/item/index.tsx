import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { CommentLoadResponseType } from "../../../types/comment/load/response";

interface CommentItemProps {
  comment: CommentLoadResponseType;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  const [isExpendable, setIsExpendable] = useState<boolean>(false);
  const phraseRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (phraseRef.current)
      setIsExpendable(
        phraseRef.current.scrollWidth > phraseRef.current.clientWidth
      );
  }, [phraseRef.current]);
  return (
    <Wrapper>
      <h2>
        {comment.writer}
        <span>{comment.date}</span>
      </h2>
      <Phrase
        ref={phraseRef}
        expanded={`${collapseState}`}
        onClick={() => setCollapseState(!collapseState)}
      >
        {comment.comment}
      </Phrase>
      {isExpendable && !collapseState && <span>자세히 보기</span>}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  width: 100%;

  display: flex;
  flex-direction: column;

  h2 {
    display: flex;
    align-items: flex-end;
    gap: 4px;

    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 400;
  }

  span {
    color: ${({ theme }) => theme.colors.background4};
    font-size: ${({ theme }) => theme.fontSizes.description};
  }
`;

interface PhraseProps {
  expanded: "true" | "false";
}

const Phrase = styled.p<PhraseProps>`
  color: ${({ theme }) => theme.colors.background7};
  font-size: ${({ theme }) => theme.fontSizes.text};

  ${(props) => props.expanded === "false" && props.theme.commons.ellipsis}
  width: calc(90vw - 44px);
`;
