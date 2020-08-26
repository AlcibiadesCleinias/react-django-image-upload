import React from "react";

const API_URL = 'http://localhost:8000';

export default function FilesListCard(props) {
  const filesinfo = props.filesinfo;

  return (
      <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {filesinfo &&
            filesinfo.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={API_URL + file.image}>{file.title}</a>
              </li>
            ))}
        </ul>
      </div>
  );
};
