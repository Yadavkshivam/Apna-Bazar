import { useState, useEffect, useRef } from "react";

export default function NewsSlider() {
  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data.news || []));
  }, []);

  // Auto slide
  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % news.length);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [index, news.length]);

  if (news.length === 0)
    return <p className="text-center text-gray-500">Loading news...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto my-10 relative">
      {/* Slider Container */}
      <div className="overflow-hidden relative rounded-xl shadow-xl">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {news.map((item, i) => (
            <div key={i} className="min-w-full relative">
              <img
                src={item.image || "/placeholder.jpg"}
                className="w-full h-64 object-cover"
              />

              {/* Content Overlay */}
              <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm line-clamp-2">{item.summary}</p>
                <a
                  href={item.url}
                  target="_blank"
                  className="text-yellow-300 underline text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() =>
            setIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1))
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setIndex((prev) => (prev + 1) % news.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
        >
          ❯
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {news.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === i ? "bg-green-600 scale-125" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
