import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const UnitForm = () => {  
  
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId , setEditingId] = useState('');  
  const [price , setPrice] = useState('');
  const [size , setSize] = useState('');
  const [stockQuant,setStockQuant] = useState('');
  const [unitoptions,setUnitOptions] = useState([]);
  const [units,setUnits] = useState([]);
  const navigate = useNavigate();
//   const [pid, setPid] = useState('');
   const {pid}= useParams();
  const fetchunit = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/size/${pid}`);
      setUnits(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchunit();
    axios.get('http://localhost:5000/units')
          .then(res => setUnitOptions(res.data))
          .catch(err => console.error(err));
}, []);
    
    
    

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = {
    
    unit,
    quantity,
    price,
    size,
    stockQuant,
    pid,

    }
   try {
     
         if (editingId) {
            const res = await axios.put(`http://localhost:5000/size/${editingId}`, uploadData,
              
            );
            // setCategory(category.map(parent => (parent._id === editingId ? res.data : parent)));
            setEditingId(null);
        } else {
            const res = await axios.post('http://localhost:5000/size', uploadData);
            // setCategory([...category, res.data]);
        }
        setUnit('');
        setQuantity('');
        setEditingId('');  
        setPrice('');
        setSize('');
        setStockQuant('');
        fetchunit();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/size/${id}`);
    setUnits(units.filter((u) => u._id !== id));
  };


const handleEdit = (u) => {
  setEditingId(u._id);
  setUnit(u.unit);
  setQuantity(u.quantity);  
  setPrice(u.price);
  setSize(u.size);
  setStockQuant(u.stockQuant);
   
};
const bp = () =>{
  navigate("/product");
}


  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">Product Size</h2>

   
      <form onSubmit={handleSubmit}>
        
          <div className="mb-3 col-6">
            <label className="form-label">Units</label>
            <CFormSelect
              value={unit}
              onChange={(e)=>setUnit(e.target.value)}
            >
              <option value="">Select Unit</option>
              {unitoptions.map((parent)=>(
                <option key={parent._id} value={parent._id}>{parent.unitName}</option>
              ))}
                
            </CFormSelect>
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Size</label>
            <input
              type="text"
              className="form-control"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Stock Quantity</label>
            <input
              type="text"
              className="form-control"
              value={stockQuant}
              onChange={(e) => setStockQuant(e.target.value)}
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
        <th>Unit</th>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Size</th>
        <th>Stock Quantity</th>
      </tr>
    </thead>
    <tbody>
      {units.map((u) => (
        <tr key={u._id}>
          <td>{u.unit}</td>
          <td>{u.pid?.productName}</td>
          <td>{u.quantity}</td>
          <td>{u.price}</td>
          <td>{u.size}</td>
          <td>{u.stockQuant}</td>
         
          <td>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(u)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(u._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {units.length === 0 && (
        <tr>
          <td className="py-3 text-muted" colSpan="9">
            No Units Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

       
    </div>
  );
};

export default UnitForm;
