// controllers/offerController.js
const {Offer} = require('../model/offer');

/* ------------- CREATE ------------- */
exports.createoffer = async (req, res) => {
  const {
    Offerid,
    Offertitle,
    Offercode,
    Offerpercentage,
    Startdate,
    Enddate,
    Status,
  } = req.body;

  try {
    // Optional: make Offerid unique
    const exists = await Offer.findOne({ Offerid });
    if (exists) {
      return res.status(409).json({ error: 'Offer ID already exists' });
    }

    const newOffer = await Offer.create({
      Offerid,
      Offertitle,
      Offercode,
      Offerpercentage,
      Startdate: Startdate || null,
      Enddate:   Enddate   || null,
      Status:    Status    || 'active',
    });

    res.status(201).json(newOffer);
  } catch (err) {
    console.error('Error creating offer:', err);
    res.status(400).json({ error: err.message });
  }
};

/* ------------- READ ALL ------------- */
exports.getoffer = async (_req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    console.error('Error fetching offers:', err);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};

/* ------------- UPDATE ------------- */
exports.updateoffer = async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Offer not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating offer:', err);
    res.status(400).json({ error: err.message });
  }
};

/* ------------- DELETE ------------- */
exports.deleteoffer = async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting offer:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
};
