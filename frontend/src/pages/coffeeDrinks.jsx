import {RatedCoffeeDrinks} from "../components/ratedCoffeeDrinks";

export const CoffeeDrinks = (props) => {
  return (
  <div>
    <RatedCoffeeDrinks></RatedCoffeeDrinks>
  </div>
  )
}
export default CoffeeDrinks;

/*<div className="container">
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
    *///