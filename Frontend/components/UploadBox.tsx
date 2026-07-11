"use client";

import { useRef } from "react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBox({ onFileSelect }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="mt-8 rounded-xl border-2 border-dashed border-blue-500 p-12 text-center">
      <p className="text-lg font-semibold">Drag & Drop CSV Here</p>

      <p className="my-4 text-gray-400">OR</p>

      <button
        onClick={handleBrowse}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Browse File
      </button>

      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}