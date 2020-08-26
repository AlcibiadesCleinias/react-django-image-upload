import React, { useState, useEffect } from "react";
import UploadService from "../../services/FileUploadService";
import FilesListCard from "../../components/FileList";
import { Image,Container,Row,Col } from 'react-bootstrap'

import { Redirect } from "react-router-dom";

const UploadFiles = () => {

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const [fileInfos, setFileInfos] = useState([]);

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const selectFile = (event) => {
  setSelectedFiles(event.target.files);

  let reader = new FileReader();
  let file = event.target.files[0];

  reader.onloadend = () => {
    setImagePreviewUrl(reader.result);
  }
  reader.readAsDataURL(file)
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event) => {
      // console.log(event);
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
        setMessage("Uploaded successfully");
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
      // console.log(response.data);
    });
  }, []);

  // if (progress === 100) {return <Redirect to="/result" />}
  let $imagePreview = null;
   if (imagePreviewUrl) {
     $imagePreview = (<Image src={imagePreviewUrl} thumbnail />);
   } else {
     $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
   }


  return (
    <Container>
      <Row>

      <Col xs={12} md={12}>
          {currentFile && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </div>
          )}
      </Col>

      <Col xs={12} md={12}>
        <label className="btn btn-default">
          <input type="file" accept="image/png, image/jpeg" onChange={selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </button>
      </Col>

      <Col xs={12} md={12}>
        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </Col>

      <Col xs={12} md={12}>
        {$imagePreview}
      </Col>

      <Col xs={12} md={12}>
        {(fileInfos.length > 0) && (<FilesListCard filesinfo={fileInfos}/>)}
      </Col>
    </Row>
    </Container>
  );
};

export default UploadFiles;
