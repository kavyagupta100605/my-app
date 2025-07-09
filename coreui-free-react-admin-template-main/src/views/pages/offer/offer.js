import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const OfferForm = () => {  
  const [offerId,        setOfferId]        = useState('');
  const [offerTitle,     setOfferTitle]     = useState('');
  const [offerCode,      setOfferCode]      = useState('');
  const [offerPercent,   setOfferPercent]   = useState('');
  const [startDate,      setStartDate]      = useState('');
  const [endDate,        setEndDate]        = useState('');
  const [status,         setStatus]         = useState('');
  const [editingId,      setEditingId]      = useState(null);

  
  const [offers, setOffers] = useState([]);


  const fetchOffers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/offer');
      setOffers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Offerid:         offerId,
      Offertitle:      offerTitle,
      Offercode:       offerCode,
      Offerpercentage: offerPercent,
      Startdate:       startDate || null,
      Enddate:         endDate   || null,
      Status:          status,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/offer/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/offer', payload);
      }


      setOfferId('');
      setOfferTitle('');
      setOfferCode('');
      setOfferPercent('');
      setStartDate('');
      setEndDate('');
      setStatus('');
      fetchOffers();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/offer/${id}`);
    setOffers(offers.filter((o) => o._id !== id));
  };


  const handleEdit = (o) => {
    setEditingId(o._id);
    setOfferId(o.Offerid);
    setOfferTitle(o.Offertitle || '');
    setOfferCode(o.Offercode || '');
    setOfferPercent(o.Offerpercentage || '');
    setStartDate(o.Startdate ? o.Startdate.slice(0, 10) : '');
    setEndDate(o.Enddate ? o.Enddate.slice(0, 10) : '');
    setStatus(o.Status || '');
  };

  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">Offer</h2>

   
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Offer ID</label>
            <input
              type="text"
              className="form-control"
              value={offerId}
              onChange={(e) => setOfferId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Promo Code</label>
            <input
              type="text"
              className="form-control"
              value={offerCode}
              onChange={(e) => setOfferCode(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">% Discount</label>
            <input
              type="number"
              className="form-control"
              value={offerPercent}
              onChange={(e) => setOfferPercent(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 col-4">
          <label className="form-label">Status</label>
          <CFormSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="active">active</option>
            <option value="expired">expired</option>
          </CFormSelect>
        </div>

        <button type="submit" className="btn btn-success m-3">
          {editingId ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle shadow">
          <thead className="bg-primary text-white">
            <tr>
              <th>Offer ID</th>
              <th>Title</th>
              <th>Code</th>
              <th>% Off</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o._id}>
                <td>{o.Offerid}</td>
                <td>{o.Offertitle}</td>
                <td>{o.Offercode || '—'}</td>
                <td>{o.Offerpercentage}</td>
                <td>{o.Startdate ? new Date(o.Startdate).toLocaleDateString() : '—'}</td>
                <td>{o.Enddate ? new Date(o.Enddate).toLocaleDateString() : '—'}</td>
                <td>{o.Status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(o)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(o._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr>
                <td colSpan="8" className="py-3 text-muted">
                  No offers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferForm;
