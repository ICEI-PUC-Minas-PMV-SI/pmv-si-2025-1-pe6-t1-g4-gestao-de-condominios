import { Refine, Authenticated, ErrorComponent } from "@refinedev/core";
import type { IResourceItem } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { RefineThemes, ThemedTitleV2, AuthPage } from "@refinedev/mui";

import { authProvider } from "./authProvider";
import defaultProvider from "./providers/default";
import { Layout } from "./components/layout";

import {
  NoticeManagementsCreate,
  NoticeManagementsEdit,
  NoticeManagementsList,
  NoticeManagementsShow,
} from "./pages/noticeManagements";
import { ApartmentList, ApartmentCreate, ApartmentEdit, ApartmentShow } from "./pages/apartments";
import { UserList, UserCreate, UserEdit, UserShow } from "./pages/users";

import { FeeList, FeeCreate, FeeEdit, FeeShow } from "./pages/fees";
import {
  PaymentList,
  PaymentCreate,
  PaymentEdit,
  PaymentShow,
} from "./pages/payments";

export const resources: IResourceItem[] = [
  {
    name: "apartments",
    list: ApartmentList,
    create: ApartmentCreate,
    edit: ApartmentEdit,
    show: ApartmentShow,
  },
  {
    name: "notice-managements", // Adicionando o recurso para "notices"

    create: NoticeManagementsCreate, // Mesmo componente usado para "create" e "edit"
    edit: NoticeManagementsEdit,
    list: NoticeManagementsList,
    show: NoticeManagementsShow,
  },
  {
    name: "users",
    list: UserList,
    create: UserCreate,
    edit: UserEdit,
    show: UserShow,
  },
  {
    name: "fees",
    list: FeeList,
    create: FeeCreate,
    edit: FeeEdit,
    show: FeeShow,
  },
  {
    name: "payments",
    list: PaymentList,
    create: PaymentCreate,
    edit: PaymentEdit,
    show: PaymentShow,
  },
];

export default function App(): JSX.Element {
  const resourceRoutes = resources.flatMap((resource) => {
    const routes: JSX.Element[] = [];

    if (resource.list && typeof resource.list === "function") {
      routes.push(
        <Route
          key={`${resource.name}-list`}
          path={`/${resource.name}`}
          element={<resource.list />}
        />
      );
    }

    if (resource.create && typeof resource.create === "function") {
      routes.push(
        <Route
          key={`${resource.name}-create`}
          path={`/${resource.name}/create`}
          element={<resource.create />}
        />
      );
    }

    if (resource.edit && typeof resource.edit === "function") {
      routes.push(
        <Route
          key={`${resource.name}-edit`}
          path={`/${resource.name}/edit/:id`}
          element={<resource.edit />}
        />
      );
    }

    if (resource.show && typeof resource.show === "function") {
      routes.push(
        <Route
          key={`${resource.name}-show`}
          path={`/${resource.name}/show/:id`}
          element={<resource.show />}
        />
      );
    }

    return routes;
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />

        <Refine
          routerProvider={routerProvider}
          authProvider={authProvider}
          dataProvider={{ default: defaultProvider }}
          resources={resources}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
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
                path="/login"
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
                  <Layout>
                    <Outlet />
                  </Layout>
                </Authenticated>
              }
            >
              <Route index element={<Navigate to="/apartments" />} />
              {resourceRoutes} {/* Aqui adicionamos as rotas dos recursos */}
            </Route>

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
