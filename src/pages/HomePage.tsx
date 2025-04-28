import Header from "../Components/MainContent/Header";
import MainContent from "../Components/MainContent/MainContent";
import Footer from "../Components/Footer/Footer";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="بهترین فریلنسرها و کارفرماها را پیدا کنید. پروژه بگیرید یا ثبت کنید و از راه دور کسب درآمد کنید. طراحی، برنامه‌نویسی، ترجمه، تولید محتوا و ده‌ها مهارت دیگر!" />
      </Helmet>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="flex flex-col bg-[#F7F7F7] w-screen h-screen">
        <Header showSearch={false} />

        <MainContent />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
