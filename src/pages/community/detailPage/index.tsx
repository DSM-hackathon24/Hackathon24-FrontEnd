import styled from "styled-components";
import { dummyPosts } from "../../../libs/constants/dummyPosts";
import { isHttpsUrl } from "../../../libs/constants/isHttpsUrl";
import { useParams } from "react-router-dom";
import { PostLoadResponseType } from "../../../types/post";
import { CommentList } from "../../../components/comment/list";

export const CommunityDetailPage = () => {
  const { id } = useParams();
  const post = dummyPosts.filter(
    (v) => v.id === parseInt(id as string)
  )[0] as PostLoadResponseType;
  const formattedContent =
    post.content &&
    post.content
      .split(/\n/)
      .map((v) => v.trim())
      .filter((v) => v);
  const isContentNotEmpty = formattedContent;
  return (
    <Wrapper>
      <article>
        <h1>{post.title}</h1>
        <div>
          <span>{`작성자 ${post.writer}`}</span>
          <span>{post.writeDate}</span>
        </div>
        {isContentNotEmpty &&
          formattedContent.map((v, i) =>
            isHttpsUrl(v) ? (
              <figure key={`image${i}`}>
                <img src={v} alt="" />
              </figure>
            ) : (
              <p key={`paragraph${i}`}>{v}</p>
            )
          )}
      </article>
      <CommentList />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding-left: 5vw;
  padding-right: 5vw;
  margin-top: 16px;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;

  article {
    padding-bottom: 32px;

    width: 90vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    h1 {
      width: 90vw;
    }

    div {
      padding-bottom: 8px;

      width: 90vw;

      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid ${({ theme }) => theme.colors.background3};
    }

    p {
      width: 90vw;

      font-weight: 600;
    }

    figure {
      display: flex;
      justify-content: center;
    }

    img {
      max-width: 90vw;
      max-height: 240px;
    }
  }
`;
