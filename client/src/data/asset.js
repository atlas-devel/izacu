import {
  FaHome,
  FaTags,
  FaUserFriends,
  FaFilm,
  FaComments,
} from "react-icons/fa";

export const links = [
  {
    name: "Home",
    path: "/admin/dashboard",
    icon: FaHome,
  },
  {
    name: "Genres",
    path: "/admin/genres",
    icon: FaTags,
  },
  {
    name: "Translators",
    path: "/admin/translators",
    icon: FaUserFriends,
  },
  {
    name: "Movies",
    path: "/admin/movies",
    icon: FaFilm,
  },
  {
    name: "Comments",
    path: "/admin/comments",
    icon: FaComments,
  },
];
