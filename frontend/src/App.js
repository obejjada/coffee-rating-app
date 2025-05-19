import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import CoffeeDrinks from './pages/coffeeDrinks';

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
      <Router>
        <Navigation></Navigation>
        <Routes>
        <Route path="/rate_coffee_Drinks" element={<CoffeeDrinks />} />
        </Routes>
      </Router>
    
    </div>
    )
  }
}

export default App;
