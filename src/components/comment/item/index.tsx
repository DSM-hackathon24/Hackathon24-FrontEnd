import { useState } from "react";
import { styled } from "styled-components";

export const CommentItem = () => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  return (
    <Wrapper>
      <figure>
        <img
          src="https://media.discordapp.net/attachments/1077850822341300244/1126062258326343780/Ellipse_34.png"
          alt="프로필 사진"
          width="36"
          height="36"
        />
      </figure>
      <div>
        <h2>
          백숙먹자했잖아<span>2023-07-05</span>
        </h2>
        <Phrase
          expanded={`${collapseState}`}
          onClick={() => setCollapseState(!collapseState)}
        >
          음식이 곧 약이고 약은 곧 음식이다,,,. 한사랑산악회#건강식품 #뉴틴 *본
          영상은 뉴틴의 유료 광고를 포함하고 있습니다.
        </Phrase>
        {!collapseState && <span>자세히 보기</span>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  width: 100%;

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
