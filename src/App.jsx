import { useState, lazy, Suspense } from "react";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";

// Lazy Loaded Sections for Performance (Code Splitting)
const Stats = lazy(() => import("./sections/Stats"));
const Services = lazy(() => import("./sections/Services"));
const Locations = lazy(() => import("./sections/Locations"));
const Gallery = lazy(() => import("./sections/Gallery"));
const Safety = lazy(() => import("./sections/Safety"));
const Clients = lazy(() => import("./sections/Clients"));
const Contact = lazy(() => import("./sections/Contact"));

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div
        className={`transition-opacity duration-700 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <Nav />
        <main>
          <Hero loaded={loaded} />
          {loaded && (
            <Suspense fallback={<div className="min-h-screen bg-navy flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>}>
              <Stats />
              <Services />
              <Locations />
              <Gallery />
              <Safety />
              <Clients />
              <Contact />
            </Suspense>
          )}
        </main>
      </div>
    </>
  );
}
