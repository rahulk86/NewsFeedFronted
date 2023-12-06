import React from "react";
import "./index.css";
const Rightside = (props) => {
  return (
    <div class="rightside">
  <div class="follow-card">
    <div class="title">
      <h2>Add to your feed</h2>
      <img src="/images/feed-icon.svg" alt="" />
    </div>

    <ul class="feed-list">
      <li>
        <a>
          <div class="avatar"></div>
        </a>
        <div>
          <span>#Linkedin</span>
          <button>Follow</button>
        </div>
      </li>
      <li>
        <a>
          <div class="avatar"></div>
        </a>
        <div>
          <span>#Video</span>
          <button>Follow</button>
        </div>
      </li>
    </ul>

    <a class="recommendation">
      View all recommendations
      <img src="/images/right-icon.svg" alt="" />
    </a>
  </div>

  <div class="banner-card">
    <img
      src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
      alt=""
    />
  </div>
</div>

  );
};

export default Rightside;
