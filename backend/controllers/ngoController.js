import User from '../models/User.js';

export const getNGOs = async (req, res) => {
  try {
    const { city, search } = req.query;
    let query = { role: 'ngo' };

    if (search) {
      query.$or = [
        { ngoName: new RegExp(search, 'i') },
        { registrationNumber: new RegExp(search, 'i') }
      ];
    }

    const ngos = await User.find(query)
      .select('-password')
      .limit(20);

    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNGOById = async (req, res) => {
  try {
    const ngo = await User.findById(req.params.id)
      .select('-password');

    if (!ngo || ngo.role !== 'ngo') {
      return res.status(404).json({ message: 'NGO not found' });
    }

    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNGOProfile = async (req, res) => {
  try {
    const { ngoName, registrationNumber, phone, address, profileImage } = req.body;
    const ngo = await User.findById(req.userId);

    if (!ngo) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (ngo.role !== 'ngo') {
      return res.status(400).json({ message: 'User is not an NGO' });
    }

    if (ngoName) ngo.ngoName = ngoName;
    if (registrationNumber) ngo.registrationNumber = registrationNumber;
    if (phone) ngo.phone = phone;
    if (address) ngo.address = address;
    if (profileImage) ngo.profileImage = profileImage;

    await ngo.save();
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
