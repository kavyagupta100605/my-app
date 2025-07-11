import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const UnitsForm = () => {  
  const [unitName, setUnitName] = useState('');
  const [unitSymbol, setUnitSymbol] = useState('');
  const [unitType, setUnitType] = useState('');
  const [conversionFactor, setConversionFactor] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [units, setUnits] = useState([]);


  const fetchUnits = async () => {
    try {
      const res = await axios.get('http://localhost:5000/units');
      setUnits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchUnits(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      unitName,
      unitSymbol,
      unitType,
      conversionFactor,
      status,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/units/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/units', payload);
      }

      setUnitName('');
      setUnitSymbol('');
      setUnitType('');
      setConversionFactor('');
      setStatus('');
      fetchUnits();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/units/${id}`);
    setUnits(units.filter((u) => u._id !== id));
  };


  const handleEdit = (u) => {
    setEditingId(u._id);
    setUnitName(u.unitName || '');
    setUnitSymbol(u.unitSymbol || '');
    setUnitType(u.unitType || '');
    setConversionFactor(u.conversionFactor || '');
    setStatus(u.status || '');
  };

  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">UNIT</h2>

   
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Unit Name</label>
            <input
              type="text"
              className="form-control"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Unit Symbol</label>
            <input
              type="text"
              className="form-control"
              value={unitSymbol}
              onChange={(e) => setUnitSymbol(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Unit Type</label>
            <input
              type="text"
              className="form-control"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Conversion Factor</label>
            <input
              type="number"
              className="form-control"
              value={conversionFactor}
              onChange={(e) => setConversionFactor(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
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
             <th>Unit Name</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Conversion Factor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((u) => (
              <tr key={u._id}>
                <td>{u.unitName}</td>
                <td>{u.unitSymbol}</td>
                <td>{u.unitType}</td>
                <td>{u.conversionFactor || '1'}</td>
                <td>{u.status}</td>
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
                    <td className="py-3 text-muted" colSpan="8">
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

export default UnitsForm;
