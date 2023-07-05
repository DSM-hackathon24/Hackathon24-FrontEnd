import { useEffect } from "react";
import { rootRouter } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCookie } from "./libs/constants/cookie";

export const App = () => {
  useEffect(() => {
    const getAccToken = () => {
      const ele = document.createElement("p");
      if (getCookie("accToken")) {
        const txt = document.createTextNode(getCookie("accToken"));
        ele.appendChild(txt);
        document.getElementById("root")!.appendChild(ele);
      } else {
        const txt = document.createTextNode("이런! 쿠키를 찾을 수 없어요 ㅠㅠ");
        ele.appendChild(txt);
        document.getElementById("root")!.appendChild(ele);
      }
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
