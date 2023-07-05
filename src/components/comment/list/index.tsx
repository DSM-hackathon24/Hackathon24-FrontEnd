import { styled } from "styled-components";
import { CommentItem } from "../item";
import { useEffect, useRef, useState } from "react";
import { useCommentQuery } from "../../../hooks/useCommentList";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ToastStateAtom, ToastStateAtomType } from "../../../atoms/toastState";
import { useCommentMutation } from "../../../hooks/useCommentMutation";

export const CommentList = () => {
  const { id } = useParams();
  const commentQuery = useCommentQuery({ boardId: parseInt(id as string) });
  const commentMutation = useCommentMutation({
    boardId: parseInt(id as string),
  });
  const setToastState = useSetRecoilState<ToastStateAtomType>(ToastStateAtom);
  const [inputState, setInputState] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasData = commentQuery.data && commentQuery.data.length > 0;
  const resizeTextarea = (element: HTMLTextAreaElement) => {
    element.style.height = "0";
    element.style.height = element.scrollHeight + "px";
  };
  useEffect(() => {
    if (textareaRef.current) resizeTextarea(textareaRef.current);
  }, [textareaRef.current]);
  return (
    <Wrapper>
      <InputField empty={`${inputState === ""}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputState.length > 0) {
              try {
                commentMutation.mutate(inputState);
                setInputState("");
              } catch (err) {
                setToastState({
                  animateState: true,
                  showState: false,
                  message: "알 수 없는 오류가 발생하였습니다.",
                  toastId: new Date().getTime(),
                });
              }
            }
          }}
        >
          <textarea
            ref={textareaRef}
            placeholder="댓글을 입력하세요."
            value={inputState}
            onChange={(e) => {
              setInputState(e.currentTarget.value);
              resizeTextarea(e.currentTarget);
            }}
          />
          {inputState.length > 0 && (
            <div>
              <button type="reset" id="reset" onClick={() => setInputState("")}>
                취소
              </button>
              <button type="submit" id="submit">
                등록
              </button>
            </div>
          )}
        </form>
      </InputField>
      {hasData &&
        [...commentQuery.data].map((v) => (
          <CommentItem key={`comment${v.commentId}`} comment={v} />
        ))}
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
`;

interface InputFieldProps {
  empty: "true" | "false";
}

const InputField = styled.li<InputFieldProps>`
  margin-top: 0;

  width: 100%;

  form {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;

    textarea {
      background-color: transparent;

      padding: 4px 0;

      width: 100%;

      color: ${({ theme }) => theme.colors.background7};
      font-size: ${({ theme }) => theme.fontSizes.text};

      transition: border-bottom 0.25s ease;
      resize: none;
      border: none;
      outline: none;
      border-bottom: 1px solid
        ${(props) =>
          props.empty === "true"
            ? props.theme.colors.background4
            : props.theme.colors.background7};

      ::placeholder {
        color: ${({ theme }) => theme.colors.background4};
      }
    }

    div {
      display: flex;
      gap: 16px;

      #reset {
        color: ${({ theme }) => theme.colors.background7};
        font-size: ${({ theme }) => theme.fontSizes.text};
      }
      #submit {
        color: ${({ theme }) => theme.colors.main};
        font-size: ${({ theme }) => theme.fontSizes.text};
      }
    }
  }
`;
