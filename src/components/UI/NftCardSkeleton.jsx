import React from "react";

function NftCardSkeleton() {
    return (
        <div className="slide">
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
    )
}

export default NftCardSkeleton;