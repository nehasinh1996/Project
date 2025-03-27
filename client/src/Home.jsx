
import Header from "./components/Header";
import CarouselComponent from "./components/CarouselComponent";
import TestimonialCarousel from "./components/TestimonialCarousel";
import BannerAnimate from "./components/BannerAnimate";
import SelfCare from "./components/SelfCare";

const Home = () => {
  return (
    <>
      <Header />
      <CarouselComponent />
      
      <div className="mt-5">
      <SelfCare/> {/* ✅ Display Collections Below Carousel */}
      <BannerAnimate/>
      </div>
      <div className="mt-30">
        <TestimonialCarousel/>
      </div>

    </>
  );
};

export default Home;
