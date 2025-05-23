import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import CoffeeDrinks from './pages/coffeeDrinks';
import CoffeeBeans from './pages/coffeeBeans';

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

  };
  
  render(){

    return(
    <div>
      <Router>
        <Navigation></Navigation>
          <Routes>
            <Route path="/rate_coffee_Drinks" element={<CoffeeDrinks />} />
            <Route path="/rate_coffee_Beans" element={<CoffeeBeans />} />
          </Routes>
      </Router>
    </div>
    )
  }
}

export default App;
