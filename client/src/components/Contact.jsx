import { useEffect, useState } from 'react';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (err) {
        console.error('Error fetching landlord:', err);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSendMessage = () => {
    if (!landlord || !message.trim()) return;
  
    const email = landlord.email;
    const subject = `Regarding ${listing.name}`;
    const body = message;
  
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  
    window.location.href = mailtoURL;
  };
  
  
  
  

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>

          <textarea
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`text-white text-center p-3 uppercase rounded-lg hover:opacity-95 ${
              message.trim()
                ? 'bg-slate-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
// 