import React, { useId, useState, DragEvent, useCallback } from "react";
import styled, { css } from "styled-components";

export interface FileUploaderProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "disabled" | "onDrop"> {
  id?: string;
  onDrop: (files: File[]) => void;
  multiple?: boolean;
}

const supportsFileSystemAccessAPI =
  "getAsFileSystemHandle" in DataTransferItem.prototype;

const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
  ({ id, onDrop, multiple, children }, ref) => {
    const uniqueId = useId() || id;
    const [isHovered, setIsHovered] = useState(false);

    const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log("handleOnDrop", e.dataTransfer);

      const fileHandlesPromises = [...e.dataTransfer.items]
        .filter((item) => item.kind === "file")
        .map((item) =>
          supportsFileSystemAccessAPI
            ? item.getAsFileSystemHandle()
            : item.getAsFile(),
        );

      const files = [];
      for await (const handle of fileHandlesPromises) {
        if (handle.kind === "file" || handle.isFile) {
          console.log(`File:`, handle);
          files.push(handle);
        }
      }

      onDrop(files);
    };

    const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // console.log(e.dataTransfer);
    };

    const handleOnDragEnter = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsHovered(true);
      console.log("handleOnDragEnter", e.dataTransfer);
    };

    const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsHovered(false);
      console.log("handleOnDragLeave", e.dataTransfer);
    };

    const openFileDialog = useCallback(() => {
      window
        .showOpenFilePicker({ multiple: multiple })
        .then((handles) => {
          console.log(handles);
        })
        .catch((e) => console.log(e));
    }, []);

    return (
      <div
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragEnter={handleOnDragEnter}
        onDragLeave={handleOnDragLeave}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openFileDialog}
      >
        <HiddenFileInput
          id={uniqueId}
          type="file"
          multiple={multiple}
          ref={ref}
        />
        <Container $isHovered={isHovered}>{children}</Container>
      </div>
    );
  },
);

FileUploader.displayName = "FileUplaoder";

export default FileUploader;

const HiddenFileInput = styled.input`
  display: none;
`;

type ContainerProps = {
  $isHovered: boolean;
};

const Container = styled.div<ContainerProps>`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.02);
  vertical-align: middle;

  ${({ $isHovered }) => {
    if ($isHovered) {
      return css`
        border: 1px dashed blue;
      `;
    } else {
      return css`
        border: 1px dashed #d9d9d9;
      `;
    }
  }}
`;
