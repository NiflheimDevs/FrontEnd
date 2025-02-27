import React from "react";

const FooterComponent = () => {
  return (
    <div className="flex overflow-hidden w-full h-fit">
      <object
        data="/src/assets/footer.svg"
        type="image/svg+xml"
        className="w-full h-full"
      >
      </object>
    </div>
  );
};

export default FooterComponent;
