import React from 'react';

const FileUploader: React.FC = () => {
  const handleOnDrop = () => {

  };

  const handleOnDragOver = () => {
  };

  return (<div onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
    <div>This is a container</div>
  </div>);
}

export default FileUploader;