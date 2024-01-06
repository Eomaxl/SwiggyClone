import { restaurantList } from "./../constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
   return restaurants.filter((restaurant) => restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
};

const Body = () => {
    const [restaurants, setRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");
    return (
        <>
            <div className="search-container">
                <input typ="text" className="search-input" placeholder="Search a restaurant you want.." value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <button className="search-btn" onClick={()=>{const data = filterData(searchText, restaurants);setRestaurants(data)}}>Search</button>
            </div>
            <div className="restaurant-list">
                {restaurants.map((restaurant)=>{return (<RestaurantCard key={restaurant.info.id}{...restaurant.info}/>)})}
            </div>
        </>
    )

};

export default Body;
