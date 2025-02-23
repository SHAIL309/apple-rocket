import React from "react";
import { Carousel, ConfigProvider, Image } from "antd";
import { homePageCarousal } from "../../constants/home";
import { useWindowSize } from "src/utils/useWindowSize";

const Home = () => {
  const { isMobile } = useWindowSize();
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              arrowSize: 28,
              arrowOffset: 16,
            },
          },
        }}
      >
        <Carousel
          autoplay
          autoplaySpeed={2000}
          dots={isMobile}
          arrows={!isMobile}
          draggable
        >
          {homePageCarousal.map((i, k) => (
            <React.Fragment key={`${i}-${k}`}>
              <Image
                src={i}
                height={isMobile ? "80dvh" : 600}
                width={"100%"}
                preview={false}
                alt={i}
                style={{
                  objectFit: "contain",
                }}
              />
            </React.Fragment>
          ))}
        </Carousel>
      </ConfigProvider>
    </>
  );
};

export default Home;
