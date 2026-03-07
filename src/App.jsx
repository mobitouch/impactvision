import { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Services from "./sections/Services";
import Locations from "./sections/Locations";
import Gallery from "./sections/Gallery";
import Safety from "./sections/Safety";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div className={`transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Nav />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Locations />
          <Gallery />
          <Safety />
          <Clients />
          <Contact />
        </main>
      </div>
    </>
  );
}
