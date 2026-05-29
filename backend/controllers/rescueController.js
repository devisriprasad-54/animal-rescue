import RescueRequest from '../models/RescueRequest.js';
import User from '../models/User.js';

export const createRescueRequest = async (req, res) => {
  try {
    const { animalType, location, description, emergencyLevel, images } = req.body;
    const reporterId = req.userId;

    if (!animalType || !location || !description || !emergencyLevel) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const rescueRequest = await RescueRequest.create({
      reporterId,
      animalType,
      location,
      description,
      emergencyLevel,
      images: images || [],
      status: 'pending'
    });

    await rescueRequest.populate('reporterId', 'name email phone');
    res.status(201).json(rescueRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRescueRequests = async (req, res) => {
  try {
    const { status, emergencyLevel, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (emergencyLevel) query.emergencyLevel = emergencyLevel;
    if (search) {
      query.$or = [
        { animalType: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') }
      ];
    }

    const rescueRequests = await RescueRequest.find(query)
      .populate('reporterId', 'name email phone')
      .populate('assignedNGO', 'name ngoName profileImage')
      .populate('assignedVolunteer', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(rescueRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRescueRequestById = async (req, res) => {
  try {
    const rescueRequest = await RescueRequest.findById(req.params.id)
      .populate('reporterId', 'name email phone address')
      .populate('assignedNGO', 'name ngoName profileImage phone address')
      .populate('assignedVolunteer', 'name profileImage phone address skills');

    if (!rescueRequest) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    res.json(rescueRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRescueRequest = async (req, res) => {
  try {
    const { status, assignedNGO, assignedVolunteer } = req.body;
    const rescueRequest = await RescueRequest.findById(req.params.id);

    if (!rescueRequest) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    if (status) rescueRequest.status = status;
    if (assignedNGO) rescueRequest.assignedNGO = assignedNGO;
    if (assignedVolunteer) rescueRequest.assignedVolunteer = assignedVolunteer;

    await rescueRequest.save();
    await rescueRequest.populate([
      { path: 'reporterId', select: 'name email phone' },
      { path: 'assignedNGO', select: 'name ngoName profileImage' },
      { path: 'assignedVolunteer', select: 'name profileImage' }
    ]);

    res.json(rescueRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRescueUpdate = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Update text is required' });
    }

    const rescueRequest = await RescueRequest.findById(req.params.id);

    if (!rescueRequest) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    rescueRequest.updates.push({ text, timestamp: new Date() });
    await rescueRequest.save();

    res.json(rescueRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const closeRescueRequest = async (req, res) => {
  try {
    const rescueRequest = await RescueRequest.findById(req.params.id);

    if (!rescueRequest) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    rescueRequest.status = 'closed';
    await rescueRequest.save();

    res.json({ message: 'Rescue request closed', rescueRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
