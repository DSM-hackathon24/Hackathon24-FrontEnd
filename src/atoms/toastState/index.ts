import { atom } from "recoil";

export interface ToastStateAtomType {
  toastId: number;
  showState: boolean;
  animateState: boolean;
  message: string;
}

export const ToastStateAtom = atom<ToastStateAtomType>({
  key: "toastState",
  default: { toastId: 0, showState: false, animateState: false, message: "" },
});
