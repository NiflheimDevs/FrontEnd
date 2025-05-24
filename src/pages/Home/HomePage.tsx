import Header from "../../Components/MainContent/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1] dark:bg-[#080808]"></div>
      <div className="flex flex-col bg-[#F7F7F7] w-screen h-screen dark:bg-[#080808]">
        <Header showSearch={false} />

        <MainContent />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
