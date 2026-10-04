
  import { createRoot } from "react-dom/client";
  import { FluentProvider, webLightTheme, Theme } from "@fluentui/react-components";
  import "@fontsource/inter/300.css";
  import "@fontsource/inter/400.css";
  import "@fontsource/inter/500.css";
  import "@fontsource/inter/600.css";
  import "@fontsource/inter/700.css";
  import "@fontsource/inter/800.css";
  import "@fontsource/inter/900.css";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const appTheme: Theme = {
    ...webLightTheme,
    fontFamilyBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyNumeric: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  createRoot(document.getElementById("root")!).render(
    <FluentProvider theme={appTheme} style={{ height: "100%" }}>
      <App />
    </FluentProvider>
  );
  