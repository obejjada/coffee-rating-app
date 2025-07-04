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
        country_origin:[''],
        region: '',
        flavour_notes:[''],
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
        country_origin:[''],
        region: '',
        flavour_notes:[''],
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
    
    const handleCountryChange = async (index, value) => {
      const updatedCountries = [...activeBeans.country_origin];
      updatedCountries[index] = value;
      setActiveBeans(prev => ({...prev, country_origin:updatedCountries}))
    };

    const addCountryField = () => {
    setActiveBeans(prev => ({
      ...prev,
      country_origin: [...prev.country_origin, ''],
    }));
  };

    const removeCountryField = (index) => {
      if (activeBeans.country_origin.length <= 1) return;
      setActiveBeans(prev => ({
      ...prev,
      country_origin: prev.country_origin.filter((_, i) => i !== index),
    }));
  };

      const handleFlavourNote = async (index, value) => {
      const updatedFlavourNotes = [...activeBeans.flavour_notes];
      updatedFlavourNotes[index] = value;
      setActiveBeans(prev => ({...prev, flavour_notes:updatedFlavourNotes}))
    };

    const addFlavourNotes = () => {
    setActiveBeans(prev => ({
      ...prev,
      flavour_notes: [...prev.flavour_notes, ''],
    }));
  };

  const removeFlavourNote = (index) => {
      if (activeBeans.flavour_notes.length <= 1) return;
      setActiveBeans(prev => ({
      ...prev,
      flavour_notes: prev.flavour_notes.filter((_, i) => i !== index),
    }));
  };
      
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
                        <input onChange={handleChange} className='form-control' placeholder='is it signle origin' value={activeBeans.is_signle_origin} type='text' name='is_signle_origin' id='singleOrigin' ></input>
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Enter roaster country' value={activeBeans.country_roaster} type="text" name='country_roaster' id="roasterCountry" />
                      </td>
                      <td>
                          {activeBeans.country_origin.map((country, index) => (
                            <div key={index}>
                              <input
                              type='text'
                              vaue={country}
                              onChange={e => handleCountryChange(index, e.target.value)}>
                              </input>
                              <div>
                                <button type="button" onClick={() => removeCountryField(index)}>Remove</button>
                              </div>
                            </div>
                          ))}
                          <div>
                           <button type="button" onClick={addCountryField}>Add Another Country</button>
                          </div>
                          
                      </td>
                      <td>
                        <input onChange={handleChange} className='form-control' placeholder='Region' value={activeBeans.region} type='text' name='region' id='region' ></input>
                      </td>
                      <td>
                          {activeBeans.flavour_notes.map((notes, index) => (
                            <div key={index}>
                              <input
                              type='text'
                              vaue={notes}
                              onChange={e => handleFlavourNote(index, e.target.value)}>
                              </input>
                              <div>
                                <button type="button" onClick={() => removeFlavourNote(index)}>Remove</button>
                              </div>
                            </div>
                          ))}
                          <div>
                           <button type="button" onClick={addFlavourNotes}>Add Another flavour note</button>
                        </div>
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