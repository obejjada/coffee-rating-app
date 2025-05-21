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
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchDrinks();
    }, []);

    
    const fetchDrinks = async () => {
      const res = await fetch('http://127.0.0.1:8000/coffee_database/api/coffee_drinks/all/');
      const data = await res.json();
      setCoffeeDrinks(data);
    };

    const handleSubmit= async (e) => {
      e.preventDefault()
      var csrftoken = getCookie('csrftoken')

      var url = 'http://127.0.0.1:8000/coffee_database/api/coffee_drinks/create/'

      if(editing == true){
        url = `http://127.0.0.1:8000/coffee_database/api/coffee_drinks/update/${ activeDrink.id}/`
        setEditing(false)
      }

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify(activeDrink)
      }).then((response)  => {
        console.log(response.status)
        fetchDrinks()
        setActiveDrink({
        id:null,
        formatted_datetime:null,
        coffee_shop:'',
        coffee_beverage:'',
        rating:''
    });
      }).catch(function(error){
        console.log('ERROR:', error)
      })
    };

    const startEdit = async (drink) => {
        setActiveDrink(drink)
        setEditing(true)
    }

    const handleChange = async (e) => {
        var name = e.target.name
        var value = e.target.value
        
        setActiveDrink(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const deleteDrink = async (drink) => {
        var csrftoken = getCookie('csrftoken')

        fetch(`http://127.0.0.1:8000/coffee_database/api/coffee_drinks/delete/${drink.id}/`, {
          method:'DELETE',
          headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
          },
        }).then((response) =>{
          fetchDrinks()
        })
      }
      
    const getCookie = async (name) =>{
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

  return(
    <div className="container">
      <div id="coffee-drinks-container">
        <table className='coffee-drinks-table'>
            <tbody>
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
                      <td>
                        <button onClick={() => startEdit(drink)} className='editDrinkbtn'name='editDrink'>Edit</button>
                        <button onClick={() => deleteDrink(drink)} className='deleteDrinkbtn'name='deleteDrink'>Delete</button>
                      </td>
                    </tr>
                    )
                  })}
            </tbody>
        </table>
      </div>
      <div id ='submit_form' className='submit_form'>
            <table>
                <tbody>
                    <tr>
                      <th>Coffee Beverage</th>
                      <th>Coffee Shop</th>
                      <th>Coffee rating</th>
                    </tr>
                    <tr>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter coffee beverage' value={activeDrink.coffee_beverage} type="text" name='coffee_beverage' id="coffeeBeverage" />
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter coffee shop name' value={activeDrink.coffee_shop} type="text" name='coffee_shop' id='coffeeShop'></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter rating' value={activeDrink.rating} type='number' name='rating' id='rating' ></input>
                      </td>
                      <td>
                        <form onSubmit={handleSubmit} id='form'>
                            <input id='submit'type='submit'></input>
                        </form>
                      </td>
                    </tr>
                </tbody>
            </table>
           
          </div>
    </div>
  )

};
export default RatedCoffeeDrinks;