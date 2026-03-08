import { useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import FloatingActions from "./components/FloatingActions";
import Hero from "./sections/Hero";

// Lazy Loaded Sections for Performance (Code Splitting)
const Stats = lazy(() => import("./sections/Stats"));
const Services = lazy(() => import("./sections/Services"));
const Locations = lazy(() => import("./sections/Locations"));
const Gallery = lazy(() => import("./sections/Gallery"));
const Safety = lazy(() => import("./sections/Safety"));
const Clients = lazy(() => import("./sections/Clients"));
const Contact = lazy(() => import("./sections/Contact"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

const LoadingSpinner = () => (
  <div className="min-h-screen bg-navy flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

function HomePage({ loaded }) {
  return (
    <>
      <Hero loaded={loaded} />
      {loaded && (
        <Suspense fallback={<LoadingSpinner />}>
          <Stats />
          <Services />
          <Locations />
          <Gallery />
          <Safety />
          <Clients />
          <Contact />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const isGalleryPage = location.pathname === "/gallery";

  return (
    <LazyMotion features={domAnimation}>
      <CustomCursor />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div
        className={`transition-opacity duration-700 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {!isGalleryPage && <Nav />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage loaded={loaded} />} />
            <Route
              path="/gallery"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <GalleryPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
      {!isGalleryPage && <FloatingActions />}
    </LazyMotion>
  );
}

