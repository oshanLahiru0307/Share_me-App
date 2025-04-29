import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
// import "../Pages/LearningPlan/Templates.css";
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
  const [templateID, setTemplateID] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const navigate = useNavigate();

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

    const postOwnerID = localStorage.getItem("userID");
    const postOwnerName = localStorage.getItem("userFullName");

    if (!postOwnerID) {
      alert("Please log in to add a post.");
      navigate("/");
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
          "http://localhost:8080/learningPlan/planUpload",
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
        postOwnerID,
        postOwnerName,
        imageUrl,
        templateID,
        startDate, // New field
        endDate, // New field
        category, // New field
      };

      // Submit the post data
      await axios.post("http://localhost:8080/learningPlan", newPost);
      alert("Post added successfully!");
      navigate("/allLearningPlan");
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
    
      <div className='bg-slate-200 h-auto '>
        <NavBar />
        <div className="mt-10 mx-6 flex flex-row gap-10"></div>
        <div>
          <ProfileCard />
        </div>
        <div className="continSection">
          <div className="flex flex-wrap justify-around mb-5 items-start gap-5 pb-5 w-full">
            {/* Template 1 */}
            <div className="border border-gray-300 rounded-md p-4 w-[35%] text-center bg-white shadow-md hover:transform hover:-translate-y-1 hover:shadow-lg transition">
              <p className="w-full text-end text-[15px] font-medium uppercase text-gray-600">
                template 1
              </p>
              <p className="w-full capitalize text-[20px] text-start">
                {title || "Title Preview"}
              </p>
              <p className="w-full flex items-center justify-start gap-1 font-medium text-[15px]">
                <HiCalendarDateRange /> {startDate} to {endDate}
              </p>
              <p className="w-full text-start text-[14px] text-gray-600 mt-1">
                {category}
              </p>
              <hr className="my-2" />
              <p className="w-full text-start text-[14px] text-gray-600">
                {description || "Description Preview"}
              </p>

              <div className="mt-2 flex items-center justify-start w-full flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-gray-500 text-xs font-medium italic"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-[200px] rounded-md mt-2"
                />
              )}
              {contentURL && (
                <iframe
                  src={getEmbedURL(contentURL)}
                  title="Content Preview"
                  className="w-full h-[200px] rounded-md mt-2"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Template 2 */}
            <div className="border-2 border-pink-500 bg-pink-50 rounded-md p-4 w-[35%] text-center shadow-md hover:transform hover:-translate-y-1 hover:shadow-lg transition">
              <p className="w-full text-end text-[15px] font-medium uppercase text-gray-600">
                template 2
              </p>
              <p className="w-full capitalize text-[20px] text-start">
                {title || "Title Preview"}
              </p>
              <p className="w-full flex items-center justify-start gap-1 font-medium text-[15px]">
                <HiCalendarDateRange /> {startDate} to {endDate}
              </p>
              <p className="w-full text-start text-[14px] text-gray-600 mt-1">
                {category}
              </p>
              <hr className="my-2" />
              <p className="w-full text-start text-[14px] text-gray-600">
                {description || "Description Preview"}
              </p>

              <div className="flex justify-between items-center w-full gap-2 mt-2">
                <div className="flex-1">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-[200px] rounded-md"
                    />
                  )}
                </div>
                <div className="flex-1">
                  {contentURL && (
                    <iframe
                      src={getEmbedURL(contentURL)}
                      title="Content Preview"
                      className="w-full h-[200px] rounded-md"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-start w-full flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-gray-500 text-xs font-medium italic"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Template 3 */}
            <div className="border-2 border-green-500 bg-green-50 rounded-md p-4 w-[35%] text-center shadow-md hover:transform hover:-translate-y-1 hover:shadow-lg transition">
              <p className="w-full text-end text-[15px] font-medium uppercase text-gray-600">
                template 3
              </p>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-[200px] rounded-md mt-2"
                />
              )}
              {contentURL && (
                <iframe
                  src={getEmbedURL(contentURL)}
                  title="Content Preview"
                  className="w-full h-[200px] rounded-md mt-2"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}

              <p className="w-full capitalize text-[20px] text-start mt-2">
                {title || "Title Preview"}
              </p>
              <p className="w-full flex items-center justify-start gap-1 font-medium text-[15px]">
                <HiCalendarDateRange /> {startDate} to {endDate}
              </p>
              <p className="w-full text-start text-[14px] text-gray-600 mt-1">
                {category}
              </p>
              <hr className="my-2" />
              <p className="w-full text-start text-[14px] text-gray-600">
                {description || "Description Preview"}
              </p>

              <div className="mt-2 flex items-center justify-start w-full flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-gray-500 text-xs font-medium italic"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl">
            <p className="text-3xl font-bold mb-6 text-center">
              Add Learning Post
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
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
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Template ID</option>
                  <option value="1">Template 1</option>
                  <option value="2">Template 2</option>
                  <option value="3">Template 3</option>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="flex justify-center space-x-6">
                <FaVideo
                  onClick={() => setShowContentURLInput(!showContentURLInput)}
                  className="text-3xl text-blue-500 cursor-pointer hover:text-blue-700"
                />
                <FaImage
                  onClick={() => setShowImageUploadInput(!showImageUploadInput)}
                  className="text-3xl text-green-500 cursor-pointer hover:text-green-700"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
  
  );
}

export default AddLearningPlan;
