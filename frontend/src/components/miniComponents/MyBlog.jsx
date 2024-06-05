import React, { useEffect, useState } from "react";
// import LatestBlog from "./LatestBlog";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBlog = () => {
  const [myBlog, setMyBlog] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/blog/myblogs",
        { withCredentials: true }
      );
      setMyBlog(data.blogs);
    };
    fetchMyBlogs();
  }, []);

  const deleteBlogHandler = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/blog/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyBlog((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <section className="my-blogs">
        {myBlog && myBlog.length > 0
          ? myBlog.map((element) => {
              return (
                <div className="author-blog-card" key={element._id}>
                  {element.mainImage && element.mainImage && (
                    <img src={element.mainImage.url} alt="blogImg" />
                  )}
                  <span className="category">{element.category}</span>
                  <h4>{element.title}</h4>
                  <div className="btn-wrapper">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="update-btn"
                    >
                      UPDATE
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBlogHandler(element._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })
          : "You have not posted any blog!"}
      </section>
    </>
  );
};

export default MyBlog;
