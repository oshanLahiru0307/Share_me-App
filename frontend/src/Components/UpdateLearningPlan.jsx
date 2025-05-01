import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import NavBar from "./NavigationBar";
import ProfileCard from "./ProfileCard";
import { HiCalendarDateRange } from "react-icons/hi2";

function UpdateLearningPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentURL, setContentURL] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [templateID, setTemplateID] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  // Get user info from localStorage
  const postOwnerID = localStorage.getItem("userID");
  const postOwnerName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/learningPlan/${id}`
        );
        const {
          title,
          description,
          contentURL,
          tags,
          imageUrl,
          templateID,
          startDate,
          endDate,
          category,
          postOwnerID: ownerId,
        } = response.data;
        setTitle(title);
        setDescription(description);
        setContentURL(contentURL);
        setTags(tags);
        setExistingImage(imageUrl);
        setTemplateID(templateID);
        setStartDate(startDate);
        setEndDate(endDate);
        setCategory(category);

        // Only allow editing if the user is the owner
        if (String(ownerId) !== String(postOwnerID)) {
          alert("You are not authorized to edit this plan.");
          window.location.href = "/lerning";
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, postOwnerID]);

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
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
      return url;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = existingImage;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
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
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
        return;
      }
    }

    const updatedPost = {
      title,
      description,
      contentURL,
      tags,
      imageUrl,
      postOwnerID, // always set to current user
      postOwnerName, // always set to current user
      templateID,
      startDate,
      endDate,
      category,
    };
    try {
      await axios.put(`http://localhost:4000/learningPlan/${id}`, updatedPost);
      alert("Post updated successfully!");
      window.location.href = "/lerning";
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
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
          {/* Template Previews */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {/* Template 1 */}
            <div className="border border-blue-400 bg-blue-50 rounded-2xl p-6 w-full max-w-sm bg-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <p className="text-end text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1">
                template 1
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
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg mt-2 shadow"
                />
              ) : (
                existingImage && (
                  <img
                    src={`http://localhost:4000/learningPlan/planImages/${existingImage}`}
                    alt="Existing"
                    className="w-full h-40 object-cover rounded-lg mt-2 shadow"
                  />
                )
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
            {/* Template 2 */}
            <div className="border-2 border-pink-400 bg-pink-50 rounded-2xl p-6 w-full max-w-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <p className="text-end text-xs font-semibold uppercase text-pink-400 tracking-wider mb-1">
                template 2
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
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                  ) : (
                    existingImage && (
                      <img
                        src={`http://localhost:4000/learningPlan/planImages/${existingImage}`}
                        alt="Existing"
                        className="w-full h-32 object-cover rounded-lg shadow"
                      />
                    )
                  )}
                </div>
                <div className="flex-1">
                  {contentURL && (
                    <iframe
                      src={getEmbedURL(contentURL)}
                      title="Content Preview"
                      className="w-full h-32 rounded-lg shadow"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Template 3 */}
            <div className="border-2 border-green-400 bg-green-50 rounded-2xl p-6 w-full max-w-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <p className="text-end text-xs font-semibold uppercase text-green-400 tracking-wider mb-1">
                template 3
              </p>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg mt-2 shadow"
                />
              ) : (
                existingImage && (
                  <img
                    src={`http://localhost:4000/learningPlan/planImages/${existingImage}`}
                    alt="Existing"
                    className="w-full h-40 object-cover rounded-lg mt-2 shadow"
                  />
                )
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
              <p className="capitalize text-xl font-bold text-gray-800 mt-2 text-start">
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
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Form Section */}
          <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white shadow-2xl rounded-lg border border-gray-100 mb-14">
            <p className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
              Update Learning Post
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
              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Image
                </label>
                {imagePreview ? (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full rounded-xl shadow"
                    />
                  </div>
                ) : (
                  existingImage && (
                    <div className="mb-4">
                      <img
                        src={`http://localhost:4000/learningPlan/planImages/${existingImage}`}
                        alt="Existing"
                        className="w-full rounded-xl shadow"
                      />
                    </div>
                  )
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                />
              </div>
              {/* Content URL */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Content URL
                </label>
                <input
                  type="url"
                  value={contentURL}
                  onChange={(e) => setContentURL(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  required
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
                      <span
                        onClick={() => handleDeleteTag(index)}
                        className="ml-2 text-red-500 cursor-pointer"
                      >
                        x
                      </span>
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
                  value={templateID || ""}
                  onChange={(e) => setTemplateID(Number(e.target.value))}
                  required
                  className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
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
              {/* Submit Button */}
              <button
                type="submit"
                className="w-40 mx-auto py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg text-base flex justify-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateLearningPost;
