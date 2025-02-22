import React from "react";
import { Carousel, Image } from "antd";
import { homePageCarousal } from "../../constants/home";
import { useWindowSize } from "src/utils/useWindowSize";

const Home = () => {
  const { isMobile } = useWindowSize();
  return (
    <>
      <Carousel
        autoplay
        autoplaySpeed={2000}
        dots={isMobile}
        arrows={!isMobile}
      >
        {homePageCarousal.map((i, k) => (
          <React.Fragment key={k}>
            <Image src={i} height={500} width={"100%"} preview={false} />
          </React.Fragment>
        ))}
      </Carousel>
    </>
  );
};

export default Home;
