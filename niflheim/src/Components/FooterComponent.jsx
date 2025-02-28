import React from "react";
import "@fontsource/inter";

const FooterComponent = () => {
  return (
<div className="flex flex-col items-center justify-center w-full h-fit overflow-hidden">
      <object data="/src/assets/footer.svg" type="image/svg+xml" className="w-full h-full z-0 relative"/>
      <div className="w-[100%] absolute h-fit inset-0 mt-[5%] md:mt-[5%] sm:mt-[5%] z-1 flex flex-col text-center">
        <h2 className="font-vazir justify-center h-fit flex w-4/5 sm:w-3/4 md:w-75/100 text-[16px] sm:text-[32px] md:text-[46px] leading-[30px] sm:leading-[55px] md:leading-[75px] text-center text-white font-bold">
          نیفل هایم  
        </h2>

        <h2 className="font-vazir justify-center h-fit flex w-4/5 sm:w-3/4 md:w-75/100  text-[16px] sm:text-[32px] md:text-[46px] leading-[30px] sm:leading-[55px] md:leading-[75px] text-center text-white font-bold">
          گامی به سوی آینده        
        </h2>
        <div className="flex md:mt-[240px] sm:mt-[110px] mt-[100px] flex-col bg-[#1B1B1B]">
          <h2 className="font-vazir justify-center px-[50px] h-fit flex text-[24px] self-end sm:text-[12px] md:flex-row sm:md:flex-col flex-col md:text-[46px] sm:text-[32px] leading-[10vw] sm:leading-[8vw] md:leading-[7vw] text-center text-white font-bold">
            نظرات      
          </h2>
          <div className="gap-[15vw] px-[50px] w-full h-fit flex inset-0 mt-[5px] z-1 flex flex-row md:flex-row sm:flex-row flex-col justify-end items-end flex-wrap overflow-hidden">  
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard className="md:flex sm:flex hidden"/>
            <ReviewCard className="md:flex sm:flex hidden"/>
          </div>
          <div className="flex gap-[5vw] h-fit bg-[#1B1B1B] px-[50px] w-full inset-0 md:mt-[70px] sm:mt-[70px] mt-[40px] z-1 flex flex-row flex-wrap-reverse md:justify-end sm:justify-end justify-center items-center overflow-hidden">  
            <div className="flex bg-[#1B1B1B] flex-col md:w-[160px] sm:w-[210px] w-[500px] items-center">
              <p class="font-inter text-[20px] sm:text-[26px] md:text-[24px] md:flex sm:flex hidden font-bold leading-[29.05px] tracking-[0%] text-white">
                شبکه های اجتماعی        
              </p>
              <div className="flex bg-[#1B1B1B] flex-row mt-[7px] md:gap-[10px] sm:gap-[20px] gap-[40px]">
                <a href="#">
                  <object data="/src/assets/Telegram.svg" type="image/svg+xml" className="md:w-[40px] md:h-[37px] sm:w-[30px] sm:h-[29px] w-[20px] h-[21px]"/>
                </a>
                <a href="#">
                  <object data="/src/assets/Linkedin.svg" type="image/svg+xml" className="md:w-[40px] md:h-[37px] sm:w-[30px] sm:h-[29px] w-[20px] h-[21px]"/>
                </a>
                <a href="#">
                  <object data="/src/assets/Twitterbird.svg" type="image/svg+xml" className="md:w-[40px] md:h-[37px] sm:w-[30px] sm:h-[29px] w-[20px] h-[21px]"/>
                </a>
                <a href="#">
                  <object data="/src/assets/Instagram.svg" type="image/svg+xml" className="md:w-[40px] md:h-[37px] sm:w-[30px] sm:h-[29px] w-[20px] h-[21px]"/>
                </a>
              </div>
            </div>
            <SvgBox svgName="samandehi"/>
            <SvgBox svgName="e_namad"/>
            <div className="flex bg-[#1B1B1B] justify-center items-center gap-[6vh] md:ml-[40px] sm:ml-[40px] ml-[0px] my-[30px]">
              <div className="flex flex-wrap md:flex-row sm:flex-row flex-col bg-[#1B1B1B] md:gap-[3vw] sm:gap-[5vw] gap-[6vw] max-w-[780px] md:w-fit sm:w-fit w-[400px] justify-center items-center ">
                <TextComponent>قوانین و مقرارات</TextComponent>
                <TextComponent>سوالات متداول</TextComponent>
                <TextComponent>تماس با ما</TextComponent>
                <TextComponent>درباره ما</TextComponent>
              </div>
            </div>
          </div>
          <div className="flex h-fit w-[95%] bg-[#1B1B1B] inset-0 mt-[40px] z-1 flex flex-col self-center justify-center border border-white"/>
          <div className="flex h-fit w-[95%] bg-[#1B1B1B] inset-0 my-[20px] z-1 flex flex-col self-center justify-center">  
            <p class="font-vazirmatn text-[16px] font-normal leading-[25px] tracking-[0%] text-center text-white">
              © تمام حقوق برای نیفل هایم محفوظ است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;

const ReviewCard = ({ className = "" }) => {
  return (
    <div className={`flex flex-col md:max-w-[160px] sm:max-w-[200px] items-end overflow-hidden ${className}`}>
      <h3 className="font-inter font-bold sm:text-[13px] md:text-[16px] leading-[18.15px] tracking-[0%] text-right text-white font-bold">
        سایت زیبا و سریع دارید      
      </h3>
      <div className="flex flex-row mt-[3px]">
        <object data="/src/assets/star_filled.svg" type="image/svg+xml" className="w-[24px] h-[22px]"/>
        <object data="/src/assets/star_filled.svg" type="image/svg+xml" className="w-[24px] h-[22px]"/>
        <object data="/src/assets/star_filled.svg" type="image/svg+xml" className="w-[24px] h-[22px]"/>
        <object data="/src/assets/star_filled.svg" type="image/svg+xml" className="w-[24px] h-[22px]"/>
        <object data="/src/assets/star_filled.svg" type="image/svg+xml" className="w-[24px] h-[22px]"/>
      </div>
      <div className="flex flex-row mt-[3px]">
        <p className="font-inter sm:text-[12px] md:text-[14px] font-normal leading-[16.94px] tracking-[0%] text-right text-white">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ازصنعت چاپ، و با استفاده از طرامی باشد
        </p>
      </div>
    </div>
  );
};

const SvgBox = ({ svgName }) => {
  return (
    <div className="flex flex-col max-w-[160px] items-center">
      <div className="md:w-[148px] md:h-[150px] sm:w-[105px] sm:h-[104px] w-[78px] h-[74px] flex border border-[#D9D9D9] bg-[#1B1B1B] items-center justify-center">
        <object data={`/src/assets/${svgName}.svg`} type="image/svg+xml" className="md:w-[121px] md:h-[132px] sm:w-[86px] sm:h-[94px] w-[71px] h-[70px]"/>
      </div>
    </div>
  );
};

const TextComponent = ({ children }) => {
  return (
    <p className="font-inter md:text-[32px] sm:text-[24px] text-[24px] font-normal leading-[38.73px] text-white tracking-[0%]">
      {children}
    </p>
  );
};




