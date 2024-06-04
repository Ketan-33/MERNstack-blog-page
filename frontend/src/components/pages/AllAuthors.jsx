import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { mode } = useContext(Context);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/authors",
          { withCredentials: true }
        );
        console.log("Fetched authors:", data.authors); // Debugging log
        setAuthors(data.authors);
      } catch (error) {
        console.error("Error fetching authors:", error); // Debugging log
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };
    fetchAuthors();
  }, []);

  if (loading) {
    return <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />;
  }

  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => {
            return (
              <div className="card" key={element._id}>
                {element.avatar && element.avatar.url ? (
                  <img src={element.avatar.url} alt="author_avatar" />
                ) : (
                  <div>No Avatar Available</div>
                )}
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <p>No authors found.</p>
        )}
      </div>
    </article>
  );
};

export default AllAuthors;
