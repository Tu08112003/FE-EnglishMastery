import Home from '../pages/Home.jsx';
import Dictionary from '../pages/Dictionary.jsx'; 
import Test from '../pages/Test.jsx';
import Note from '../pages/Note.jsx';
// Public routes
const publicRoutes = [
  {
    path: '/', component: Home
  },
  {
    path: '/dictionary', component: Dictionary
  },
  {
    path: '/test', component: Test  
  },
  {
    path: '/note', component: Note
  }
  
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
