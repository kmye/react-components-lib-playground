import type { Meta, StoryObj } from "@storybook/react";

import FileUploader from "./FileUploader";

const meta = {
  title: "Components/FileUploader",
  component: FileUploader,
  tags: ["autodocs"],
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Drag and Drop files here to upload or click on me",
    onDrop: (files) => {
      console.log(files);
    },
  },
};
