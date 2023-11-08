import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../UI/assets/left-arrow.svg";
import rightArrow from "../UI/assets/right-arrow.svg";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";
import Aos from "aos";
import "aos/dist/aos.css";

const NewItems = () => {

  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState();

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={leftArrow} alt="<" {...props} className="arrow__left" />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={rightArrow} alt=">" {...props} className="arrow__right" />
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 979,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  async function getNewItems() {
    setLoading(true);
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setNewItems(data);
    setLoading(false);
  };

  useEffect(() => {
    getNewItems();
    Aos.init({
      duration: 1500,
      once: true
    });
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade-zoom-in"
                data-aos-duration="200"
              >
                New Items
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            !loading ?
              <Slider {...settings} className="slides">
                {newItems.map((newItem) => (
                  <div className="slide" key={newItem.id}>
                    <NftCard item={newItem} />
                  </div>
                ))}
              </Slider>
              :
              <Slider {...settings} className="slides">
                {new Array(7).fill(0).map((_, index) => (
                  <NftCardSkeleton key={index} />
                ))}
              </Slider>
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
