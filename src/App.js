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
const AdminExchange = lazy(() => import("./pages/admin/Exchange"));
const Rates = lazy(() => import("./pages/admin/Rates"));
const Exchange = lazy(() => import("./pages/Exchange"));
const General = lazy(() => import("./pages/profile/General"));
const Password = lazy(() => import("./pages/profile/Password"));
const FAQ = lazy(() => import("./pages/Faq"));
const TermAndCondition = lazy(() => import("./pages/TermAndCondition"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Affiliate = lazy(() => import("./pages/Affiliate"));

const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const notifications = toastStore((state) => state.notifications);
  const { isLogin, user } = appStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));

  const next = (Component) =>
    isLogin ? Component : <Navigate replace to={routes.login} />;

  const adminNext = (Component) =>
    isLogin && String(user?.role).toLowerCase() === "admin" ? (
      Component
    ) : (
      <Navigate replace to={routes.home} />
    );

  return (
    <ToastProvider swipeDirection="right">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Routers />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.faq} element={<FAQ />} />
            <Route
              path={routes.terms_of_service}
              element={<TermAndCondition />}
            />
            <Route path={routes.privacy_policy} element={<PrivacyPolicy />} />
            <Route path={routes.affiliate} element={<Affiliate />} />

            <Route
              path={routes.exchange_details}
              element={next(<ExchangeDetails />)}
            />
            <Route path={routes.exchange} element={next(<Exchange />)} />
            <Route path={routes.profile} element={next(<General />)} />
            <Route path={routes.change_password} element={next(<Password />)} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.create_account} element={<CreateAccount />} />
            <Route path={routes.reset_password} element={<ResetPassword />} />
            <Route
              path={routes.admin.dashboard}
              element={adminNext(<Dashboard />)}
            />
            <Route
              path={routes.admin.exchange}
              element={adminNext(<AdminExchange />)}
            />
            <Route path={routes.admin.rates} element={adminNext(<Rates />)} />
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
