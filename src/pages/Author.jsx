import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {

  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState();
  const [followers, setFollowers] = useState()
  const [nftCollection, setNftCollection] = useState([]);

  async function getAuthor() {
    setLoading(true);
    const { data } = await axios
      .get
      (`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
    setAuthor(data);
    setNftCollection(data.nftCollection);
    setFollowers(data.followers);
    setLoading(false);
  }

  useEffect(() => {
    getAuthor();
  }, [])

  function incrementFollowers() {
    setFollowers(prevFollowers => prevFollowers + 1);
  }

  function decrementFollowers() {
    setFollowers(prevFollowers => prevFollowers - 1);
  }



  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {
          !loading && author.authorId === +id ?
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${nftCollection[0]?.nftImage}) top` }}
            ></section>
            :
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light skeleton-box"
              data-bgimage="url(images/author_banner.jpg) top"
            ></section>
        }

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {
                !loading && author.authorId === +id ?
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">@{author.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">{followers} followers</div>
                          {
                            followers > author.followers ?
                              <button to="#" className="btn-main" onClick={() => decrementFollowers()}>
                                Unfollow
                              </button>
                              :
                              <button to="#" className="btn-main" onClick={() => incrementFollowers()}>
                                Follow
                              </button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <div className="skeleton-box author__skeleton-pp"></div>

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4 className="author__skeleton-info--wrapper">
                              <div className="skeleton-box author__skeleton-name"></div>
                              <span className="profile_username skeleton-box author__skeleton-tag"></span>
                              <span id="wallet" className="profile_wallet skeleton-box author__skeleton-address">
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower skeleton-box author__skeleton-button"></div>

                        </div>
                      </div>
                    </div>
                  </div>
              }

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    id={id}
                    author={author}
                    nftCollection={nftCollection}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
