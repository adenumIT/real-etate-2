import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import Profile from "./routes/profilePage/profilePage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/list", element: <ListPage />, loader: listPageLoader },
        { path: "/:id", element: <SinglePage />, loader: singlePageLoader },

        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        { path: "/profile", element: <Profile />, loader: profilePageLoader },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        { path: "/add", element: <NewPostPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
