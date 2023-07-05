import styled from "styled-components";
import { PostLoadResponseType } from "../../../types/post";

interface PostItemProps {
  post: PostLoadResponseType;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <Wrapper>
      <button
        type="button"
        onClick={() =>
          (window as any).webkit.messageHandlers.navigate.postMessage(post.id)
        }
      >
        <div>
          <h3>{post.title}</h3>
          <p>{post.preview}</p>
        </div>
        <span>{`${post.writer ? `작성자 : ${post.writer} | ` : ""}${
          post.writeDate
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
