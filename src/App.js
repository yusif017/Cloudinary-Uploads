import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'qbpcbjin'); 

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dejjyfgh7/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setUploadSuccess(true);
        const avifUrl = response.data.secure_url.replace('/upload/', '/upload/f_avif/');
        setFileData({ ...response.data, avif_url: avifUrl });
        console.log('Dosya başarıyla yüklendi ve AVIF formatına dönüştürüldü:', avifUrl);
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
    }
  };
console.log(fileData);
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Dosyayı Yükle</button>
      {uploadSuccess && fileData && (
        <div>
          <p>Dosya başarıyla yüklendi!</p>
          <p><strong>Dosya Adı:</strong> {fileData.original_filename}</p>
          <p><strong>Yükleme URL'si (Orijinal):</strong> <a href={fileData.secure_url} target="_blank" rel="noopener noreferrer">{fileData.secure_url}</a></p>
          <p><strong>Yükleme URL'si (AVIF):</strong> <a href={fileData.avif_url} target="_blank" rel="noopener noreferrer">{fileData.avif_url}</a></p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
