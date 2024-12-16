import React, { useState } from 'react';

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); 
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "proshore-image");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dk3i2kpt4/image/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const uploadedImage = await res.json();
      console.log("Upload Response:", uploadedImage);

      setUploadedImageUrl(uploadedImage.url);
      

    } catch (err) {
      setError(err.message || "An error occurred during file upload");
      console.error("Upload Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Upload Image</h1>

      <div className="file-upload">
        <div className="upload-container">
          {loading ? (
            "Uploading..."
          ) : (
            <>
              <img
                src="public/upload-icon.png"
                alt="Upload Icon"
                style={{ width: '40px', height: '40px', margin: '-12px 20px' }}
              />
              <input type="file" className="file-input" onChange={handleFileUpload} />
            </>
          )}
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {uploadedImageUrl && (
        <div className="image-preview">
          <h2>Uploaded Image:</h2>
          <img
            src={uploadedImageUrl}
            alt="Uploaded Preview"
            style={{ maxWidth: '70%', marginTop: '10px' }}
          />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
