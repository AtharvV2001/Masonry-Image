import { useEffect, useRef, useState } from "react";

const ITEMS_PER_LOAD = 10;

const MasonryGrid = ({ images }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, images.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [images.length]);

  return (
    <>
      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          xl:columns-5
          gap-4
        "
      >
        {images.slice(0, visibleCount).map((img) => (
          <div
            key={img.id}
            className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl group"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="
                w-full
                rounded-xl
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />

            {/* Hover Overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/70
                via-black/20
                to-transparent
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
                flex items-end
                p-3
              "
            >
              <div className="w-full flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium">{img.author}</p>
                  <p className="text-xs opacity-80">{img.alt}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full">
                    ❤️
                  </button>
                  <span>{img.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loaderRef} className="h-10" />
    </>
  );
};

export default MasonryGrid;
