"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};


export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log(newFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => console.log(error),
  });

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-6" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-bold text-neutral-700 dark:text-neutral-300 text-base">Upload file</p>
          <p className="relative z-20 text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 ? (
              files.map((file, idx) => (
                <motion.div
                  key={idx}
                  layoutId={`file-upload-${idx}`}
                  className="relative bg-white dark:bg-neutral-900 flex flex-col items-start p-4 mt-4 w-full rounded-md shadow-sm"
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                      {file.name}
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout className="px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input rounded-lg">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="flex text-sm items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout className="px-1 py-0.5 bg-gray-100 dark:bg-neutral-800 rounded-md">
                      {file.type}
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                      Modified {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div layoutId="file-upload" variants={mainVariant} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]">
                {isDragActive ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex rounded-[2px] ${index % 2 === 0 ? "bg-gray-50 dark:bg-neutral-950" : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"}`}
            />
          );
        })
      )}
    </div>
  );
}