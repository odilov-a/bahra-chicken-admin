import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const Blogs = lazy(() => import("pages/blogs"));
const Categoryies = lazy(() => import("pages/category"));
const Achievements = lazy(() => import("pages/achievements"));
const Comments = lazy(() => import("pages/comments"));
const Brands = lazy(() => import("pages/brands"));
const Products = lazy(() => import("pages/products"));
const Orders = lazy(() => import("pages/orders"));
const Gallery = lazy(() => import("pages/gallery"));
const Vacancy = lazy(() => import("pages/vacancies"));
const Video = lazy(() => import("pages/videos"));
const User = lazy(() => import("pages/admin"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));
// const Login = lazy(() => import("pages/login"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    access: ["admin", "user"],
    title: "Welcome",
    element: <Default />,
  },
  {
    path: "/profile",
    access: ["admin"],
    title: "Profile",
    element: <User />,
  },
  {
    path: "/blogs",
    access: ["admin"],
    title: "Bloglar",
    element: <Blogs />,
  },
  {
    path: "/categories",
    access: ["admin"],
    title: "Kategoriyalar",
    element: <Categoryies />,
  },
  {
    path: "/products",
    access: ["admin"],
    title: "Mahsulotlar",
    element: <Products />,
  },
  {
    path: "/comments",
    access: ["admin"],
    title: "Komentariyalar",
    element: <Comments />,
  },
  {
    path: "/orders",
    access: ["admin"],
    title: "Buyurtmalar",
    element: <Orders />,
  },
  {
    path: "/achievements",
    access: ["admin"],
    title: "Yutuqlar",
    element: <Achievements />,
  },
  {
    path: "/brands",
    access: ["admin"],
    title: "Brendlar",
    element: <Brands />,
  },
  {
    path: "/galleries",
    access: ["admin"],
    title: "Galereyalar",
    element: <Gallery />,
  },
  {
    path: "/vacancies",
    access: ["admin"],
    title: "Vakansiyalar",
    element: <Vacancy />,
  },
  {
    path: "/video",
    access: ["admin"],
    title: "Videolar",
    element: <Video />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "Translations",
    element: <LocalizationPanel />,
  },
  {
    path: "*",
    access: ["admin"],
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
