import Home from '../pages/Home';
import Dictionary from '../pages/Dictionary'; 
import Exam from '../pages/Exam';
import Note from '../pages/Note';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword'
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
      { path: '/', component: Home },
      { path: '/dictionary', component: Dictionary },
      { path: '/exam', component: Exam },
      { path: '/exam/take', component: TakeTheExam },
      { path: '/exam/result', component: ExamResult },
      { path: '/note', component: Note },
      { path: '/login', component: Login },
      { path: '/signup', component: SignUp },
      {path: '/forgotpassword', component: ForgotPassword},
      { path: '/account-info', component: AccountInformation },
    ]
  },
  {
    layout: AdminLayout,
    children: [
      { path: '/admin', component: Dashboard },
      { path: '/admin/exam', component: ManageExam },
      { path: '/admin/user', component: ManageUser },
      { path: '/admin/payment', component: ManagePayment }
    ]
  }
];

export default routes;
