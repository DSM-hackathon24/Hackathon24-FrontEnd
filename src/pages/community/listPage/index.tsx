import styled from "styled-components";
import { CommunityPageMenu } from "../../../components/CommunityMenu";

export const CommunityPage = () => {
  return (
    <Wrapper>
      <h1>심심 탈출 넘버원</h1>
      <CommunityPageMenu />
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
  gap: 8px;

  h1 {
    width: 90vw;

    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.title};
  }
`;
