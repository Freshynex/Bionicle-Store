import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Error from "../Error";
import Welcome from "./Welcome";
import Shop from "./Shop";
import { useState } from "react";

function Router() {
  const [images, setImages] = useState({
    welcome: [
      {
        src: "https://static.wikia.nocookie.net/bionicle/images/7/7c/Voyanui.JPG",
      },
    ],
    shop: [],
    navbar: [
      {
        src: "https://e7.pngegg.com/pngimages/176/700/png-clipart-bionicle-the-game-the-lego-group-mask-mask-video-game-gold.png",
      },
    ],
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App images={images.navbar} />,
      children: [
        {
          index: true,
          element: <Welcome images={images.welcome} />,
        },
        { path: "/shop/:category", element: <Shop /> },
      ],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
