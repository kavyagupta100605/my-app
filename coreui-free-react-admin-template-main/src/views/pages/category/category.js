import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [categoryImage, setCategoryImage] = useState([]);
  const [available, setAvailable] = useState('Yes');
  const [parentoptions, setParentOptions] = useState([]);
  const [subcatoptions, setCatOptions] = useState([]);
  const [category, setCategory] = useState([]);
  const [editingId, setEditingId] = useState('');
  const inputref = useRef(null);
useEffect(() => {
  
    axios.get('http://localhost:5000/category/parent')
        .then((res) => {
          setParentOptions(res.data)
    handleview();
})
        .catch(err => console.error(err));
    }, []);
  const handlesubcat = (value) => {
   
    setParentCategory(value);

    axios.get('http://localhost:5000/category/sub/'+value)
      .then(res => setCatOptions(res.data))
      .catch(err => console.error(err));
  }

  const handleview = async () => {
   await axios.get('http://localhost:5000/category')
            .then(res => setCategory(res.data))
            .catch(err => console.error(err));
  }

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('categoryName', categoryName);
    uploadData.append('categoryDescription', categoryDescription);
    uploadData.append('parentCategory', parentCategory);
    uploadData.append('subCategory', subCategory);
    uploadData.append('available', available);
    uploadData.append('categoryImage', categoryImage);

    try {
       if (editingId) {
            const res = await axios.put(`http://localhost:5000/category/${editingId}`, uploadData,
              { headers: { 'content-type': 'multipart/form-data' }}
            );
            // setCategory(category.map(parent => (parent._id === editingId ? res.data : parent)));
            setEditingId(null);
        } else {
            const res = await axios.post('http://localhost:5000/category', uploadData);
            // setCategory([...category, res.data]);
        }

      // Clear fields           
      setCategoryName('');
      setCategoryDescription('');
      setParentCategory('');
      setSubCategory('');
      setAvailable('Yes');
      setCategoryImage(null);
      handleview();
    } catch (err) {
      console.error(err);
    }
  };
   const handleDelete = async (id) => {
      await axios.delete(`http://localhost:5000/category/${id}`)
      setCategory(category.filter(parent => parent._id !== id));
    }
  
    const handleUpdate = async(parent)=>{
      inputref.current?.focus();
      handlesubcat(parent.parentCategory);
      setEditingId(parent._id)
        
      setCategoryName(parent.categoryName);
      setCategoryDescription(parent.categoryDescription);
      setParentCategory(parent.parentCategory);
      setSubCategory(parent.subCategory);
      setAvailable(parent.available);
      setCategoryImage(null);
     
    }
    const handlesubcat1 = (e) =>{
      const {value} = e.target

      handlesubcat(value)

    }

  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className="mb-3 col-6">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              ref={inputref}
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-6">
            <label className="form-label">Category Description</label>
            <textarea
              className="form-control"
              rows="1"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className='row'>
          <div className="mb-3 col-6">
            <label className="form-label">Parent Category</label>
            <CFormSelect
              value={parentCategory}
              onChange={handlesubcat1}
            >
              <option value="">Select Parent Category</option>
              <option value="0">Parent</option>
              {parentoptions.map((parent)=>(
                <option key={parent._id} value={parent._id}>{parent.categoryName}</option>
              ))}
                
            </CFormSelect>
          </div>

          <div className="mb-3 col-6">
            <label className="form-label">Sub Category</label>
            <CFormSelect
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              <option value="0">None</option>
              {subcatoptions.map((parent)=>(
                <option key={parent._id} value={parent._id}>{parent.categoryName}</option>
              ))}
            </CFormSelect>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Available</label>
          <div>
            <input
              type="radio"
              name="available"
              value="Yes"
              checked={available === 'Yes'}
              onChange={(e) => setAvailable(e.target.value)}
              className="form-check-input me-1"
            />
            Yes
            <input
              type="radio"
              name="available"
              value="No"
              checked={available === 'No'}
              onChange={(e) => setAvailable(e.target.value)}
              className="form-check-input ms-3 me-1"
            />
            No
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            
          />
        </div>

        <button type="submit" className="btn btn-success w-10" onClick={handleview}>
          {(editingId)?'Update':'Submit'}
        </button>
        <button type="btn" className="btn btn-success w-10 m-3" onClick={handleview}>
          View
        </button>
      </form>
       <div className="table-responsive">
                        <table className="table table-bordered table-striped text-center align-middle shadow">
                            <thead className="bg-primary text-white">
                                <tr>

                                    <th>Category Name</th>
                                    <th>Category Description</th>
                                    <th>Parent Category</th>
                                    <th>Sub Category</th>
                                    <th>Available</th>
                                    <th>Category Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map((parent) => (
                                    <tr key={parent._id}>
                                        <td>{parent.categoryName}</td>
                                        <td>{parent.categoryDescription}</td>
                                        <td>{(parent.parentCategoryName)?(parent.parentCategoryName):'NULL'}</td>
                                        <td>{(parent.subCategoryName)?parent.subCategoryName:'NULL'}</td>
                                        <td>{parent.available}</td>
                                        <td><img src={`http://localhost:5000/uploads/${parent.categoryImage}`} alt="Noimage" className=" w-25 h-25" /></td>
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

export default CategoryForm;
