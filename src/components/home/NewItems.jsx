import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../UI/assets/left-arrow.svg";
import rightArrow from "../UI/assets/right-arrow.svg";
import CountdownTimer from "../UI/CountdownTimer";

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
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            !loading ?
              <Slider {...settings} className="slides">
                {newItems.map((newItem) => (
                  <div className="slide" key={newItem.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={newItem.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {
                        newItem.expiryDate ?
                          <CountdownTimer expiryDate={newItem.expiryDate} />
                          :
                          <></>
                      }
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to="/item-details">
                          <img
                            src={newItem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{newItem.title}</h4>
                        </Link>
                        <div className="nft__item_price">{newItem.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              :
              <Slider {...settings} className="slides">
                {new Array(7).fill(0).map((_, index) => (
                  <div className="slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div className="skeleton-box skeleton-pp"></div>
                        <i className="fa skeleton-fa"></i>
                      </div>
                      <div className="nft__item_wrap">
                        <div className="skeleton-box"></div>
                      </div>
                      <div className="nft__item_info nft__item-info--skeleton">
                        <div className="skeleton-box skeleton__new-item--title"></div>
                        <div className="skeleton-box skeleton__new-item--price"></div>
                        <div className="nft__item_like skeleton-box skeleton__new-item--like"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
