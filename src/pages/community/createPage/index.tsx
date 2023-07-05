import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { CategoryStateAtom } from "../../../atoms/categoryState";
import { useEffect, useState } from "react";
import { Select } from "../../../components/Select";
import { BoardCreateRequestType } from "../../../types/board/create/request";
import { useNavigate } from "react-router-dom";
import { ToastStateAtom, ToastStateAtomType } from "../../../atoms/toastState";
import { useBoardMutation } from "../../../hooks/useBoardMutation";

export const CommunityCreatePage = () => {
  const boardMutation = useBoardMutation();
  const setCategoryState = useSetRecoilState<string>(CategoryStateAtom);
  const setToastState = useSetRecoilState<ToastStateAtomType>(ToastStateAtom);
  const [inputState, setInputState] = useState<BoardCreateRequestType>({
    title: "",
    category: "안전팁",
    content: "",
    images: [],
  });
  const [warningState, setWarningState] = useState<string>("");
  const navigate = useNavigate();
  const validateForm = () => {
    if (inputState.title === "") {
      setWarningState("title");
      return false;
    } else setWarningState("");
    if (inputState.content === "") {
      setWarningState("content");
      return false;
    } else setWarningState("");
    return true;
  };
  useEffect(() => {
    setCategoryState("전체");
  }, []);
  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            try {
              boardMutation.mutate(inputState);
              setToastState({
                animateState: true,
                showState: false,
                message: "성공적으로 게시글이 등록되었습니다.",
                toastId: new Date().getTime(),
              });
            } catch (err) {
              setToastState({
                animateState: true,
                showState: false,
                message: "알 수 없는 오류가 발생하였습니다.",
                toastId: new Date().getTime(),
              });
            } finally {
              navigate("/community");
            }
          }
        }}
      >
        <Confirm type="submit">게시글 등록</Confirm>
        <div>
          <label htmlFor="boardTitle">
            게시글 제목
            {warningState === "title" && <span>필수 입력란입니다.</span>}
          </label>
          <input
            id="boardTitle"
            type="text"
            placeholder="제목을 입력하세요."
            value={inputState.title}
            onChange={(e) => {
              const data = e.currentTarget.value;
              if (data !== null)
                setInputState((prevState) => ({
                  ...prevState,
                  title: data,
                }));
            }}
          />
        </div>
        <div id="row">
          <p>게시글 카테고리</p>
          <Select
            id="boardCategory"
            options={["안전팁", "안전툴", "잡담"]}
            value={inputState.category}
            setValue={(newCategory) =>
              setInputState((prevState) => ({
                ...prevState,
                category: newCategory,
              }))
            }
          />
        </div>
        <div>
          <p>
            게시글 내용
            {warningState === "content" && <span>필수 입력란입니다.</span>}
          </p>
          <textarea
            placeholder="내용을 입력하세요."
            value={inputState.content}
            onChange={(e) => {
              const data = e.currentTarget.value;
              if (data !== null)
                setInputState((prevState) => ({
                  ...prevState,
                  content: data,
                }));
            }}
          />
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding-left: 5vw;
  padding-right: 5vw;
  margin-top: 16px;

  width: 100vw;
  height: calc(100vh - 16px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  overflow-y: auto;

  form {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;

    > div {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 8px;

      label,
      p {
        color: ${({ theme }) => theme.colors.background7};
        font-size: ${({ theme }) => theme.fontSizes.text};

        span {
          margin-left: 4px;

          color: ${({ theme }) => theme.colors.main};
          font-size: ${({ theme }) => theme.fontSizes.description};
        }
      }
    }

    #row {
      flex-direction: row;
    }
  }

  input {
    padding: 4px 0;

    width: 100%;

    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};

    border-bottom: 1px solid ${({ theme }) => theme.colors.background4};

    ::placeholder {
      color: ${({ theme }) => theme.colors.background4};
      font-size: ${({ theme }) => theme.fontSizes.text};
    }
  }

  textarea {
    background-color: transparent;

    width: 100%;
    height: calc(100vh - 217px - 5vw);

    color: ${({ theme }) => theme.colors.background7};
    font-size: ${({ theme }) => theme.fontSizes.text};

    border: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.background4};
    }
  }
`;

const Confirm = styled.button`
  position: fixed;
  left: 5vw;
  bottom: 5vw;

  background-color: ${({ theme }) => theme.colors.main};

  width: 90vw;
  height: 48px;

  color: ${({ theme }) => theme.colors.background1};
  font-size: ${({ theme }) => theme.fontSizes.subTitle};
  font-weight: 600;
  text-align: center;

  border-radius: 10px;
  z-index: 4;
`;
