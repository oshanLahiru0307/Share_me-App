import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import NavBar from "./NavigationBar";
import ProfileCard from "./ProfileCard";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
function AddLearningPlan() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentURL, setContentURL] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContentURLInput, setShowContentURLInput] = useState(false);
  const [showImageUploadInput, setShowImageUploadInput] = useState(false);
  const [templateID, setTemplateID] = useState(""); // was null
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const navigate = useNavigate();

  // Get user info from localStorage
  const postOwnerID = localStorage.getItem("user");
  const postOwnerName = localStorage.getItem("userName");

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (startDate === endDate) {
      alert("Start date and end date cannot be the same.");
      setIsSubmitting(false);
      return;
    }

    if (startDate > endDate) {
      alert("Start date cannot be greater than end date.");
      setIsSubmitting(false);
      return;
    }

    if (tags.length < 2) {
      alert("Please add at least two tags.");
      setIsSubmitting(false);
      return;
    }

    if (!templateID) {
      alert("Please select a template.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadResponse = await axios.post(
          "http://localhost:4000/learningPlan/planUpload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadResponse.data;
      }

      // Create the new post object
      const newPost = {
        title,
        description,
        contentURL,
        tags,
        postOwnerID, // from localStorage
        postOwnerName, // from localStorage
        imageUrl,
        templateID,
        startDate, // New field
        endDate, // New field
        category, // New field
      };

      // Submit the post data
      await axios.post("http://localhost:4000/learningPlan", newPost);
      alert("Post added successfully!");
      navigate("/lerning");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="bg-slate-200 min-h-screen">
      <NavBar />
      <div className="mt-10 mx-6 flex flex-row gap-10">
        <div>
          <ProfileCard />
        </div>
        <div className="w-[1200px] h-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-blue-500">
              Add Lerning Plans
            </h2>
          </div>
          <hr className="mb-6 border-blue-200" />

          <div className="flex justify-end mb-8"></div>
          <div >
            
            {/* Template Preview - Single Template */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="border border-blue-400 bg-blue-50 rounded-2xl p-6 w-full max-w-sm bg-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <p className="text-end text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1">
                  Learning Plan Preview
                </p>
                <p className="capitalize text-xl font-bold text-gray-800 mb-1 text-start">
                  {title || "Title Preview"}
                </p>
                <p className="flex items-center gap-1 font-medium text-sm text-gray-600 mb-1">
                  <HiCalendarDateRange /> {startDate} to {endDate}
                </p>
                <p className="text-start text-xs text-gray-500 mb-2">
                  {category}
                </p>
                <hr className="my-2" />
                <p className="text-start text-sm text-gray-600 mb-2">
                  {description || "Description Preview"}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg mt-2 shadow"
                  />
                )}
                {contentURL && (
                  <iframe
                    src={getEmbedURL(contentURL)}
                    title="Content Preview"
                    className="w-full h-40 rounded-lg mt-2 shadow"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
            {/* Form Section */}
            <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white shadow-2xl rounded-lg border border-gray-100 mb-14">
              <p className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
                Add Learning Post
              </p>
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Title */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  />
                </div>
                {/* Tags */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1 p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                    <IoMdAdd
                      onClick={handleAddTag}
                      className="text-3xl text-blue-500 cursor-pointer hover:text-blue-700"
                    />
                  </div>
                </div>
                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  />
                </div>
                {/* Template */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Your Template
                  </label>
                  <select
                    value={templateID}
                    onChange={(e) => setTemplateID(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  >
                    <option value="">Select Template</option>
                    <option value="1">Default Template</option>
                  </select>
                </div>
                {/* Start and End Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  </div>
                </div>
                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Tech">Tech</option>
                    <option value="Programming">Programming</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>
                <hr className="my-6" />
                {/* Buttons for Video and Image Upload */}
                <div className="flex justify-center p-2 space-x-8">
                  <FaVideo
                    onClick={() => setShowContentURLInput(!showContentURLInput)}
                    className={`text-3xl cursor-pointer transition-colors ${
                      showContentURLInput
                        ? "text-blue-700"
                        : "text-blue-400 hover:text-blue-700"
                    }`}
                  />
                  <FaImage
                    onClick={() =>
                      setShowImageUploadInput(!showImageUploadInput)
                    }
                    className={`text-3xl cursor-pointer transition-colors ${
                      showImageUploadInput
                        ? "text-green-700"
                        : "text-green-400 hover:text-green-700"
                    }`}
                  />
                </div>
                {/* Conditional Inputs */}
                {showContentURLInput && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Content URL
                    </label>
                    <input
                      type="url"
                      value={contentURL}
                      onChange={(e) => setContentURL(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  </div>
                )}
                {showImageUploadInput && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Upload Image
                    </label>
                    {imagePreview && (
                      <div className="mb-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full rounded-xl shadow"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  </div>
                )}
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-40 mx-auto py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg   text-base flex justify-center"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLearningPlan;
