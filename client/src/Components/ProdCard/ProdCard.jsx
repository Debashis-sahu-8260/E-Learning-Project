import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./prod.css";
import React from "react";
import { LightTooltip } from "../LandingPage/Landin";
import { PopperCard } from "./popperprodcard";

export const ProdCard = React.forwardRef(function ProdCard(props, ref) {

  return (
    <Link
      style={{ height: "auto" }}
      className="prodLink"
      to={`/courses/${props.data?._id}`}
    >
      <div {...props} ref={ref} className="prodcard">
        <img className="prodimg" src={props.data?.image} alt="" />
        <h3 className="card-title">
          {props.data?.title}
        </h3>
        <div className="author">{props.data?.author}</div>
        <div className="rating-div">
          <span className="rate-num">{props.data?.rating || 4.3}</span>
          <Rating
            name="read-only"
            size="small"
            precision={0.5}
            value={props.data?.rating || 4.3}
            readOnly
          />
          <span className="rate-count">(1200)</span>
        </div>
        <div className="price-bar">
          <span className="price">₹{props.data?.price}</span>
          <span className="oldprice">₹{+props.data?.price + 1000}</span>
        </div>
        {/* </Link> */}
      </div>
    </Link>
  );
});


export const TechCard = () => {
  const categories = [
    { name: 'Design', img: 'https://img.freepik.com/free-vector/landing-page-template-website_23-2147782753.jpg?t=st=1728656882~exp=1728660482~hmac=4c00f6c71f084c707689fe0584cad73cf5d9e5cc1692489f579ae61b8c36c064&w=740' },
    { name: 'Development', img: 'https://img.freepik.com/free-vector/flat-computer-engineering-concept_23-2148152149.jpg?t=st=1728656803~exp=1728660403~hmac=115889e88f721709f33675ec83f2c261295bf36ee6da222407b0969ee9fc8fbe&w=740' },
    { name: 'Marketing', img: 'https://img.freepik.com/free-vector/marketing-elements-background-flat-style_23-2147765683.jpg?t=st=1728656442~exp=1728660042~hmac=36ea56200d94301994877b29499b5f2a8f3164051759dbb26e528790d6713300&w=740' },
    { name: 'Business', img: 'https://img.freepik.com/free-vector/business-people-silhouettes-modern-city_23-2147490919.jpg?t=st=1728656482~exp=1728660082~hmac=e7b506b7ce30f91f583903780bd8595ca5a3155668ee65f2a58ae58694a9ccc4&w=740' },
    { name: 'Photography', img: 'https://img.freepik.com/free-vector/photographer-characters_23-2147531945.jpg?t=st=1728656522~exp=1728660122~hmac=713295e17fed0ee3114e7b3aab1f64f78e8d71b96e7cf8a2546037cec83cb5a3&w=740' },
    { name: 'Music', img: 'https://img.freepik.com/free-photo/3d-music-related-scene_23-2151124442.jpg?t=st=1728656568~exp=1728660168~hmac=4ae60885b788d16e31616e929a85f5032b47143b97723e7edb38a395dd75a719&w=740' },
    { name: 'Health', img: 'https://img.freepik.com/free-vector/earth-globe-with-stethoscope-fruit-vegetable_1308-129104.jpg?t=st=1728656618~exp=1728660218~hmac=a1806346d51c58a1b473db76ca28a33cb4ae4cd01c0eab295bb9b1eaff81a5ca&w=740' },
    { name: 'Personal Development', img: 'https://img.freepik.com/premium-photo/personal-branding-isometric-concept-with-businessman-selfpromotion-symbols-illustration_968529-271899.jpg?w=740' }
  ];

  return (
    <div className="tec-cont">
      <h2 className="title">Top Categories</h2>
      <div className="categories-flex">
        {categories.map((category, index) => (
          <div className="tec-card" key={index}>
            <img
              className="tec-img"
              src={category.img}
              alt={category.name}
            />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export const SuggestionCard = ({ title, data, category }) => {
  let products = data.filter((el) => el.category === category);

  return (
    <div className="tec-cont">
  <div>
    <h2>{title}</h2>
    <div className="prod-cont">
      {products.map((el) => (
        <LightTooltip
          arrow
          placement="right"
          title={<PopperCard data={el} />}
          key={el.id} // Ensure you have a unique key for each element
        >
          <div className="prod-card">
            <ProdCard data={el} />
          </div>
        </LightTooltip>
      ))}
    </div>
  </div>
</div>

  );
};
