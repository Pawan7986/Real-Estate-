import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    setFilePerc(0);

    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', 'Realestate');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/ds7yz6o2z/image/upload',
        {
          method: 'POST',
          body: formDataCloud,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prevData) => ({ ...prevData, avatar: data.secure_url }));
        setFilePerc(100);
      } else {
        setFileUploadError(true);
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      setFileUploadError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) return;
      setUserListings((prev) => prev.filter((l) => l._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/realestate.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">My Profile</h1>

        <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-6">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-32 w-32 object-cover self-center cursor-pointer border-4 border-gray-300 hover:border-amber-500 transition"
          />
          <p className="text-center text-sm">
            {fileUploadError ? (
              <span className="text-red-500">Image upload failed.</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span>Uploading {filePerc}%</span>
            ) : filePerc === 100 ? (
              <span className="text-green-600">Uploaded!</span>
            ) : null}
          </p>

          <input
            type="text"
            id="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="New Password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-500 transition"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>

          <Link
            to="/create-listing"
            className="bg-green-600 text-white p-3 rounded-lg text-center hover:bg-green-500 transition"
          >
            Create Listing
          </Link>

          <div className="flex justify-between text-sm mt-4">
            <span onClick={handleDeleteUser} className="text-red-500 cursor-pointer hover:underline">
              Delete Account
            </span>
            <span onClick={handleSignOut} className="text-red-500 cursor-pointer hover:underline">
              Sign Out
            </span>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {updateSuccess && <p className="text-green-500 mt-2">Profile updated!</p>}
        </form>

        <div className="mt-10">
          <button
            onClick={handleShowListings}
            className="w-full border border-green-500 text-green-500 py-2 rounded-lg hover:bg-green-100"
          >
            Show My Listings
          </button>

          {showListingsError && (
            <p className="text-red-500 text-center mt-3">Failed to load listings.</p>
          )}

          {userListings && userListings.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-semibold text-white text-center">Your Listings</h2>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="flex justify-between items-center p-4 bg-white text-gray-800 rounded-lg shadow"
                >
                  <Link to={`/listing/${listing._id}`} className="flex items-center gap-4">
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <span className="font-semibold">{listing.name}</span>
                  </Link>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="text-green-500 hover:underline">Edit</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
