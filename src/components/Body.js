import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
   return restaurants.filter((restaurant) => restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
};

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {getRestaurants()},[]);

    async function getRestaurants() {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8991793&lng=77.6669909&collection=80424&tags=layout_CCS_Dosa&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
            const response = await data.json();
            const restaurantListObj = {cards:[]};
            response.data.cards.forEach((card, index) => {
                if (card.card.card.info) {
                    restaurantListObj.cards.push(card.card.card);
                }
            });

            setAllRestaurants(restaurantListObj.cards);
            setFilteredRestaurants(restaurantListObj.cards);
            console.log(restaurantListObj);
        } catch (error) {
            console.log(error);
        }
    }

    const searchData = (searchText, restaurants) => {
        if (searchText !== "") {
            const filteredData = filterData(searchText,restaurants);
            setFilteredRestaurants(filteredData);
            setErrorMessage("");
            if (filteredData?.length === 0){
                setErrorMessage("No match restaurants found");
            }
        } else {
            setErrorMessage("");
            setFilteredRestaurants(restaurants);
        }
    }

    if (!allRestaurants) return null;

    return (
        <>
            <div className="search-container">
                <input typ="text" className="search-input" placeholder="Search a restaurant you want.." value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <button className="search-btn" onClick={()=>{const data = filterData(searchText, restaurants);setRestaurants(data)}}>Search</button>
            </div>
            {errorMessage && <div className="error-container">{errorMessage}</div> }
            {allRestaurants?.length === 0 ? (<Shimmer/>) : (<div className="restaurant-list">
                {filteredRestaurants.map(restaurant =>
                    <RestaurantCard {...restaurant.info} key={restaurant.info.id}/>)
                }
            </div>)}
        </>
    )

};

export default Body;
