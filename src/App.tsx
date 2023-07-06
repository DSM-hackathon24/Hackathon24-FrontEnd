import { useRecoilValue } from "recoil";
import { rootRouter } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastStateAtom, ToastStateAtomType } from "./atoms/toastState";
import { Toast } from "./components/Toast";
import { useEffect } from "react";
import { getCookie } from "./libs/constants/cookie";

export const App = () => {
  const toastState = useRecoilValue<ToastStateAtomType>(ToastStateAtom);
  useEffect(() => {
    const ele = document.createElement("p");
    const txtNode = document.createTextNode(getCookie("accToken"));
    ele.appendChild(txtNode);
    const element = document.getElementById("title");
    element?.appendChild(ele);
  }, []);
  return (
    <>
      {(toastState.showState || toastState.animateState) && (
        <Toast time={3000} />
      )}
      <BrowserRouter>
        <Routes>
          {rootRouter.map((v) => (
            <Route key={v.path} path={v.path} element={v.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};
