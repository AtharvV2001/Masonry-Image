import GridSpanGallery from "./col-images";
import { images } from "./data";
import MasonryGrid from "./image";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Masonry Image Gallery</h1>

        <MasonryGrid images={images} />
        <GridSpanGallery images={images} />
      </div>
    </>
  );
}

export default App;
