import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const UploadZone = () => {
  const [isUploading, setIsUploading] = useState(false);
  const supportedFormats = [".xls", ".xlsx", ".csv"];

  // ✅ Parse Excel + Save to Firestore
  const handleFile = async (file) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // First sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Save to Firestore
        await addDoc(collection(db, "datasets"), {
          name: file.name,
          rows: jsonData,
          createdAt: new Date(),
        });

        alert(`✅ ${file.name} uploaded & saved!`);
        setIsUploading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("❌ Error uploading file!");
      setIsUploading(false);
    }
  };

  // ✅ Validate & process dropped/selected files
  const handleFileSelection = (files) => {
    const validFiles = files?.filter((file) => {
      const extension = "." + file.name.split(".").pop().toLowerCase();
      return (
        supportedFormats.includes(extension) &&
        file.size <= 10 * 1024 * 1024
      );
    });

    if (validFiles.length > 0) {
      validFiles.forEach((file) => handleFile(file));
    } else {
      alert("❌ Invalid file type or size!");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        background: "#f9f9f9",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <p>📤 Uploading...</p>
      ) : (
        <p>📄 Drag & drop Excel files here, or click to select</p>
      )}
    </div>
  );
};

export default UploadZone;
