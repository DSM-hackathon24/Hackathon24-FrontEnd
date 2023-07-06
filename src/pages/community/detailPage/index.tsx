import styled from "styled-components";
import { isHttpsUrl } from "../../../libs/constants/isHttpsUrl";
import { Link, useParams } from "react-router-dom";
import { CommentList } from "../../../components/comment/list";
import { useBoardQuery } from "../../../hooks/useBoard";
import { GoBackImg } from "../../../assets/images";

export const CommunityDetailPage = () => {
  const { id } = useParams();
  const boardQuery = useBoardQuery({ boardId: parseInt(id as string) });
  console.log(boardQuery.data);
  const hasData = boardQuery.data;
  const formattedContent =
    hasData &&
    boardQuery.data.content
      .split(/\n/)
      .map((v) => v.trim())
      .filter((v) => v);
  const isContentNotEmpty = formattedContent;
  return (
    <Wrapper>
      <Link to="/community">
        <picture>
          <source type="image/svg+xml" srcSet={GoBackImg} />
          <img alt="" width="14" height="14" />
        </picture>
      </Link>
      <article>
        <h1>{hasData && boardQuery.data.title}</h1>
        <div>
          <span>{`작성자 ${hasData && boardQuery.data.writer}`}</span>
          <span>{hasData && boardQuery.data.date}</span>
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

  > a {
    margin-bottom: 4px;

    width: 100%;
  }

  article {
    padding-bottom: 32px;

    width: 90vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    h1 {
      width: 90vw;

      color: ${({ theme }) => theme.colors.background7};
      font-size: ${({ theme }) => theme.fontSizes.title};
    }

    div {
      padding-bottom: 8px;

      width: 90vw;

      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid ${({ theme }) => theme.colors.background3};

      span {
        color: ${({ theme }) => theme.colors.background5};
        font-size: ${({ theme }) => theme.fontSizes.subText};
      }
    }

    p {
      width: 90vw;

      color: ${({ theme }) => theme.colors.background7};
      font-size: ${({ theme }) => theme.fontSizes.text};
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
