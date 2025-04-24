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
          {drinks.map(function(drink, index){
            return(
              <div key={index} className='listwrapper flex-wrapper'>
              <div style={{flex:1}}>
                <span>{drink.coffee_beverage}</span>
              </div>
              <div style={{flex:2}} >
                <span>{drink.coffee_shop}</span>
              </div>
              <div style={{flex:1}}>
                <span>{drink.rating}</span>
              </div>
              </div>)
          })}
          </div>
        </div>
    )
  }
}

export default App;
