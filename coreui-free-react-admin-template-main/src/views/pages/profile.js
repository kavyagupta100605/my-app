import {useEffect, useState} from 'react'
import axios from 'axios'
import { CFormSelect } from '@coreui/react'



const Profile = () => {
  
  const [name,setName] = useState("");
  const [tele,setTele] = useState("");
  const [gender,setGender] = useState("");
  const [qual,setQual] = useState("");
  const [date,setDate] = useState("");
  const [image,setImage] = useState(null);
  const [email,setEmail] = useState(null);
  
  
  
  useEffect(()=>{
    const userstring=localStorage.getItem("user");
    const user=JSON.parse(userstring);
    const emaildata={email:user.email}
    setEmail(user.email);
    axios.get('http://localhost:5000/profile',{params:emaildata})
    
      .then((res) =>{
        setName(res.data.name)
        setTele(res.data.tele)
        setGender(res.data.gender)
        setQual(res.data.qual)
        setDate(res.data.date)
        setImage(res.data.image)
      })
      .catch(err => console.log(err));
    
  },[])
   const handleChange = async (e) => {
    if(e.target.name === "image")
    {
      setImage(e.target.files[0]);
    }
    
   };
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      const uploadData = new FormData();
      uploadData.append("name",name);
      uploadData.append("tele",tele);
      uploadData.append("gender",gender);
      uploadData.append("qual",qual);
      uploadData.append("date",date);
      uploadData.append("image",image);
      uploadData.append("email",email);

      // //debugging : Check FormData values
      // for(let pair of uploadData.entries()){
      //   console.log(pair[0] + ":" + pair[1]);
      // }
      await axios.post('http://localhost:5000/profile' ,uploadData);
      setName('');
      setTele('');
      setGender('');
      setQual('');
      setDate('');
      setImage(null);
      
  }
  return (
    <div className="card p-4 shadow w-50 mx-auto mt-5">
      <h2 className="text-center mb-4">User Profile</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="name"
            name='name'
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile No</label>
          <input
            type="tel"
            name='tele'
            className="form-control"
            value={tele}
            onChange={(e) => setTele(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
        <label>
              <h6>Gender</h6>
          </label>
          <input className="form-check-input" 
          type="radio"  
          id="flexRadioDefault1"
          name="gender"
          onClick={(e) => setGender(e.target.value)}
          value='M'
          checked={gender === 'M'}
          />
          <label className="form-check-label" for="flexRadioDefault1">
              M
          </label>
                                
                                
          <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" 
          onClick={(e) => setGender(e.target.value)}
          value='F'
          checked={gender === 'F'}
          />

           <label className="form-check-label" for="flexRadioDefault2">
               F
          </label>           
        </div>
        <div className="mb-3">
            <CFormSelect aria-label="Default select example" onChange={(e) => setQual(e.target.value)} name='qual' value={qual}>
                <option>Open this select menu</option>
                <option value='1' >One</option>
                <option value='2' >Two</option>
                <option value='3' >Three</option>
            </CFormSelect>                
        </div>
        <div className="mb-3">
            <div className='row'>
                <div className='col-6'>
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name='date'
                        className="form-control"
                        id='currdate'
                        format="yyyy-MM-dd"
                        value={date.slice(0,10)}
                         onChange={(e) => setDate(e.target.value)}
                         required
                    />   
                </div>
                <div className='col-6'>
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id='age'
                        // value={tele}
                        // onChange={(e) => setTele(e.target.value)}
                        // required
                    />   
                </div>

          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
              type="file"
              className="form-control"
              name='image'
               onChange={handleChange}
               required
          />   
         </div>
        <div className="mb-3">
          <img src={`http://localhost:5000/uploads/${image}`} alt="Profile" className="img-fluid" />
         </div>

        <button type="submit" className="btn btn-warning w-100">
          SUBMIT
        </button>
        </form>

      {/* {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>} */}
    </div>
  );
};

export default Profile;
