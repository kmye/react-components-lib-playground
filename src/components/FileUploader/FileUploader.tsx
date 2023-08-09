import React, { useId, useState, DragEvent, useCallback } from "react";
import styled, { css } from "styled-components";

export interface FileUploaderProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "disabled" | "onDrop"> {
  id?: string;
  onDrop?: (dataTransfer: DataTransfer) => void;
}

const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
  ({ id, onDrop, children }, ref) => {
    const uniqueId = useId() || id;
    const [isHovered, setIsHovered] = useState(false);

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log(e.dataTransfer);
      onDrop?.(e.dataTransfer);
    };

    const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log(e.dataTransfer);
    };

    const openFileDialog = useCallback(() => {
      window.showOpenFilePicker().then((handles) => {
        console.log(handles);
      });
    }, []);

    return (
      <div
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openFileDialog}
      >
        <HiddenFileInput id={uniqueId} type="file" ref={ref} />
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
