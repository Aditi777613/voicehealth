import { useState } from 'react';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { analyzePrescription } from '../services/geminiAPI';
import { compressImage } from '../utils/imageCompression';

function UploadPrescription({ onAnalysisComplete, selectedLanguage, loading, setLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    try {
      setLoading(true);
      
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      // Compress and analyze
      const compressedImage = await compressImage(file);
      const analysis = await analyzePrescription(compressedImage, selectedLanguage);
      
      onAnalysisComplete(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze prescription. Please try again.');
      setLoading(false);
      setPreview(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        {preview && (
          <img 
            src={preview} 
            alt="Prescription preview" 
            className="max-w-xs mx-auto rounded-lg shadow-lg mb-6"
          />
        )}
        <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Analyzing Prescription...
        </h3>
        <p className="text-gray-600">
          Our AI is reading your prescription
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Your Prescription
      </h2>

      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
          dragActive 
            ? 'border-primary bg-green-50' 
            : 'border-gray-300 hover:border-primary'
        }`}
      >
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Drag & Drop your prescription here
        </h3>
        <p className="text-gray-500 mb-6">
          or click below to browse files
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* File Upload */}
          <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Camera Capture - FIXED */}
          <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Take Photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Tips for best results:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Ensure the prescription is clearly visible</li>
          <li>Good lighting helps AI read better</li>
          <li>Include all pages if multiple</li>
          <li>Supported formats: JPG, PNG, HEIC</li>
        </ul>
      </div>
    </div>
  );
}

export default UploadPrescription;
