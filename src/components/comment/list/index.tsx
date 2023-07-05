import { styled } from "styled-components";
import { CommentItem } from "../item";

export const CommentList = () => {
  return (
    <Wrapper>
      <li>
        <figure>
          <img
            src="https://media.discordapp.net/attachments/1077850822341300244/1126061361932275712/Ellipse_33.png"
            alt="프로필 사진"
            width="36"
            height="36"
          />
        </figure>
        <input type="text" placeholder="댓글을 입력하세요." />
      </li>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    margin-top: 8px;

    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  > li:first-of-type {
    margin-top: 0;

    width: 100%;

    input {
      padding: 4px 0;

      width: 100%;

      color: ${({ theme }) => theme.colors.background7};
      font-size: ${({ theme }) => theme.fontSizes.text};

      border-bottom: 1px solid ${({ theme }) => theme.colors.background4};

      ::placeholder {
        color: ${({ theme }) => theme.colors.background4};
      }
    }
  }
`;
