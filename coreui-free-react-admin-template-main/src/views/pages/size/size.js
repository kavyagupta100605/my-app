import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const ImageForm = () => {  
  
  const [baseImage, setBaseImage] = useState(null);
  const [image, setImage] = useState([]);
  const [editingId , setEditingId] = useState('');  
  const [type , setType] = useState('');
  const navigate = useNavigate();
//   const [pid, setPid] = useState('');
   const {pid}= useParams();
  const fetchImage = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/image/${pid}`);
      setImage(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchImage();
}, []);
    
    const handleImageChange = (e) => {
    setBaseImage(e.target.files[0]);
    setType(e.target.files[0].name)
  };
    

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const index=type.indexOf(".");
    const final=type.slice(index+1);
    const uploadData = new FormData();
    
  uploadData.append('baseImage', baseImage);
  uploadData.append('pid', pid);
  uploadData.append('type',final);

    try {
     
         if (editingId) {
            const res = await axios.put(`http://localhost:5000/image/${editingId}`, uploadData,
              { headers: { 'content-type': 'multipart/form-data' }}
            );
            // setCategory(category.map(parent => (parent._id === editingId ? res.data : parent)));
            setEditingId(null);
        } else {
            const res = await axios.post('http://localhost:5000/image', uploadData);
            // setCategory([...category, res.data]);
        }

      

     
      setBaseImage(null);
      fetchImage();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/image/${id}`);
    setImage(image.filter((i) => i._id !== id));
  };


const handleEdit = (i) => {
  setEditingId(i._id);
  
  setBaseImage(null); // You can keep this null as image is not re-uploaded on edit
};
const bp = () =>{
  navigate("/product");
}


  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">IMAGE</h2>

   
      <form onSubmit={handleSubmit}>
        
          <div className="mb-3 col-6">
            <label className="form-label">Base Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
        

        
          

        <button type="submit" className="btn btn-success m-3">
          {editingId ? 'Update' : 'Submit'}
        </button>

        <button type="btn" className="btn btn-success m-3" onClick={bp}>
          PRODUCT
        </button>
      </form>

      <div className="table-responsive">
  <table className="table table-bordered table-striped text-center align-middle shadow">
    <thead className="bg-primary text-white">
      <tr>
        
        <th>Base Image</th>
        <th>Product Id</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {image.map((i) => (
        <tr key={i._id}>
          <td>
            {i.baseImage ? (
              <img
                src={`http://localhost:5000/uploads/${i.baseImage}`}
                alt="Product"
                className="img-thumbnail"
                style={{ width: '60px', height: '60px' }}
              />
            ) : (
              'No image'
            )}
          </td>
          <td>{i.pid?.productName}</td>
          <td>{i.type}</td>
         
          <td>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(i)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(i._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {image.length === 0 && (
        <tr>
          <td className="py-3 text-muted" colSpan="9">
            No Images Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

       
    </div>
  );
};

export default ImageForm;
