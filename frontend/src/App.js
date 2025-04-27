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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
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

  var url = 'http://127.0.0.1:8000/coffee_database/api/coffee_drinks/create/'

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
    console.log(response.status)
      this.fetchDrinks()
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

handleChange(e){
  var name = e.target.name
  var value = e.target.value
  console.log('Name:', name)
  console.log('Value:', value)
  
  this.setState({
    activeDrink:{
      ...this.state.activeDrink,
      [name]:value
  }
  })
  
}

getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
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
      <div id ='submit_form' className='submit_form'>
            <form onSubmit={this.handleSubmit} id='form'>
              <th>Coffee Beverage</th>
              <th>Coffee Shop</th>
              <th>Coffee rating</th>
              <tr>
                <td>
                  <input onChange={this.handleChange} className='form-control' placeholder='Enter coffee beverage' value={this.state.activeDrink.coffeeBeverage} type="text" name='coffeeBeverage' id="coffeeBeverage" />
                </td>
                <td>
                  <input onChange={this.handleChange} className='form-control' placeholder='Enter coffee shop name' value={this.state.activeDrink.coffeeShop} type="text" name='coffeeShop' id='coffeeShop'></input>
                </td>
                <td>
                  <input onChange={this.handleChange} className='form-control' placeholder='Enter rating' value={this.state.activeDrink.rating} type='number' name='rating' id='rating' ></input>
                </td>
                <td>
                  <input id='submit'type='submit'></input>
                </td>
              </tr>
            </form>
          </div>      
    </div>
    
    )
  }
}

export default App;
