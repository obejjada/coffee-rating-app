import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      coffeeDrinks:[],
      activeDrink:{
        id:null,
        dateTime:null,
        coffeeShop:'',
        coffeeBeverage:'',
        rating:null
      }
    }
    this.fetchDrinks = this.fetchDrinks.bind(this)
  };

  componentWillMount(){
    this.fetchDrinks()
  }

  fetchDrinks(){
    console.log('Fetching')

    fetch('http://127.0.0.1:8000/coffee_database/api/coffee_drinks/all/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        coffeeDrinks:data
      })
      )
 }
  
  render(){
    var drinks = this.state.coffeeDrinks
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
          {drinks.map(function(drink, index){
            return(
              <tr key={index}>
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
  }
}

export default App;
