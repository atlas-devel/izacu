import { IoMdCompass } from "react-icons/io";
import { BsBoxArrowInUp } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiPlayList2Fill } from "react-icons/ri";
import person from "./images/slide4.jpg";
import { IoWifi } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

import barbieLandscape from "./images/barbie_landscape.webp";
import interstellar from "./images/interstellar_landscap.webp";
import johnWick from "./images/john wick_landscape.webp";
import openheimer from "./images/oppenheimer_landscape.webp";
import megan from "./images/megan_landscape.jpg";
import avatar from "./images/avatar_landscape.webp";

export const sidebarIcons = [
  { id: 1, name: "browse", Icon: IoMdCompass },
  { id: 2, name: "Movies", Icon: GoDeviceCameraVideo },
  { id: 3, name: "Tv Shows", Icon: BsBoxArrowInUp },
];

// Importing icons from react-icons
import {
  FaRobot,
  FaHeart,
  FaFistRaised,
  FaTheaterMasks,
  FaGhost,
  FaLaughSquint,
  FaMask,
  FaDragon,
  FaGlobeAmericas,
  FaFilm,
} from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { GiBattleGear } from "react-icons/gi";
import { BiMoviePlay } from "react-icons/bi";

export const typeOfMovies = [
  { id: 1, name: "Sci-Fi", Icon: FaRobot },
  { id: 2, name: "Romance", Icon: FaHeart },
  { id: 3, name: "Action", Icon: FaFistRaised },
  { id: 4, name: "Drama", Icon: FaTheaterMasks },
  { id: 5, name: "Thriller", Icon: FaMask },
  { id: 6, name: "Comedy", Icon: FaLaughSquint },
  { id: 7, name: "Horror", Icon: FaGhost },
  { id: 8, name: "Mystery", Icon: MdMovieFilter },
  { id: 9, name: "Fantasy", Icon: FaDragon },
  { id: 10, name: "Adventure", Icon: FaGlobeAmericas },
  { id: 11, name: "Animation", Icon: BiMoviePlay },
  { id: 12, name: "Documentary", Icon: FaFilm },
  { id: 13, name: "War", Icon: GiBattleGear },
];

export const footerQuickLinks = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Movies", url: "/movies" },
  { id: 3, label: "Genres", url: "/genres" },
  { id: 4, label: "Top Rated", url: "/top-rated" },
  { id: 5, label: "Coming Soon", url: "/coming-soon" },
];

export const footerInfoLinks = [
  { id: 1, label: "About Us", url: "/about" },
  { id: 2, label: "Contact", url: "/contact" },
  { id: 3, label: "Privacy Policy", url: "/privacy" },
  { id: 4, label: "Terms of Service", url: "/terms" },
  { id: 5, label: "Facebook", url: "https://facebook.com" },
  { id: 6, label: "Instagram", url: "https://instagram.com" },
  { id: 7, label: "Twitter", url: "https://twitter.com" },
  { id: 8, label: "YouTube", url: "https://youtube.com" },
];

export const movies = [
  {
    _id: 1025,
    image: avatarMovie,
    name: "Avatar",
    otherName: "The Way of the Water",
    releaseYear: 2022,
    views: 182000,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "Jake Sully and Neytiri form a family and must protect their home when an ancient threat resurfaces on Pandora.",
    user: {
      imageProfile: profile,
      username: "Leon",
      isVerified: true,
    },
  },
  {
    _id: 1026,
    image: avatarMovie,
    name: "Avatar",
    otherName: "The Way of the Water",
    releaseYear: 2022,
    views: 182000,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "Jake Sully and Neytiri form a family and must protect their home when an ancient threat resurfaces on Pandora.",
    user: {
      imageProfile: profile,
      username: "Leon",
      isVerified: true,
    },
  },
  {
    _id: 1027,
    image: avatarMovie,
    name: "Avatar",
    otherName: "The Way of the Water",
    releaseYear: 2022,
    views: 182000,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "Jake Sully and Neytiri form a family and must protect their home when an ancient threat resurfaces on Pandora.",
    user: {
      imageProfile: profile,
      username: "Leon",
      isVerified: true,
    },
  },
  {
    _id: 1028,
    image: avatarMovie,
    name: "Avatar",
    otherName: "The Way of the Water",
    releaseYear: 2022,
    views: 182000,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "Jake Sully and Neytiri form a family and must protect their home when an ancient threat resurfaces on Pandora.",
    user: {
      imageProfile: profile,
      username: "Leon",
      isVerified: true,
    },
  },
  {
    _id: 1029,
    image: avatarMovie,
    name: "Avatar",
    otherName: "The Way of the Water",
    releaseYear: 2022,
    views: 182000,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "Jake Sully and Neytiri form a family and must protect their home when an ancient threat resurfaces on Pandora.",
    user: {
      imageProfile: profile,
      username: "Leon",
      isVerified: true,
    },
  },
  // ...repeat same structure up to _id: 1039
];



export const heroMovieBanner = [
  {
    _id: 1,
    image: openheimer,
    name: "Oppenheimer",
    description:
      "The story of J. Robert Oppenheimer, the theoretical physicist who led the Manhattan Project to develop the first atomic bomb during World War II.",
    releaseYear: 2023,
  },
  {
    _id: 2,
    id: 1,
    image: johnWick,
    name: "John Wick: Chapter 4",
    description:
      "Legendary hitman John Wick uncovers a path to defeating the High Table, but must face powerful enemies across the globe before he can earn his freedom.",
    releaseYear: 2023,
  },
  {
    _id: 3,
    image: megan,
    name: "M3GAN",
    description:
      "A robotics engineer creates a life-like doll programmed to protect her orphaned niece, but the AI companion quickly becomes dangerously overprotective.",
    releaseYear: 2022,
  },
  {
    _id: 4,
    image: avatar,
    name: "Avatar: The Way of Water",
    description:
      "Jake Sully and Neytiri must protect their family when an old threat returns, leading them to explore Pandora’s oceans and form alliances with new clans.",
    releaseYear: 2022,
  },
];

import avatarMovie from "../assets/images/avatar.webp";
import profile from "../assets/images/slide4.jpg";
import little_mermaid from "../assets/images/little mermaid.webp";
import the_Lord_of_rings from "../assets/images/the lord of the rings.webp";
import top_gun from "../assets/images/top gun.webp";

export const moviesData = [
  {
    id: 301,
    type: "Recent Movies",
    movies: [
      {
        _id: 100,
        image: avatarMovie,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 101,
        image: avatarMovie,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 102,
        image: little_mermaid,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 103,
        image: little_mermaid,
        name: "Little Mermaid",
        otherName: "Part 1",
        releaseYear: 2023,
        views: 94000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 104,
        image: avatarMovie,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
    ],
  },

  {
    id: 302,
    type: "Recent Movies",
    movies: [
      {
        _id: 105,
        image: avatarMovie,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 106,
        image: avatarMovie,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 107,
        image: little_mermaid,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 108,
        image: little_mermaid,
        name: "Little Mermaid",
        otherName: "Part 1",
        releaseYear: 2023,
        views: 94000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 109,
        image: avatarMovie,
        name: "Avatar",
        otherName: "The Way of the Water",
        releaseYear: 2022,
        views: 182000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
    ],
  },
  {
    id: 303,
    type: "Popular Movies",
    movies: [
      {
        _id: 20,
        image: the_Lord_of_rings,
        name: "The Lord of the Rings",
        otherName: "The Return of the King",
        releaseYear: 2003,
        views: 204000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 21,
        image: top_gun,
        name: "Top Gun",
        otherName: "Maverick",
        releaseYear: 2022,
        views: 121000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 22,
        image: the_Lord_of_rings,
        name: "The Lord of the Rings",
        otherName: "The Return of the King",
        releaseYear: 2003,
        views: 204000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
      {
        _id: 23,
        image: top_gun,
        name: "Top Gun",
        otherName: "Maverick",
        releaseYear: 2022,
        views: 121000,
        user: {
          imageProfile: profile,
          username: "Leon",
          isVerified: true,
        },
      },
    ],
  },
];

// footer data

export const footerData = [
  {
    grid: "Izacu Movies",
    data: [
      {
        id: 1000,
        label:
          "At Izacu Movies, we celebrate the magic of cinema. From the latest hits to timeless classics, discover, explore, and enjoy movies all in one place. 🍿✨",
      },
    ],
  },
  {
    grid: "Quick Links",
    data: [
      { id: 1, label: "Home", url: "/" },
      { id: 2, label: "Movies", url: "/movies" },
      { id: 3, label: "Genres", url: "/genres" },
      { id: 4, label: "Top Rated", url: "/top-rated" },
      { id: 5, label: "Coming Soon", url: "/coming-soon" },
    ],
  },
  {
    grid: "Info Links",
    data: [
      { id: 1, label: "About Us", url: "/about" },
      { id: 2, label: "Contact", url: "/contact" },
      { id: 3, label: "Privacy Policy", url: "/privacy" },
      { id: 4, label: "Terms of Service", url: "/terms" },
    ],
  },
  {
    grid: "Social Links",
    data: [
      { id: 1, label: "Facebook", url: "https://facebook.com" },
      { id: 2, label: "Instagram", url: "https://instagram.com" },
      { id: 3, label: "Twitter", url: "https://twitter.com" },
      { id: 4, label: "YouTube", url: "https://youtube.com" },
    ],
  },
];
