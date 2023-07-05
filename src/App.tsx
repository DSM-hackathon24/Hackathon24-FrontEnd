import { useEffect } from "react";
import { rootRouter } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  useEffect(() => {
    const getAccToken = (accToken: string) => {
      const ele = document.createElement("p");
      const txt = document.createTextNode(accToken);
      ele.appendChild(txt);
      document.getElementById("root")?.appendChild(ele);
    };
    const globalThis = (window || global) as any;
    globalThis.getAccessToken = getAccToken;
  }, []);

  return (
    <>
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
