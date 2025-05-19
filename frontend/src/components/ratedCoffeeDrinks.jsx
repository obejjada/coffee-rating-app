import React, { useState, useEffect } from 'react';

export const RatedCoffeeDrinks = (props) => {
    const [coffeeDrinks, setCoffeeDrinks] = useState([]);
    const [activeDrink, setActiveDrink] = useState({
        id:null,
        formatted_datetime:null,
        coffee_shop:'',
        coffee_beverage:'',
        rating:null
    });

    useEffect(() => {
        fetchDrinks();
    }, []);

    
  const fetchDrinks = async () => {
    const res = await fetch('http://127.0.0.1:8000/coffee_database/api/coffee_drinks/all/');
    const data = await res.json();
    setCoffeeDrinks(data);
  };

  return(
    <div className="container">
      <div id="coffee-drinks-container">
        <table className='coffee-drinks-table'>
          <tr>
            <th>Date & Time</th>
            <th>Coffee Beverage</th>
            <th>Coffee Shop</th>
            <th>Coffee rating</th>
          </tr>
          {coffeeDrinks.map(function(drink, index){
            return(
              <tr key={index}>
                <td hidden>{drink.id}</td>
                <td>{drink.formatted_datetime}</td>
                <td>{drink.coffee_beverage}</td>
                <td>{drink.coffee_shop}</td>
                <td>{drink.rating}</td>
              </tr>
              )
            })}
        </table>
      </div>
    </div>
  )

};
export default RatedCoffeeDrinks;