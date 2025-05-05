import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async () => {
    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError('You can only upload up to 6 images.');
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    try {
      const urls = await Promise.all(
        [...files].map((file) => uploadToCloudinary(file))
      );

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } catch (err) {
      console.error(err);
      setImageUploadError('Image upload failed');
    }

    setUploading(false);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Realestate');
    formData.append('cloud_name', 'ds7yz6o2z');

    const res = await fetch(`https://api.cloudinary.com/v1_1/ds7yz6o2z/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data.secure_url;
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData({ ...formData, type: id });
    } else if (['parking', 'furnished', 'offer'].includes(id)) {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (formData.imageUrls.length < 1) {
      return setError('You must upload at least one image.');
    }

    if (+formData.regularPrice < +formData.discountPrice) {
      return setError('Discount price must be lower than regular price.');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        return setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center my-6 sm:my-8 text-amber-600">
        Create a Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        {/* Left */}
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
          <input type="text" placeholder="Name" id="name" maxLength="62" minLength="10" required onChange={handleChange} value={formData.name} className="border p-3 rounded-lg shadow-sm w-full" />
          <textarea placeholder="Description" id="description" required onChange={handleChange} value={formData.description} className="border p-3 rounded-lg shadow-sm w-full" />
          <input type="text" placeholder="Address" id="address" required onChange={handleChange} value={formData.address} className="border p-3 rounded-lg shadow-sm w-full" />

          <div className="flex flex-wrap gap-4">
            {['sale', 'rent', 'parking', 'furnished', 'offer'].map((id) => (
              <div key={id} className="flex items-center gap-2">
                <input type="checkbox" id={id} checked={formData[id] || formData.type === id} onChange={handleChange} className="w-5 h-5" />
                <span className="capitalize text-sm">{id}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {['bedrooms', 'bathrooms', 'regularPrice'].map((id) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm font-medium">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </label>
                <input type="number" id={id} min="1" max="1000000" onChange={handleChange} value={formData[id]} className="p-2 border border-gray-300 rounded-md w-28" />
              </div>
            ))}
            {formData.offer && (
              <div className="flex flex-col">
                <label htmlFor="discountPrice" className="text-sm font-medium">
                  Discount Price
                </label>
                <input type="number" id="discountPrice" min="0" max="1000000" onChange={handleChange} value={formData.discountPrice} className="p-2 border border-gray-300 rounded-md w-28" />
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col w-full lg:w-1/3 gap-4">
          <p className="font-semibold text-sm">
            Images (max 6): <span className="text-gray-600">First image is the cover</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="p-2 border rounded w-full" />
            <button type="button" disabled={uploading} onClick={handleImageSubmit} className="p-2 text-green-700 border border-green-700 rounded hover:shadow disabled:opacity-70">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {imageUploadError && <p className="text-red-700 text-sm">{imageUploadError}</p>}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex justify-between items-center border p-2 rounded-md">
                <img src={url} alt="listing" className="w-20 h-20 object-cover rounded" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-600 text-sm">Delete</button>
              </div>
            ))}

          <button disabled={loading || uploading} className="p-3 bg-slate-700 text-white rounded-md text-sm uppercase hover:opacity-90 disabled:opacity-60">
            {loading ? 'Creating...' : 'Create Listing'}
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}