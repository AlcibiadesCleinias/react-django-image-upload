import React, { useState, useEffect } from "react";
import UploadService from "../../services/FileUploadService";
import FilesListCard from "../../components/FileList";

const ResultView = () => {

  const [fileInfos, setFileInfos] = useState([]);

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  return (
    <div>
      {(fileInfos.length > 0) && (<FilesListCard filesinfo={fileInfos}/>)}
    </div>
  );
};

export default ResultView;
