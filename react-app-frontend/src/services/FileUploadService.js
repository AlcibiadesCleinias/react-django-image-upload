import http from "../http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append('image', file, file.name);
  formData.append('title', file.name);
  formData.append('content', file.name);

  return http.post("/posts/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/posts");
};

export default {
  upload,
  getFiles,
};
