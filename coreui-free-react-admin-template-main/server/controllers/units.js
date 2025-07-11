// controllers/offerController.js
const {Units} = require('../model/units');


exports.createunits = async (req, res) => {
  const {
    unitName,
    unitSymbol,
    unitType,
    conversionFactor,
    status,
  } = req.body;

  try {
    

    const newunits = await Units.create({
        unitName,
        unitSymbol,
        unitType,
        conversionFactor,
        status,
    });

    res.status(201).json(newunits);
  } catch (err) {
    console.error('Error creating units:', err);
    res.status(400).json({ error: err.message });
  }
};


exports.getunits = async (req, res) => {
  try {
    const unit = await Units.find();
    res.json(unit);
  } catch (err) {
    console.error('Error fetching offers:', err);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};


exports.updateunits = async (req, res) => {
  try {
    const updated = await Units.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'unit not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating offer:', err);
    res.status(400).json({ error: err.message });
  }
};


exports.deleteunits = async (req, res) => {
  try {
    const deleted = await Units.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting offer:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
};
