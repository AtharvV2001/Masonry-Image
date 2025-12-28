const GridSpanGallery = ({ images }) => {
  const getSpanClasses = (index) => {
    const patterns = [
      "col-span-1 row-span-1",
      "col-span-1 row-span-2",
      "col-span-2 row-span-1",
      "col-span-2 row-span-2",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        auto-rows-[120px]
        gap-4
      "
    >
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`relative overflow-hidden rounded-xl group ${getSpanClasses(
            index
          )}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="
              h-full w-full
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
              via-black/30
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition
              duration-300
              flex items-end
              p-3
            "
          >
            <p className="text-white text-sm font-medium">{img.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridSpanGallery;
