// File: src/routes.js
import Home from '../pages/Home';
import Dictionary from '../pages/Dictionary';
import Exam from '../pages/Exam';
import Note from '../pages/Note';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import TakeTheExam from '../components/Exam/TakeTheExam';
import ExamResult from '../components/Exam/ExamResult';
import AccountInformation from '../components/AccountInformation';

import AdminLayout from '../layout/AdminLayout';
import PublicLayout from '../layout/PublicLayout';

import Dashboard from '../pages/Admin/Dashboard';
import ManageExam from '../pages/Admin/ManageExam';
import ManageUser from '../pages/Admin/ManageUser';
import ManagePayment from '../pages/Admin/ManagePayment';

const routes = [
  {
    layout: PublicLayout,
    children: [
      { path: '/', component: <Home />, protected: false },
      { path: '/dictionary', component: <Dictionary />, protected: true },
      { path: '/exam', component: <Exam />, protected: true },
      { path: '/exam/take', component: <TakeTheExam />, protected: true },
      { path: '/exam/result', component: <ExamResult />, protected: true },
      { path: '/note', component: <Note />, protected: true },
      { path: '/login', component: <Login />, protected: false },
      { path: '/signup', component: <SignUp />, protected: false },
      { path: '/forgotpassword', component: <ForgotPassword />, protected: false },
      { path: '/account-info', component: <AccountInformation />, protected: true },
    ],
  },
  {
    layout: AdminLayout,
    children: [
      { path: '/admin', component: <Dashboard />, protected: false },
      { path: '/admin/exam', component: <ManageExam />, protected: false },
      { path: '/admin/user', component: <ManageUser />, protected: false },
      { path: '/admin/payment', component: <ManagePayment />, protected: false },
    ],
  },
];

export default routes;