import { useEffect, useRef, useState } from "react";

const ITEMS_PER_LOAD = 10;

const MasonryGridS = ({ images }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
          <div key={img.id} className="mb-4 break-inside-avoid">
            {/* Card */}
            <div className="rounded-xl border bg-white p-3 shadow-sm hover:shadow-md transition group">
              {/* Preview */}
              <div className="relative overflow-hidden rounded-lg bg-gray-300">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

                {/* Top-left dot */}
                <span className="absolute top-2 left-2 h-3 w-3 rounded-full bg-white" />

                {/* Preview button */}
                <button
                  className="
                    absolute inset-0
                    m-auto
                    h-10 w-28
                    rounded-full
                    border border-white
                    text-white
                    flex items-center justify-center gap-2
                    opacity-0
                    group-hover:opacity-100
                    transition
                    bg-black/30
                    backdrop-blur-sm
                  "
                >
                  👁 Preview
                </button>
              </div>

              {/* Info */}
              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium text-gray-800">{img.alt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-gray-100">
                      📄
                    </span>
                    <span>PDF</span>
                  </div>

                  <span>{img.likes ?? "—"} KB</span>
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

export default MasonryGridS;
