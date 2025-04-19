import { Refine, Authenticated, ErrorComponent } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import {
  RefineThemes,
  AuthPage,
  ThemedTitleV2,
} from "@refinedev/mui";
import { authProvider } from "./authProvider";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine authProvider={authProvider} routerProvider={routerProvider}>
          <Routes>
            <Route
              element={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Authenticated fallback={<Outlet />}>
                  <Navigate to="/" />
                </Authenticated>
              }
            >
              <Route
                path="login"
                element={
                  <AuthPage
                    type="login"
                    title={
                      <ThemedTitleV2
                        collapsed={false}
                        text="Gestão de Condomínios"
                      />
                    }
                  />
                }
              />
            </Route>
            <Route
              element={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Authenticated redirectOnFail="/login">
                  <Outlet />
                </Authenticated>
              }
            >
              <Route index element={<h1>login ok</h1>} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
