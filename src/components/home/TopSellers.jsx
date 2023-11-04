import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState();

  async function getTopSellers() {
    setLoading(true);
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getTopSellers();
  }, [])


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {!loading ?
                topSellers.map((topSeller) => (
                  <li key={topSeller.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={topSeller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{topSeller.authorName}</Link>
                      <span>{topSeller.price} ETH</span>
                    </div>
                  </li>
                )) :
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                        <div className="skeleton-box skeleton-pp"></div>
                        <i className="fa skeleton-fa"></i>
                    </div>
                    <div className="author_list_info author_list_info--skeleton">
                      <div className="skeleton-box skeleton__top-seller--name"></div>
                      <div className="skeleton-box skeleton__top-seller--price"></div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
