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

 handleSubmit(e){
  e.preventDefault()
  console.log('ITEM:', this.state.activeDrink)

  var csrftoken = this.getCookie('csrftoken')

  var url = 'http://127.0.0.1:8000/coffee_database/api/coffee_drinks/all/'

  /*if(this.state.editing == true){
    url = `http://127.0.0.1:8000/api/task-update/${ this.state.activeItem.id}/`
    this.setState({
      editing:false
    })
  }
*/


  fetch(url, {
    method:'POST',
    headers:{
      'Content-type':'application/json',
      'X-CSRFToken':csrftoken,
    },
    body:JSON.stringify(this.state.activeDrink)
  }).then((response)  => {
      this.fetchTasks()
      this.setState({
        activeItem:{
          id:null,
          dateTime:null,
          coffeeShop:'',
          coffeeBeverage:'',
          rating:null
      }
      })
  }).catch(function(error){
    console.log('ERROR:', error)
  })

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
          <div className='submit_form'>
            <form onSubmit={this.handleSubmit} id='form'>
              <tr>
                <td>
                <input className='coffee_shop' placeholder='Enter coffee shop name' value={this.activeDrink.coffee_shop} type='text' name='coffee_shop' ></input>
                </td>
                </tr>
            </form>
            
          </div>
        </div>
    )
  }
}

export default App;
