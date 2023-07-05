import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { App } from "./App";
import theme from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const rootNode = document.getElementById("root");
if (!rootNode) throw new Error("Root Node Not Found");
const root = ReactDOM.createRoot(rootNode);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
