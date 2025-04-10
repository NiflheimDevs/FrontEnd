
const Footer = () => {
  return (
<div className="ltr flex flex-col items-center justify-center w-full h-fit relative">
      <object data="/src/assets/footer.svg" type="image/svg+xml" className="w-full h-full z-0 relative"/>
      <div className="w-[100%] absolute h-fit inset-0 mt-[5%] md:mt-[5%] sm:mt-[5%] z-1 flex flex-col text-center">

        <h2 className="font-vazir justify-center h-fit flex w-4/5 sm:w-3/4 md:w-75/100 text-[26px] sm:text-[34px] md:text-[50px] leading-[30px] sm:leading-[55px] md:leading-[75px] text-center text-white font-bold">
          BidLancer  
        </h2>

        <h2 className="font-vazir justify-center h-fit flex w-4/5 sm:w-3/4 md:w-75/100 text-[26px] sm:text-[34px] md:text-[50px] leading-[30px] sm:leading-[55px] md:leading-[75px] text-center text-white font-bold">
          گامی به سوی آینده        
        </h2>
        
        <div className="flex md:mt-[11%] sm:mt-[110px] mt-[45px] flex-col bg-[#1B1B1B]">
          <div className="gap-[14vw] px-[50px] w-full md:h-[100px] sm:h-fit h-fit flex inset-0 mt-[5px] z-1 md:flex-row sm:flex-row flex-col justify-center items-end flex-wrap">  
              <ReviewCard
                title="سایت زیبا و سریع دارید"
                description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ازصنعت چاپ، و با استفاده از طراحی باشد"
                starCount={5}
              />
              <ReviewCard
                title="سایت زیبا و سریع دارید"
                description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ازصنعت چاپ، و با استفاده از طراحی باشد"
                starCount={4}
              />
              <ReviewCard
                title="سایت زیبا و سریع دارید"
                description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ازصنعت چاپ، و با استفاده از طراحی باشد"
                starCount={3}
                className="md:flex sm:flex hidden"
              />
              <ReviewCard
                title="سایت زیبا و سریع دارید"
                description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ازصنعت چاپ، و با استفاده از طراحی باشد"
                starCount={2}
                className="md:flex sm:flex hidden"
              />
          </div>
          <div className="flex gap-[2vw] h-fit bg-[#1B1B1B] px-[40px] w-full inset-0 md:mt-[70px] sm:mt-[70px] mt-[40px] z-1 flex-row flex-wrap-reverse md:justify-center sm:justify-end justify-center items-center ">  
            <div className="flex bg-[#1B1B1B] flex-col md:w-[160px] sm:w-[210px] w-[500px] items-center">
              <p className="font-inter text-[20px] sm:text-[26px] md:text-[24px] md:flex sm:flex hidden font-bold leading-[29.05px] tracking-[0%] text-white">
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
            <div className="flex flex-row w-fit items-center">
              <SvgBox svgName="samandehi"/>
              <SvgBox svgName="e_namad"/>
            </div>
            <div className="flex bg-[#1B1B1B] justify-center items-center gap-[6vh] md:ml-[40px] sm:ml-[40px] ml-[0px] my-[30px]">
              <div className="flex flex-wrap md:flex-row sm:flex-row flex-row bg-[#1B1B1B] md:gap-[5.2vw] sm:gap-[5vw] gap-[12vw] max-w-[900px] md:w-fit sm:w-fit w-[400px] justify-center items-center ">
                <TextComponent>قوانین و مقررات</TextComponent>
                <TextComponent>سوالات متداول</TextComponent>
                <TextComponent>تماس با ما</TextComponent>
                <TextComponent>درباره ما</TextComponent>
              </div>
            </div>
          </div>
          <div className="flex h-fit w-[95%] bg-[#1B1B1B] inset-0 mt-[30px] z-1 opacity-[0.7] flex-col self-center justify-center border border-white"/>
          <div className="flex h-fit w-[95%] bg-[#1B1B1B] inset-0 my-[20px] z-1 flex-col self-center justify-center">  
            <p className="font-vazirmatn text-[16px] opacity-[0.7] font-normal leading-[25px] tracking-[0%] text-center text-white">
              © تمام حقوق برای این سایت محفوظ است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ className = "", title, description, starCount }:any) => {
  return (
    <div className={`flex flex-col md:max-w-[160px] sm:max-w-[200px] items-end ${className}`}>
      <h3 className="font-inter font-bold sm:text-[13px] md:text-[16px] leading-[18.15px] tracking-[0%] text-right text-white">
        {title}     
      </h3>
      <div className="flex flex-row mt-[3px]">
        {Array.from({ length: (5 - starCount) }, (_, index) => (
          <object
            key={index}
            data="/src/assets/star_empty.svg"
            type="image/svg+xml"
            className="w-[24px] h-[22px]"
          />
        ))}
        {Array.from({ length: starCount }, (_, index) => (
          <object
            key={index}
            data="/src/assets/star_filled.svg"
            type="image/svg+xml"
            className="w-[24px] h-[22px]"
          />
        ))}
      </div>
      <div className="flex flex-row mt-[3px]">
        <p className="font-inter sm:text-[12px] md:text-[14px] font-normal leading-[16.94px] tracking-[0%] text-right text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

const SvgBox = ({ svgName }:any) => {
  return (
    <div className="md:w-[148px] md:h-[150px] sm:w-[105px] sm:h-[104px] w-[78px] h-[74px] flex bg-[#1B1B1B] items-center justify-center">
      <object data={`/src/assets/${svgName}.svg`} type="image/svg+xml" className="md:w-[121px] md:h-[132px] sm:w-[86px] sm:h-[94px] w-[71px] h-[70px] border-none border-[#1B1B1B]"/>
    </div>
  );
};

const TextComponent = ({ children }:any) => {
  return (
    <p className="font-vazirmatn text-[25px] opacity-[0.85] font-normal leading-[25px] tracking-[0%] text-center text-white">
      {children}
    </p>
  );
};

export default Footer;