import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import routes from "./common/routes";
import appStore from "./store/appStore";
import Notification, { ToastProvider, ToastViewport } from "./components/Toast";
import toastStore from "./store/toastStore";
import { Spinner } from "./components/spinner/Spinner";

// Common
const Home = lazy(() => import("./pages/Home"));
const ExchangeDetails = lazy(() => import("./pages/ExchangeDetails"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Exchange = lazy(() => import("./pages/admin/Exchange"));
const Rates = lazy(() => import("./pages/admin/Rates"));

const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const notifications = toastStore((state) => state.notifications);
  const isLogin = appStore((state) => state.isLogin);

  const next = (Component) =>
    isLogin ? Component : <Navigate replace to={routes.login} />;

  return (
    <ToastProvider swipeDirection="right">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Routers />}>
            <Route path={routes.home} element={<Home />} />
            <Route
              path={routes.exchange_details}
              element={next(<ExchangeDetails />)}
            />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.create_account} element={<CreateAccount />} />
            <Route path={routes.reset_password} element={<ResetPassword />} />
            <Route
              path={routes.admin.dashboard}
              element={next(<Dashboard />)}
            />
            <Route path={routes.admin.exchange} element={next(<Exchange />)} />
            <Route path={routes.admin.rates} element={next(<Rates />)} />
            <Route path={routes.notFound} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Notification */}
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

function Routers() {
  return (
    <Suspense
      fallback={
        <div className="h-[1100%] min-h-[40vh] flex w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}
