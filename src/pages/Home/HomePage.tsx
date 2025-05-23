import Header from "../../Components/MainContent/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] dark:bg-gray-900 z-[-1]"></div>
      <div className="flex flex-col bg-[#F7F7F7] dark:bg-gray-900 w-screen h-screen">
        <Header showSearch={false} />

        <MainContent />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
