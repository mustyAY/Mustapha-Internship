import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";
import Aos from "aos";
import "aos/dist/aos.css";

const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState();

  async function getExploreItems(filter) {
    setLoading(true)
    const { data } = await axios
      .get
      (`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`);
    setExploreItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getExploreItems(filter);
    Aos.init({
      duration: 1500,
      once: true
    });
  }, [filter]);

  function loadMoreItems() {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading ?
        exploreItems.slice(0, visibleItems).map((exploreItem) => (
          <div
            key={exploreItem.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="fade-zoom-in"
            data-aos-delay="100"
          >
            <NftCard item={exploreItem} />
          </div>
        ))
        :
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftCardSkeleton />
          </div>
        ))
      }
      {
        visibleItems < exploreItems.length - 1 ?
          <div
            className="col-md-12 text-center"
            data-aos="fade-in-zoom"
          >
            <button id="loadmore" className="btn-main lead"
              onClick={() => loadMoreItems()}
            >
              Load more
            </button>
          </div>
          :
          <></>
      }
    </>
  );
};

export default ExploreItems;
