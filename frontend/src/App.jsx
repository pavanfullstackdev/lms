import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import { RouterProvider } from "react-router";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // children: [
    //   //hero secrion
    //   //courses
    // ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      // Add more child routes here
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
