import Home from "../pages/Home";
import Dictionary from "../pages/Dictionary";
import Exam from "../pages/Exam";
import Note from "../pages/Note";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import TakeTheExam from "../components/Exam/TakeTheExam";
import SubmitExamResult from "../components/Exam/SubmitExamResult";
import AccountInformation from "../components/AccountInformation";
import HistoryExamResult from "../components/Exam/HistoryExamResult";
import AdminLayout from "../layout/AdminLayout";
import PublicLayout from "../layout/PublicLayout";

import Dashboard from "../pages/Admin/Dashboard";
import ManageExam from "../pages/Admin/ManageExam";
import ManageUser from "../pages/Admin/ManageUser";
import ManagePayment from "../pages/Admin/ManagePayment";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const routes = [
  {
    layout: PublicLayout,
    children: [
      { path: "/", component: <Home />, protected: false },
      {
        path: "/dictionary",
        component: (
          <PrivateRoute>
            <Dictionary />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/exam",
        component: (
          <PrivateRoute>
            <Exam />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/exam/take/:idTest",
        component: (
          <PrivateRoute>
            <TakeTheExam />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/exam/result",
        component: (
          <PrivateRoute>
            <SubmitExamResult />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "exam/result/:idTest",
        component: (
          <PrivateRoute>
            <HistoryExamResult />
          </PrivateRoute>
        ),
      },
      {
        path: "/note",
        component: (
          <PrivateRoute>
            <Note />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/login",
        component: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
        protected: false,
      },
      {
        path: "/register",
        component: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
        protected: false,
      },
      {
        path: "/forgotpassword",
        component: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
        protected: false,
      },
      {
        path: "/account-info",
        component: (
          <PrivateRoute>
            <AccountInformation />
          </PrivateRoute>
        ),
        protected: true,
      },
    ],
  },
  {
    layout: AdminLayout,
    children: [
      {
        path: "/admin",
        component: (
          <PrivateRoute requiredRole="ADMIN">
            <Dashboard />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/admin/exam",
        component: (
          <PrivateRoute requiredRole="ADMIN">
            <ManageExam />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/admin/user",
        component: (
          <PrivateRoute requiredRole="ADMIN">
            <ManageUser />
          </PrivateRoute>
        ),
        protected: true,
      },
      {
        path: "/admin/payment",
        component: (
          <PrivateRoute requiredRole="ADMIN">
            <ManagePayment />
          </PrivateRoute>
        ),
        protected: true,
      },
    ],
  },
];

export default routes;