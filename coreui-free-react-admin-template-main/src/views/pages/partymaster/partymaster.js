import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const PartyMasterForm = () => {  
  const [name,        setName]        = useState('');
  const [address,     setAddress]     = useState('');
  const [mobile,      setMobile]      = useState('');
  const [gstno,   setGstno]   = useState('');
  const [type,      setType]      = useState('');
  const [status,        setStatus]        = useState(1);
  const [opbal,         setOpbal]         = useState('');
  const [baltype,  setBaltype] = useState('');
  const [editingId,      setEditingId]      = useState(null);

  
  const [pm, setPM] = useState([]);


  const fetchparty = async () => {
    try {
      const res = await axios.get('http://localhost:5000/partymaster');
      setPM(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchparty(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
       address,
       mobile,
       gstno,
       type,
       status,
       opbal,
       baltype
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/partymaster/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/partymaster', payload);
      }


      setName('');
      setAddress('');
      setBaltype('');
      setEditingId('');
      setGstno('');
      setMobile('')
      setOpbal('');
      setType('');
      fetchparty();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/partymaster/${id}`);
    setPM(pm.filter((p) => p._id !== id));
  };


  const handleEdit = (p) => {
    setName(p.name);
      setAddress(p.address);
      setBaltype(p.baltype);
      setEditingId(p._id);
      setGstno(p.gstno);
      setMobile(p.mobile)
      setOpbal(p.opbal);
      setType(p.type);
  };

  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">Party Master</h2>

   
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">GST Number</label>
            <input
              type="number"
              className="form-control"
              value={gstno}
              onChange={(e) => setGstno(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Type</label>
            <CFormSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Select</option>
                <option value="Sundary Creditor">Sundary Creditor</option>
                <option value="Sundary Debitor">Sundary Debitor</option>
            </CFormSelect>
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Opening Balance</label>
            <input
              type="number"
              className="form-control"
              value={opbal}
              onChange={(e) => setOpbal(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Balance Type</label>
           <CFormSelect
                value={baltype}
                onChange={(e) => setBaltype(e.target.value)}
           >
                <option value="">Select</option>
                <option value="Cr">Credit</option>
                <option value="Dr">Debit</option>
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
              <th>Name</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>GST No</th>
              <th>Type</th>
              <th>Opening Balance</th>
              <th>Balance Type</th>
            </tr>
          </thead>
          <tbody>
            {pm.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td>{p.mobile}</td>
                <td>{p.gstno}</td>
                <td>{p.type}</td>
                <td>{p.opbal}</td>
                <td>{p.baltype}</td>
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
            {pm.length === 0 && (
              <tr>
                <td colSpan="8" className="py-3 text-muted">
                  No Party found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartyMasterForm;
