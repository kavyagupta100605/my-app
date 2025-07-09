import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const ProductForm = () => {  
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [baseImage, setBaseImage] = useState(null);
  const [baseSize, setBaseSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [editingId,setEditingId] = useState('');
  const [subcatoptions, setCatOptions] = useState([]);
  const [parentoptions, setParentOptions] = useState([]);
  const [product, setProduct] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [ssCategory, setSSCategory] = useState('');
  const [sscatoptions,setSSCatOptions] = useState([]);

  const fetchproduct = async () => {
    try {
      const res = await axios.get('http://localhost:5000/product');
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchproduct();
    
      axios.get('http://localhost:5000/category/parent')
          .then((res) => {
            setParentOptions(res.data)
          
  })
          .catch(err => console.error(err));
      }, []);
    const handlesubcat = (e) => {
     
      setParentCategory(e.target.value);
  
      axios.get('http://localhost:5000/category/sub/'+e.target.value)
        .then(res => setCatOptions(res.data))
        .catch(err => console.error(err));
    }
    const handleImageChange = (e) => {
    setBaseImage(e.target.files[0]);
  };
    const handlesubsubcat = (e) => {
     
      setSubCategory(e.target.value);
  
      axios.get('http://localhost:5000/category/subsub/'+e.target.value)
        .then(res => setSSCatOptions(res.data))
        .catch(err => console.error(err));
    }

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('productName', productName);
    uploadData.append('description', description);
    uploadData.append('baseImage', baseImage);
    uploadData.append('baseSize', baseSize);
    uploadData.append('quantity', quantity);
    uploadData.append('price', price);
    uploadData.append('parentCategory', parentCategory); 
    uploadData.append('subCategory', subCategory);     
    uploadData.append('ssCategory',ssCategory); 

    try {
     
         if (editingId) {
            const res = await axios.put(`http://localhost:5000/product/${editingId}`, uploadData,
              { headers: { 'content-type': 'multipart/form-data' }}
            );
            // setCategory(category.map(parent => (parent._id === editingId ? res.data : parent)));
            setEditingId(null);
        } else {
            const res = await axios.post('http://localhost:5000/product', uploadData);
            // setCategory([...category, res.data]);
        }

      

      setProductName('');
      setDescription('');
      setBaseImage(null);
      setBaseSize('');
      setQuantity('');
      setPrice('');
      setParentCategory('');
      setSubCategory('');
      setSSCategory('');
      fetchproduct();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/product/${id}`);
    setProduct(product.filter((p) => p._id !== id));
  };


const handleEdit = (p) => {
  setEditingId(p._id);
  setProductName(p.productName || '');
  setDescription(p.description || '');
  setBaseSize(p.baseSize || '');
  setQuantity(p.quantity || '');
  setPrice(p.price || '');
  setParentCategory(p.parentCategory?._id || p.parentCategory || '');
  setSubCategory(p.subCategory?._id || p.subCategory || '');
  setSSCategory(p.ssCategory?._id || p.ssCategory || '');
  setBaseImage(null); // You can keep this null as image is not re-uploaded on edit
};


  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">PRODUCT</h2>

   
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Description</label>
            <textarea
              row="1"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">Base Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
        

        
          <div className="mb-3 col-6">
            <label className="form-label">Base Size</label>
            <input
              type="text"
              className="form-control"
              value={baseSize}
              onChange={(e) => setBaseSize(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
        </div>
         <div className='row'>
          <div className="mb-3 col-4">
            <label className="form-label">Parent Category</label>
            <CFormSelect
              value={parentCategory}
              onChange={handlesubcat}
            >
              <option value="">Select Parent Category</option>
              <option value="0">Parent</option>
              {parentoptions.map((parent)=>(
                <option key={parent._id} value={parent._id}>{parent.categoryName}</option>
              ))}
                
            </CFormSelect>
          </div>

          <div className="mb-3 col-4">
            <label className="form-label">Sub Category</label>
            <CFormSelect
              value={subCategory}
              onChange={handlesubsubcat}
            >
              <option value="">Select Sub Category</option>
              <option value="0">None</option>
              {subcatoptions.map((parent)=>(
                <option key={parent._id} value={parent._id}>{parent.categoryName}</option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Sub Sub Category</label>
            <CFormSelect
              value={ssCategory}
              onChange={(e) => setSSCategory(e.target.value)}
            >
              <option value="">Select Sub Sub Category</option>
              <option value="0">None</option>
              {sscatoptions.map((parent)=>(
                <option key={parent._id} value={parent._id}>{parent.categoryName}</option>
              ))}
            </CFormSelect>
          </div>
        </div>

        <button type="submit" className="btn btn-success m-3">
          {editingId ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="table-responsive">
  <table className="table table-bordered table-striped text-center align-middle shadow">
    <thead className="bg-primary text-white">
      <tr>
        <th>Product Name</th>
        <th>Description</th>
        <th>Base Image</th>
        <th>Base Size</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Parent Category</th>
        <th>Sub Category</th>
        <th>Sub Sub Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {product.map((p) => (
        <tr key={p._id}>
          <td>{p.productName}</td>
          <td>{p.description}</td>
          <td>
            {p.baseImage ? (
              <img
                src={`http://localhost:5000/uploads/${p.baseImage}`}
                alt="Product"
                className="img-thumbnail"
                style={{ width: '60px', height: '60px' }}
              />
            ) : (
              'No image'
            )}
          </td>
          <td>{p.baseSize}</td>
          <td>{p.quantity}</td>
          <td>{p.price}</td>
          <td>{p.parentCategory?.categoryName || 'N/A'}</td>
          <td>{p.subCategory?.categoryName || 'N/A'}</td>
          <td>{p.ssCategory?.categoryName || 'N/A'}</td>
          <td>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(p)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {product.length === 0 && (
        <tr>
          <td className="py-3 text-muted" colSpan="9">
            No Products Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

       
    </div>
  );
};

export default ProductForm;
