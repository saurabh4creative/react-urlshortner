import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import UrlShortner from './components/UrlShortner';

function App() {

  const router = createBrowserRouter([
      {
          path: "/",
          element: <Home />,
      },
      {
          path: "/:id",
          element: <UrlShortner />,
      },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
