import { restaurantList } from "./../constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";

function filterData(searchText, restaurants) {
   return restaurants.filter((restaurant) => restaurant.info.name.includes(searchText));
};

const Body = () => {
    const [restaurants, setRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");
    
    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8991793&lng=77.6669909&collection=80424&tags=layout_CCS_Dosa&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
        const json = await data.json();
        console.log(json);
       // setRestaurants(json.data.car)
    }

    useEffect(() => {
        // API Call
        getRestaurants();
        console.log("Render the page");
    }, []);

    

    return (
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
                    const data = filterData(searchText, restaurants);
                    setRestaurants(data);
                    getRestaurants();
                   
                }}
            >Search-{searchText}</button>
        </div>
        
        <div className="restaurant-list">
            {
                restaurants.map(restaurant => {
                    return <RestaurantCard {...restaurant.info} key={restaurant.info.id}/>
                })
            }
        </div>
        </>
    );
};

export default Body;