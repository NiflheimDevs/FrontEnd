import { useRef, useEffect, useState } from "react";
import Header from "../Components/MainContent/Header";
import MainContent from "../Components/MainContent/MainContent";
import Footer from "../Components/Footer/Footer";

const HomePage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>

      <div className="flex flex-col bg-[#F7F7F7] min-h-screen w-screen">
        <div ref={headerRef}>
          <Header showSearch={false} />
        </div>

        <MainContent headerHeight={headerHeight} />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
