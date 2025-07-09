import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const BrandForm = () => {
  const [brandName, setBrandName] = useState('');
  const [since, setSince] = useState('');
  const [Aboutbrand, setAboutBrand] = useState('');
  const [brandLogo, setBrandLogo] = useState(null);
  const [brandStatus, setBrandStatus] = useState("");
  const [editingid,setEditingId] = useState("");
  const [brand, setBrand] = useState([]);
  const fetchBrands = async () => {
    try {
      const res = await axios.get('http://localhost:5000/brand')
      setBrand(res.data)
    }catch(err){
      console.log(err);
    }
  }

useEffect(() => {
    fetchBrands();
    }, []);
  

 

  const handleImageChange = (e) => {
    setBrandLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('brandName', brandName);
    uploadData.append('Aboutbrand', Aboutbrand);
    uploadData.append('since', since);
    uploadData.append('brandLogo', brandLogo);
    uploadData.append('brandStatus', brandStatus);

    try {
      if (editingid) {
        console.log("hello")
            const res = await axios.put(`http://localhost:5000/brand/${editingid}`, uploadData,
              { headers: { 'content-type': 'multipart/form-data' }}
            );
            // setBrand(brand.map(parent => (parent._id === editingid ? res.data : parent)));
            setEditingId(null);
        } else {
            const res = await axios.post('http://localhost:5000/brand', uploadData);
            setBrand([...brand, res.data]);
        }

      // Clear fields
      setBrandName('');
      setAboutBrand('');
      setSince('');
      setBrandStatus('');
      setBrandLogo(null);
      fetchBrands();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/brand/${id}`)
    setBrand(brand.filter(parent => parent._id !== id));
  }

  const handleUpdate = async(parent)=>{
      setEditingId(parent._id)
      setBrandName(parent.brandName);
      setAboutBrand(parent.Aboutbrand);
      setSince(parent.since);
      setBrandStatus(parent.brandStatus);
      setBrandLogo(null);
  }

  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className="mb-3 col-6">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              className="form-control"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-6">
            <label className="form-label">About Brand</label>
            <textarea
              className="form-control"
              rows="1"
              value={Aboutbrand}
              onChange={(e) => setAboutBrand(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className='row'>
          <div className="mb-3 col-6">
            <label className="form-label">Since</label>
            <input
              type="date"
              className="form-control"
              value={since}
              onChange={(e) => setSince(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-6">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              value={brandStatus}
              onChange={(e) => setBrandStatus(e.target.value)}
              required
            />
          </div>
        </div>

        

        <div className="mb-3">
          <label className="form-label"> Brand Logo </label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            
          />
        </div>

        <button type="submit" className="btn btn-success w-10 m-3" >
          Submit
        </button>

      </form>
       <div className="table-responsive">
                        <table className="table table-bordered table-striped text-center align-middle shadow">
                            <thead className="bg-primary text-white">
                                <tr>

                                    <th>Brand Name</th>
                                    <th>About Brand</th>
                                    <th>Since</th>
                                    <th>Status</th>
                                    <th>Brand Logo</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brand.map((parent) => (
                                    <tr key={parent._id}>
                                        <td>{parent.brandName}</td>
                                        <td>{parent.Aboutbrand}</td>
                                        <td>{parent.since}</td>
                                        <td>{parent.brandStatus}</td>
                                        <td><img src={`http://localhost:5000/uploads/${parent.brandLogo}`} alt="Profile" className="img-thumbnail w-25 h-25" /></td>
                                        <td>
                                          <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(parent)}>Edit</button>
                                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(parent._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
    </div>
  );
};

export default BrandForm;
