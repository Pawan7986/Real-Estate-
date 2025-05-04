import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

SwiperCore.use([Navigation]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 bg-black/60">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/realestate.mp4" // Path to the video in the public folder
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-6xl text-white">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight md:text-7xl">
            Find Your Dream Property
          </h1>
          <p className="text-xl mb-8 leading-relaxed max-w-lg mx-auto">
            Discover luxury homes, villas, and apartments that fit your lifestyle.
          </p>
          <Link
            to="/search"
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all ease-in-out duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Featured Listings Swiper */}
      <section className="mt-12 px-6 py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white font-semibold text-center mb-8">
            Featured Listings
          </h2>

          <Swiper
            navigation
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <Link to={`/listing/${listing._id}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 duration-300">
                    <img
                      src={listing.imageUrls[0]}
                      alt={listing.name}
                      className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Listings Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Offers Section */}
        {offerListings.length > 0 && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl text-white font-semibold">Exclusive Royal Offers</h2>
              <Link to="/search?offer=true" className="text-white font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent Section */}
        {rentListings.length > 0 && (
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-2xl shadow-xl mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl text-white font-semibold">Exclusive Rentals</h2>
              <Link to="/search?type=rent" className="text-white font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {rentListings.map((listing) => (
                <div
                  key={listing._id}
                  className="group relative bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    className="w-full h-64 object-cover rounded-t-lg"
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
                    <p className="text-gray-500 mt-2">{listing.description}</p>
                    <div className="mt-4">
                      <Link
                        to={`/listing/${listing._id}`}
                        className="text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-2 px-4 rounded-full inline-block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sale Section */}
        {saleListings.length > 0 && (
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-2xl shadow-xl mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl text-white font-semibold">Homes for Sale</h2>
              <Link to="/search?type=sale" className="text-white font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {saleListings.map((listing) => (
                <div
                  key={listing._id}
                  className="group relative bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    className="w-full h-64 object-cover rounded-t-lg"
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
                    <p className="text-gray-500 mt-2">{listing.description}</p>
                    <div className="mt-4">
                      <Link
                        to={`/listing/${listing._id}`}
                        className="text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-2 px-4 rounded-full inline-block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
