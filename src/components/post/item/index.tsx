import styled from "styled-components";
import { BoardLoadResponseType } from "../../../types/board/load/response";
import { useNavigate } from "react-router-dom";

interface PostItemProps {
  post: BoardLoadResponseType;
}

export const PostItem = ({ post }: PostItemProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => navigate(`/community/${post.boardId}`)}
      >
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
        <span>{`${post.writer ? `작성자 : ${post.writer} | ` : ""}${
          post.date
        }`}</span>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  width: 100%;

  button {
    width: 100%;
    height: 62px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;

    div {
      width: 100%;

      h3 {
        color: ${({ theme }) => theme.colors.background7};
        font-size: ${({ theme }) => theme.fontSizes.text};
      }

      p {
        margin-top: 4px;

        color: ${({ theme }) => theme.colors.background7};
        font-size: ${({ theme }) => theme.fontSizes.text};

        ${({ theme }) => theme.commons.ellipsis}
      }
    }

    span {
      color: ${({ theme }) => theme.colors.background5};
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
