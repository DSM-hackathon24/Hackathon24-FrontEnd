import styled from "styled-components";

interface CategoryItemProps {
  active: boolean;
  category: string;
  onClick: () => void;
}

export const CategoryItem = ({
  active,
  category,
  onClick,
}: CategoryItemProps) => {
  return (
    <Wrapper className={active ? "active" : undefined}>
      <button type="button" onClick={onClick}>
        {category}
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.background5};
  border-radius: 100px;
  transition: background-color 0.25s ease, color 0.25s ease;

  button {
    padding: 8px;
    padding-top: 4px;
    padding-bottom: 4px;

    width: 100%;
    height: 25px;

    color: ${({ theme }) => theme.colors.background5};
    font-size: ${({ theme }) => theme.fontSizes.subText};
    font-weight: 400;
  }
`;
