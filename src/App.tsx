import { rootRouter } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
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
