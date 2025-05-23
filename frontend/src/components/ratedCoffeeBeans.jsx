import React, { useState, useEffect } from 'react';

export const RatedCoffeeBeans = (props) => {
    const [coffeeBeans, setCoffeeBeans] = useState([]);
    const [activeBeans, setActiveBeans] = useState({
        id:null,
        formatted_datetime:null,
        roast_name:'',
        coffee_roaster:'',
        is_signle_origin:false,
        country_roaster:'',
        country_origin:'',
        region: '',
        flavour_notes:'',
        process:'',
        rating:'',
        comment:''
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchBeans();
    }, []);

    
    const fetchBeans = async () => {
      const res = await fetch('http://127.0.0.1:8000/coffee_database/api/coffee_beans/all/');
      const data = await res.json();
      setCoffeeBeans(data);
    };

    const handleSubmit= async (e) => {
      e.preventDefault()
      var csrftoken = getCookie('csrftoken')

      var url = 'http://127.0.0.1:8000/coffee_database/api/coffee_beans/create/'

      if(editing == true){
        url = `http://127.0.0.1:8000/coffee_database/api/coffee_beans/update/${ activeBeans.id}/`
        setEditing(false)
      }

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify(activeBeans)
      }).then((response)  => {
        console.log(response.status)
        fetchBeans()
        setActiveBeans({
        id:null,
        formatted_datetime:null,
        roast_name:'',
        coffee_roaster:'',
        is_signle_origin:false,
        country_roaster:'',
        country_origin:'',
        region: '',
        flavour_notes:'',
        process:'',
        rating:'',
        comment:''
    });
      }).catch(function(error){
        console.log('ERROR:', error)
      })
    };

    const startEdit = async (drink) => {
        setActiveBeans(drink)
        setEditing(true)
    }

    const handleChange = async (e) => {
        var name = e.target.name
        var value = e.target.value
        
        setActiveBeans(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const deleteBean = async (drink) => {
        var csrftoken = getCookie('csrftoken')

        fetch(`http://127.0.0.1:8000/coffee_database/api/coffee_beans/delete/${drink.id}/`, {
          method:'DELETE',
          headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
          },
        }).then((response) =>{
          fetchBeans()
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
      <div id="coffee-beans-container">
        <table className='coffee-beans-table'>
            <tbody>
                <tr>
                  <th>Date & Time</th>
                  <th>Roast Name</th>
                  <th>Coffee Roaster</th>
                  <th>Single Origin</th>
                  <th>Roaster Country</th>
                  <th>Coffee Origin(s)</th>
                  <th>Region</th>
                  <th>Flavour Notes</th>
                  <th>Process</th>
                  <th>Rating</th>
                  <th>Comments</th>
                </tr>
                {coffeeBeans.map(function(bean, index){
                  return(
                    <tr key={index}>
                      <td hidden>{bean.id}</td>
                      <td>{bean.formatted_datetime}</td>
                      <td>{bean.roast_name}</td>
                      <td>{bean.coffee_roaster}</td>
                      <td>{bean.is_signle_origin ? 'True':'False'}</td>
                      <td>{bean.country_roaster}</td>
                      <td>{bean.country_origin.map((countries,index)=>(
                        <div key={index}>{countries}</div>))}
                      </td>
                      <td>{bean.region}</td>
                      <td>{bean.flavour_notes.map((flavours,index)=>(
                      <div key={index}>{flavours}</div>))}
                      </td>
                      <td>{bean.process}</td>
                      <td>{bean.rating}</td>
                      <td>{bean.comment}</td>
                      <td>
                        <button onClick={() => startEdit(bean)} className='editBtn'name='editBean'>Edit</button>
                        <button onClick={() => deleteBean(bean)} className='deleteBtn'name='deleteBean'>Delete</button>
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
                      <th>Roast Name</th>
                      <th>Coffee Roaster</th>
                      <th>Single Origin</th>
                      <th>Roaster Country</th>
                      <th>Coffee Origin(s)</th>
                      <th>Region</th>
                      <th>Flavour Notes</th>
                      <th>Process</th>
                      <th>Rating</th>
                      <th>Comments</th>
                    </tr>
                    <tr>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter roast Name' value={activeBeans.roast_name} type="text" name='roast_name' id="roastName" />
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter roaster name' value={activeBeans.coffee_roaster} type="text" name='coffee_roaster' id='roasterName'></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='is signle origin' value={activeBeans.is_signle_origin} type='checkbox' name='is_signle_origin' id='singleOrigin' ></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter coffee beverage' value={activeBeans.country_roaster} type="text" name='country_roaster' id="roasterCountry" />
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter coffee shop name' value={activeBeans.country_origin} type="text" name='country_origin' id='originCountry'></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter rating' value={activeBeans.region} type='text' name='region' id='region' ></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter coffee beverage' value={activeBeans.flavour_notes} type="text" name='flavour_notes' id="flavourNotes" />
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter process' value={activeBeans.process} type="text" name='process' id='process'></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter rating' value={activeBeans.rating} type='number' name='rating' id='rating' ></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter comments' value={activeBeans.comment} type="text" name='comment' id='comment'></input>
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
export default RatedCoffeeBeans;