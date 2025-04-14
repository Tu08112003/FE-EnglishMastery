import Home from '../pages/Home.jsx';
import Dictionary from '../pages/Dictionary.jsx'; 
import Exame from '../pages/Exame.jsx';
import Note from '../pages/Note.jsx';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
// Public routes
const publicRoutes = [
  {
    path: '/', component: Home
  },
  {
    path: '/dictionary', component: Dictionary
  },
  {
    path: '/exame', component: Exame  
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
