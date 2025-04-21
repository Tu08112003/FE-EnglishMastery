import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import '../src/plugins/font-awesome.js';


function App() {
  return (
    <Routes>
      {routes.map((group, i) => {
        const Layout = group.layout;

        return group.children.map((route, j) => {
          const Page = route.component;

          return (
            <Route
              key={`${i}-${j}`}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        });
      })}
    </Routes>
  );
}

export default App;
