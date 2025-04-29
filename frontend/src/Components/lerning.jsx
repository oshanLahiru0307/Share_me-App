import NavBar from "./NavigationBar";
import ProfileCard from "./ProfileCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiCalendarDateRange } from "react-icons/hi2";

function Lerning() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/learningPlan");
        setPosts(response.data);
        setFilteredPosts(response.data);
        
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Ensure this runs only once on component mount

  const getEmbedURL = (url) => {
    try {
      if (url.includes("youtube.com/watch")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url; // Return the original URL if it's not a YouTube link
    } catch (error) {
      console.error("Invalid URL:", url);
      return ""; // Return an empty string for invalid URLs
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/learningPlan/${id}`);
        alert("Post deleted successfully!");
        setFilteredPosts(filteredPosts.filter((post) => post.id !== id)); // Update the list after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/updateLearningPlan/${id}`;
  };

  const renderPostByTemplate = (post) => {
    console.log("Rendering post:", post); // Debugging: Log the post object
    if (!post.templateID) {
      // Use the correct field name
      console.warn("Missing templateID for post:", post); // Warn if templateID is missing
      return (
        <div className="template template-default">Invalid template ID</div>
      );
    }

    switch (
      post.templateID // Use the correct field name
    ) {
      case 1:
        return (
          <div className="template_dis template-1">
            <div className="user_details_card">
              <div>
                <div className="name_section_post">
                  <p className="name_section_post_owner_name">
                    {post.postOwnerName}
                  </p>
                </div>
              </div>
              {post.postOwnerID === localStorage.getItem("userID") && (
                <div className="action_btn_icon_post">
                  <FaEdit
                    onClick={() => handleUpdate(post.id)}
                    className="action_btn_icon"
                  />
                  <RiDeleteBin6Fill
                    onClick={() => handleDelete(post.id)}
                    className="action_btn_icon"
                  />
                </div>
              )}
            </div>
            <p className="template_title">{post.title}</p>
            <p className="template_dates">
              <HiCalendarDateRange /> {post.startDate} to {post.endDate}{" "}
            </p>
            <p className="template_description">{post.category}</p>
            <hr></hr>
            <p
              className="template_description"
              style={{ whiteSpace: "pre-line" }}
            >
              {post.description}
            </p>
            <div className="tags_preview">
              {post.tags?.map((tag, index) => (
                <span key={index} className="tagname">
                  #{tag}
                </span>
              ))}
            </div>
            {post.imageUrl && (
              <img
                src={`http://localhost:4000/learningPlan/planImages/${post.imageUrl}`}
                alt={post.title}
                className="iframe_preview_dis"
              />
            )}
            {post.contentURL && (
              <iframe
                src={getEmbedURL(post.contentURL)}
                title={post.title}
                className="iframe_preview_dis"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
        );
      case 2:
        return (
          <div className="template_dis template-2">
            <div className="user_details_card">
              <div>
                <div className="name_section_post">
                  <p className="name_section_post_owner_name">
                    {post.postOwnerName}
                  </p>
                </div>
              </div>
              {post.postOwnerID === localStorage.getItem("userID") && (
                <div className="action_btn_icon_post">
                  <FaEdit
                    onClick={() => handleUpdate(post.id)}
                    className="action_btn_icon"
                  />
                  <RiDeleteBin6Fill
                    onClick={() => handleDelete(post.id)}
                    className="action_btn_icon"
                  />
                </div>
              )}
            </div>
            <p className="template_title">{post.title}</p>
            <p className="template_dates">
              <HiCalendarDateRange /> {post.startDate} to {post.endDate}{" "}
            </p>
            <p className="template_description">{post.category}</p>
            <hr></hr>
            <p
              className="template_description"
              style={{ whiteSpace: "pre-line" }}
            >
              {post.description}
            </p>
            <div className="tags_preview">
              {post.tags?.map((tag, index) => (
                <span key={index} className="tagname">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="preview_part">
              <div className="preview_part_sub">
                {post.imageUrl && (
                  <img
                    src={`http://localhost:4000/learningPlan/planImages/${post.imageUrl}`}
                    alt={post.title}
                    className="iframe_preview"
                  />
                )}
              </div>
              <div className="preview_part_sub">
                {post.contentURL && (
                  <iframe
                    src={getEmbedURL(post.contentURL)}
                    title={post.title}
                    className="iframe_preview"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="template_dis template-3">
            <div className="user_details_card">
              <div>
                <div className="name_section_post">
                  <p className="name_section_post_owner_name">
                    {post.postOwnerName}
                  </p>
                </div>
              </div>
              {post.postOwnerID === localStorage.getItem("userID") && (
                <div className="action_btn_icon_post">
                  <FaEdit
                    onClick={() => handleUpdate(post.id)}
                    className="action_btn_icon"
                  />
                  <RiDeleteBin6Fill
                    onClick={() => handleDelete(post.id)}
                    className="action_btn_icon"
                  />
                </div>
              )}
            </div>
            {post.imageUrl && (
              <img
                src={`http://localhost:4000/learningPlan/planImages/${post.imageUrl}`}
                alt={post.title}
                className="iframe_preview_dis"
              />
            )}
            {post.contentURL && (
              <iframe
                src={getEmbedURL(post.contentURL)}
                title={post.title}
                className="iframe_preview_dis"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
            <p className="template_title">{post.title}</p>
            <p className="template_dates">
              <HiCalendarDateRange /> {post.startDate} to {post.endDate}{" "}
            </p>
            <p className="template_description">{post.category}</p>
            <hr></hr>
            <p
              className="template_description"
              style={{ whiteSpace: "pre-line" }}
            >
              {post.description}
            </p>
            <div className="tags_preview">
              {post.tags?.map((tag, index) => (
                <span key={index} className="tagname">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        );
      default:
        console.warn("Unknown templateID:", post.templateID); // Warn if templateID is unexpected
        return (
          <div className="template template-default">
            <p>Unknown template ID: {post.templateID}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <NavBar />
      <div className="mt-10 mx-6 flex flex-row gap-10">
        <div>
          <ProfileCard />
        </div>
        <div className="w-full min-h-screen bg-white rounded-lg shadow-lg p-4 pt-14 sticky top-24 mb-10">
          <div className="flex flex-col items-center justify-center ">
            {/* Add New Button (commented out) */}
            {/* <div
              className="fixed z-50 bottom-12 right-12 bg-cyan-900 rounded-full border border-cyan-900 w-12 h-12 flex items-center justify-center cursor-pointer"
              onClick={() => (window.location.href = "/addLearningPlan")}
            >
              <IoIosCreate className="text-3xl text-white" />
            </div> */}
            <div>
              {filteredPosts.length === 0 ? (
                <div className="w-[670px] border border-cyan-900 rounded-md flex flex-col items-center justify-center p-6 gap-6">
                  {!imgError ? (
                    <img
                      src="/img/notfound.png"
                      alt="No posts found"
                      className="w-[300px] h-[200px] object-contain"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-[300px] h-[200px] flex items-center justify-center text-gray-400 bg-gray-100 rounded">
                      {/* fallback content if image not found */}
                      No image available
                    </div>
                  )}
                  <p className="text-gray-600 text-lg">
                    No posts found. Please create a new post.
                  </p>
                  <button
                  className="w-40 mx-auto py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg flex justify-center"
                    onClick={() => (window.location.href = "/addLearningPlan")}
                  >
                    Create New Post
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div key={post.id} className="w-[700px] mb-6">
                    {renderPostByTemplate(post)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lerning;
