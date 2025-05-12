import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Navigation } from "./components/navigation";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      coffeeDrinks:[],
      activeDrink:{
        id:null,
        formatted_datetime:null,
        coffee_shop:'',
        coffee_beverage:'',
        rating:null
      },
      editing:false,
    }

    this.fetchDrinks = this.fetchDrinks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.deleteDrink = this.deleteDrink.bind(this)
  };

  componentWillMount(){
    this.fetchDrinks()
  }

  fetchDrinks(){
    
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
  var csrftoken = this.getCookie('csrftoken')

  var url = 'http://127.0.0.1:8000/coffee_database/api/coffee_drinks/create/'

  if(this.state.editing == true){
    url = `http://127.0.0.1:8000/coffee_database/api/coffee_drinks/update/${ this.state.activeDrink.id}/`
    this.setState({
      editing:false
    })
  }

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
        activeDrink:{
          id:null,
          formatted_datetime:null,
          coffee_shop:'',
          coffee_beverage:'',
          rating:''
      }
      })
  }).catch(function(error){
    console.log('ERROR:', error)
  })

}

startEdit(drink){
  this.setState({
    activeDrink:drink,
    editing:true,
  })
}

handleChange(e){
  var name = e.target.name
  var value = e.target.value

  this.setState({
    activeDrink:{
      ...this.state.activeDrink,
      [name]:value
  }
  })
  
}

deleteDrink(drink){
  var csrftoken = this.getCookie('csrftoken')

    fetch(`http://127.0.0.1:8000/coffee_database/api/coffee_drinks/delete/${drink.id}/`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
    }).then((response) =>{
      this.fetchDrinks()
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
    var self = this
    return(
    <div>
      <Navigation></Navigation>
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
                <td hidden>{drink.id}</td>
                <td>{drink.formatted_datetime}</td>
                <td>{drink.coffee_beverage}</td>
                <td>{drink.coffee_shop}</td>
                <td>{drink.rating}</td>
                <button onClick={()=> self.startEdit(drink)} className='editDrinkbtn'name='editDrink'>Edit</button>
                <button onClick={()=> self.deleteDrink(drink)} className='deleteDrinkbtn'name='deleteDrink'>Delete</button>
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
                  <input onChange={this.handleChange} className='form-control' placeholder='Enter coffee beverage' value={this.state.activeDrink.coffee_beverage} type="text" name='coffee_beverage' id="coffeeBeverage" />
                </td>
                <td>
                  <input onChange={this.handleChange} className='form-control' placeholder='Enter coffee shop name' value={this.state.activeDrink.coffee_shop} type="text" name='coffee_shop' id='coffeeShop'></input>
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
    </div>
    )
  }
}

export default App;
