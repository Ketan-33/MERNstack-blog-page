import React, { useContext} from "react";
import LatestBlog from "../miniComponents/LatestBlog";
import HeroSection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import PopularAuthor from "../miniComponents/PopularAuthor";
import { Context } from "../../main";

const Home = () => {
  const { mode, blogs } = useContext(Context);
  const filteredBlogs = blogs.slice(0, 6);
  return (
    <>
      <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
        <HeroSection />
        <TrendingBlogs />
        <LatestBlog heading={"Latest Blogs"} blogs={filteredBlogs} />
        <PopularAuthor />
      </article>
    </>
  );
};

export default Home;
