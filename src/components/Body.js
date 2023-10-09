import { restaurantList } from "./../constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
   return restaurants.filter((restaurant) => restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
};

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState(restaurantList);
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");
    
    useEffect(() => {
        // API Call
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8991793&lng=77.6669909&collection=80424&tags=layout_CCS_Dosa&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
        const json = await data.json();
        console.log(json);
        // Optional Chaining
        //setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        //setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    }

    if (!allRestaurants) return null;    // early return

    if(filteredRestaurants.length === 0) return <h1>No Restaurant match your search !!</h1>

    return (allRestaurants.length === 0 ? <Shimmer/> :(
        <>
        <div className="search-container">
            <input type="text"
                className="search-input"
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
            <button className="search-btn"
                onClick={() => {                  
                    const data = filterData(searchText, filteredRestaurants);
                    setFilteredRestaurants(data);
                }}
            >Search-{searchText}</button>
        </div>
        
        <div className="restaurant-list">
            {/* You have to write logic for No restaurant found here */}
            {
                filteredRestaurants.map(restaurant => {
                    return <RestaurantCard {...restaurant.info} key={restaurant.info.id}/>
                })
            }
        </div>
        </>
    ));
};

export default Body;