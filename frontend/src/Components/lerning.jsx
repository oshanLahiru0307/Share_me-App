import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import NavBar from "./NavigationBar";
import ProfileCard from "./ProfileCard";
import { HiCalendarDateRange } from "react-icons/hi2";
import { useParams, useNavigate } from "react-router-dom";

function renderPostTailwind(
  post,
  userId,
  handleUpdate,
  handleDelete,
  getEmbedURL
) {
  const isOwner = String(post.postOwnerID) === String(userId);

  // Single template for all posts
  return (
    <div className="border border-blue-400 bg-blue-50 rounded-2xl p-6 shadow-xl w-full max-w-[700px] mb-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1">
            Learning Plan
          </p>
          <p className="capitalize text-xl font-bold text-gray-800 mb-1">
            {post.title}
          </p>
          <p className="flex items-center gap-1 font-medium text-sm text-gray-600 mb-1">
            <HiCalendarDateRange /> {post.startDate} to {post.endDate}
          </p>
          <p className="text-xs text-gray-500 mb-2">{post.category}</p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-lg font-semibold shadow"
              onClick={() => handleUpdate(post.id)}
            >
              Edit
            </button>
            <button
              className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded-lg font-semibold shadow"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <hr className="my-2" />
      <p
        className="text-sm text-gray-600 mb-2"
        style={{ whiteSpace: "pre-line" }}
      >
        {post.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
      {post.imageUrl && (
        <img
          src={`http://localhost:4000/api/v1/learningPlan/planImages/${post.imageUrl}`}
          alt={post.title}
          className="w-full h-40 object-cover rounded-lg mt-2 shadow"
        />
      )}
      {post.contentURL && (
        <iframe
          src={getEmbedURL(post.contentURL)}
          title={post.title}
          className="w-full h-40 rounded-lg mt-2 shadow"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <div className="mt-2 text-sm text-gray-500 font-semibold">
        {post.postOwnerName}
      </div>
    </div>
  );
}

function Lerning() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  // Use userId from URL param if present, else from localStorage
  const userId = id || localStorage.getItem("user");

  useEffect(() => {
    // Redirect to login if not logged in
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/learningPlan");
        // Only show posts belonging to the logged-in user or userId param
        const userPosts = response.data.filter(
          (post) => String(post.postOwnerID) === String(userId)
        );
        setPosts(userPosts);
        setFilteredPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId, navigate]);

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
      return url;
    } catch {
      return "";
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/learningPlan/${id}`);
        alert("Post deleted successfully!");
        setFilteredPosts(filteredPosts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateLearningPlan/${id}`);
  };

  // If not logged in, don't render anything (redirect handled in useEffect)
  if (!userId) return null;

  return (
    <div className="bg-slate-200 min-h-screen">
      <NavBar />
      <div className="mt-10 mx-6 flex flex-row gap-10">
        <ProfileCard />
        <div className="w-[1200px] h-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-blue-500">
              Lerning Plans
            </h2>
            <button
              className="px-6 py-1 bg-white text-black border border-gray-300 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
              onClick={() => navigate("/addLearningPlan")}
            >
              + Add Lerning Plan
            </button>
          </div>
          <hr className="mb-6 border-blue-200" />

          <div className="flex justify-end mb-8"></div>
          <div className="flex flex-col items-center justify-center">
            {filteredPosts.length === 0 ? (
              <div className="w-[670px] border border-cyan-900 rounded-md flex flex-col items-center justify-center p-6 gap-6">
                {!imgError ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No posts found"
                    className="w-[300px] h-[200px] object-contain"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-[300px] h-[200px] flex items-center justify-center text-gray-400 bg-gray-100 rounded">
                    No image available
                  </div>
                )}

                <p className="text-gray-600 text-lg">
                  No posts found. Please create a new post.
                </p>
                <button
                  className="px-4 mx-auto py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg"
                  onClick={() => navigate("/addLearningPlan")}
                >
                  + Add Lerning Plan
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="w-[700px] mb-6">
                  {renderPostTailwind(
                    post,
                    userId,
                    handleUpdate,
                    handleDelete,
                    getEmbedURL
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lerning;
