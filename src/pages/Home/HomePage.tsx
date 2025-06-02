import Header from "../../Components/MainContent/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1] dark:bg-gray-800"></div>
      <div className="flex flex-col bg-[#F7F7F7] w-screen h-screen dark:bg-gray-800 overflow-auto">
        <Header showSearch={false} />

        <MainContent />

        <div className="bg-white dark:bg-gray-800">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
