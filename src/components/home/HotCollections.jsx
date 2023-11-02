import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../UI/assets/left-arrow.svg";
import rightArrow from "../UI/assets/right-arrow.svg";

const HotCollections = () => {

  const [hotCollections, setHotCollections] = useState([]);
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
  }


  async function getHotCollections() {
    setLoading(true);
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    setHotCollections(data);
    setLoading(false);
  };

  useEffect(() => {
    getHotCollections();
  }, [])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ?
            <Slider {...settings} className="slides">
              {hotCollections.map((hotCollection) => (
                <div className="slide" key={hotCollection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={hotCollection.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={hotCollection.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hotCollection.title}</h4>
                      </Link>
                      <span>ERC-{hotCollection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            :
            <Slider {...settings} className="slides">
              {new Array(6).fill(0).map((_, index) => (
                <div className="slide" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="skeleton-box"></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="skeleton-box skeleton-pp"></div>
                      <i className="fa skeleton-fa"></i>
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton-box skeleton-title"></div>
                      <div className="skeleton-box skeleton-code"></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
