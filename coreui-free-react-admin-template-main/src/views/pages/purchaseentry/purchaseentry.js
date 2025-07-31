import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFormSelect } from '@coreui/react';
import AutocompleteSearch from '../../../AutocompleteSearch';
const PurchaseentryForm = () => {  
  const [voucher,        setVoucher]        = useState('');
  const [transtype,setTranstype] = useState('Purchase');
  const [date,   setDate]     = useState([]);
  const [gsttype,  setGsttype]      = useState('');
  const [partyname,   setPartyname]   = useState('');
  const [partyid,   setPartyid]   = useState('');
  const [gstno, setGstno]   = useState('')
  const [total,setTotal]        = useState(0);
  const [netamt,setNetamt]        = useState(0);
  const [status,         setStatus]         = useState(1);
  const [editingId,      setEditingId]      = useState(null);
  const [formdata, setFormdata] = useState({product: "" , quantity:0, price:0, gst: 0, amount:0, total:0});  
  const [discount,setDiscount] = useState(0);
  const [productoptions,setProductoptions] = useState([]);
  const [party,setParty] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [transaction, setTransaction] = useState([]);

  
  useEffect(() => {
     axios.get('http://localhost:5000/product')
              .then(res => setProductoptions(res.data))
              .catch(err => console.error(err));
     axios.get('http://localhost:5000/partymaster')
              .then(res => setParty(res.data))
              .catch(err => console.error(err));
        
     
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
       voucher,
       date,
       gsttype,
       partyname,
       amount:netamt,
       discount,
       status,
       transtype,
       partyid,
       gstno
    };
    console.log(payload);
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/purchaseentry/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/purchaseentry', payload);
      }
       await axios.post('http://localhost:5000/purchaseitems', productlist);
      

      setVoucher(''),
       setDate(''),
       setGsttype(''),
       setParty(''),
       setDiscount('')
      
    } catch (err) {
      console.error(err);
    }
  };

const handleAutodata = (from, selectedItem) => {
  if (from === 'party') {
    setPartyname(selectedItem.name);
    setGstno(selectedItem.gstno); // for example
    setPartyid(selectedItem._id);
  } else if (from === 'product') {
    setFormdata((prev) => ({
      ...prev,
      product: selectedItem.name,
      productId: selectedItem._id,
    }));
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
    const pricee = (formdata.price)
    const qty = (formdata.quantity);
    const total=qty*pricee;
    const amt=(total+((total*gstt)/100));
    // console.log(amt);
    setFormdata({...formdata,amount:amt});
  }
  const handlenetamt = () => {

    const neta=formdata.total-((formdata.total*discount)/100);
    console.log(neta);
    setNetamt(neta);
  }
  const handlechange = (e) => {
    setFormdata({...formdata,[e.target.name]:e.target.value})
     
  }
  const handleadd = () => {
    setProductlist([...productlist,formdata]);
    const amountz=formdata.amount;
    console.log(amountz)
    // setTotal(formdata.amount)
    //  setFormdata({ ...formdata, total: (formdata.total+amountz) });
    setFormdata({product: "" , quantity: 0, price:0, gst:0, amount:0,total: (formdata.total+amountz) });
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
          <div className="mb-5 col-6">
              <label className="form-label">Party Name</label>
              <AutocompleteSearch data={party} getValue={(data) => handleAutodata('party', data)} />
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
          <div className="mb-5 col-2">
              <label className="form-label">Product</label>
              <AutocompleteSearch data={productoptions} getValue={(data) => handleAutodata('product', data)} />
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
            <option value={0}>Select</option>
            <option value={10}>10%</option>
            <option value={15}>15%</option>
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
           <div className="mb-3 col-2">
            <button type="button" className="btn btn-success mt-4" 
            onClick={handleadd}>
               ADD
            </button>
          </div>
          
        </div>

        <button type="submit" className="btn btn-success m-3" onClick={handleSubmit}>
          {editingId ? 'Update' : 'Submit'}
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
        <div className='row'>
          <div className='col-8'></div>
          <label className="col-2 col-form-label text-end">TOTAL</label>
          <div className="mb-3 col-2">
              
              <input
                type="number"
                className="form-control"
                name='total'
                value={formdata.total}
              />
            </div>
          </div>
          <div className='row'>
          <div className='col-8 mb-3'></div>
           <label className="col-2 col-form-label text-end">Discount</label>
          <div className="mb-3 col-2">
             
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(e)=>setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className='row'>
             <div className='col-8'></div>
            
             <label className="col-2 col-form-label text-end">Net Total</label>
            <div className=" col-2">
               
                <input
                  type="number"
                  className="form-control"
                  value={netamt}
                  onClick={handlenetamt}
                />
              </div>
          </div>
      </div>
    </div>
  );
};

export default PurchaseentryForm;
