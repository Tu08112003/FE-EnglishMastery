import Home from '../pages/Home.jsx';
import Dictionary from '../pages/Dictionary.jsx'; 
import Exam from '../pages/Exam.jsx';
import Note from '../pages/Note.jsx';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import TakeTheExam from '../components/Exam/TakeTheExam.jsx';
import ExamResult from '../components/Exam/ExamResult.jsx';
// Public routes
const publicRoutes = [
  {
    path: '/', component: Home
  },
  {
    path: '/dictionary', component: Dictionary
  },
  {
    path: '/exam', component: Exam,  
  },
  { 
    path: '/exam/take', component: TakeTheExam
  }, 
  {
    path: '/exam/result', component: ExamResult
  },
  {
    path: '/note', component: Note
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/signup', component: SignUp
  }
  
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
