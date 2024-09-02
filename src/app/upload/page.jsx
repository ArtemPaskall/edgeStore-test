'use client'
import React, { useState } from 'react';
import Image from 'next/image';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('description', description);
    selectedFiles.forEach(file => formData.append('file', file));
    
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Upload successful');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <div>
      <input 
        type="text" 
        placeholder="Enter description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      </div>
      <input type="file" multiple onChange={handleFileChange} />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {previewImages.map((src, index) => (
          <Image key={index} src={src} alt={`Preview ${index + 1}`} width={100} height={100} />
        ))}
      </div>
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
}

export default ImageUpload;
