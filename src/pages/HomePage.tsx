import Header from "../Components/MainContent/Header"; // Adjust the path based on your file structure
import MainContent from "../Components/MainContent/MainContent"; // Adjust the path based on your file structure
import Footer from "../Components/Footer/Footer"; // Adjust the path based on your file structure

const HomePage = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="flex flex-col bg-[#F7F7F7] min-h-screen">
        {/* Header - Hide search */}
        <Header showSearch={false} />

        {/* Main Content */}
        <MainContent />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;