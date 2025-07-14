import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';

const PurchaseentryForm = () => {  
  const [voucher,        setVoucher]        = useState('');
  const [date,   setDate]     = useState('');
  const [gsttype,  setGsttype]      = useState('');
  const [partyname,   setPartyname]   = useState('');
  const [gstno, setGstno]   = useState('')
  const [total,setTotal]        = useState('');
  const [dis,setDis]        = useState('');
  const [netamt,setNetamt]        = useState('');
  const [status,         setStatus]         = useState('');
  const [editingId,      setEditingId]      = useState(null);
  const [formdata, setFormdata] = useState({product: "" , quantity: "", price:"", gst: "", amount:""});  
  
  const [productlist, setProductlist] = useState([]);


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


//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/offer/${id}`);
//     setOffers(offers.filter((o) => o._id !== id));
//   };


//   const handleEdit = (o) => {
//     setEditingId(o._id);
//     setOfferId(o.Offerid);
//     setOfferTitle(o.Offertitle || '');
//     setOfferCode(o.Offercode || '');
//     setOfferPercent(o.Offerpercentage || '');
//     setStartDate(o.Startdate ? o.Startdate.slice(0, 10) : '');
//     setEndDate(o.Enddate ? o.Enddate.slice(0, 10) : '');
//     setStatus(o.Status || '');
//   };
  const handleamount = (e) => {
    const gstt=parseInt(formdata.gst)
    const pricee = parseInt(formdata.price)
   
    const amt=(pricee+((pricee*gstt)/100));
    // console.log(amt);
    setFormdata({...formdata,amount:amt});
  }
  const handlechange = (e) => {
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  const handleadd = () => {
    setProductlist([...productlist,formdata]);
    setFormdata({product: "" , quantity: "", price:"", gst: "", amount:""});
  }

  return (
    <div className="card p-4 shadow w-100 mx-auto mt-5">
      <h2 className="text-center mb-4">Purchase Entry</h2>

   
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Voucher Number</label>
            <input
              type="text"
              className="form-control"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">GST Type</label>
            <input
              type="text"
              className="form-control"
              value={gsttype}
              onChange={(e) => setGsttype(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">Party Name</label>
            <input
              type="text"
              className="form-control"
              value={partyname}
              onChange={(e) => setPartyname(e.target.value)}
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">GST No</label>
            <input
              type="number"
              className="form-control"
              value={gstno}
              onChange={(e) => setGstno(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className="mb-3 col-2">
            <label className="form-label">Product</label>
            <input
              type="text"
              className="form-control"
              name='product'
              value={formdata.product}
              onChange={handlechange}
            />
          </div>
        

        <div className="mb-3 col-2">
          <label className="form-label">Quantity</label>
            <input
              type="text"
              className="form-control"
              name='quantity'
              value={formdata.quantity}
              onChange={handlechange}
            />
        </div>
        <div className="mb-3 col-2">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name='price'
              value={formdata.price}
              onChange={handlechange}
            />
          </div>
          <div className="mb-3 col-2">
            <label className="form-label">GST %</label>
           <CFormSelect
            value={formdata.gst}
            onChange={handlechange}
            name='gst'
          >
            <option value="">Select</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
          </CFormSelect>
          </div>
          <div className="mb-3 col-2">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              name='amount'
              value={formdata.amount}
              onChange={handlechange}
              onClick={handleamount}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success m-3">
          {editingId ? 'Update' : 'Submit'}
        </button>
        <button type="btn" className="btn btn-success m-3" 
        onClick={handleadd}>
          ADD
        </button>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle shadow">
          <thead className="bg-primary text-white">
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>GST%</th>
                    <th>Amount</th>
                </tr>
          </thead>
          <tbody>
                {productlist.map((f,i) => (
                <tr key={i}>
                    <td>{f.product}</td>
                    <td>{f.quantity}</td>
                    <td>{f.price}</td>
                    <td>{f.gst}</td>
                    <td>{f.amount}</td>
                </tr>
                ))}
                {productlist.length === 0 && (
                <tr>
                    <td colSpan="8" className="py-3 text-muted">
                    No products found
                    </td>
                </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseentryForm;
