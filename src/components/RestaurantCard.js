import { IMG_CDN_URL } from "./../constants";

const RestaurantCard = ({name,cuisines,cloudinaryImageId,avgRating,sla}) =>{
    //const {slaString,lastMileTravelString} = restaurant.info.sla;
    return (
        <div className="card">
            <img src={IMG_CDN_URL+cloudinaryImageId}/>
            <h2>{name}</h2>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{sla.slaString}</h3>
            <h3>{sla.lastMileTravelString}</h3>
            <h4>{avgRating} stars</h4>
        </div>
    )
}

export default RestaurantCard;