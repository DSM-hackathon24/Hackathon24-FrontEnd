import { useRecoilValue } from "recoil";
import { rootRouter } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastStateAtom, ToastStateAtomType } from "./atoms/toastState";
import { Toast } from "./components/Toast";

export const App = () => {
  const toastState = useRecoilValue<ToastStateAtomType>(ToastStateAtom);
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
