import User from '../models/User.js';
import RescueRequest from '../models/RescueRequest.js';

export const getVolunteers = async (req, res) => {
  try {
    const { available, skills } = req.query;
    let query = { role: 'volunteer' };

    if (available === 'true') query.isAvailable = true;
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    const volunteers = await User.find(query)
      .select('-password');

    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await User.findById(req.params.id)
      .select('-password');

    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Get rescue requests assigned to this volunteer
    const assignedRescues = await RescueRequest.find({ assignedVolunteer: req.params.id })
      .populate('reporterId', 'name email phone');

    res.json({ ...volunteer.toObject(), assignedRescues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVolunteerProfile = async (req, res) => {
  try {
    const { skills, isAvailable, phone, address, profileImage } = req.body;
    const volunteer = await User.findById(req.userId);

    if (!volunteer) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (volunteer.role !== 'volunteer') {
      return res.status(400).json({ message: 'User is not a volunteer' });
    }

    if (skills) volunteer.skills = skills;
    if (isAvailable !== undefined) volunteer.isAvailable = isAvailable;
    if (phone) volunteer.phone = phone;
    if (address) volunteer.address = address;
    if (profileImage) volunteer.profileImage = profileImage;

    await volunteer.save();
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVolunteerDashboard = async (req, res) => {
  try {
    const volunteer = await User.findById(req.userId);

    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    const assignedRescues = await RescueRequest.find({ assignedVolunteer: req.userId })
      .populate('reporterId', 'name email phone address');

    const pendingRescues = await RescueRequest.find({ status: 'pending' })
      .populate('reporterId', 'name email phone');

    res.json({
      volunteer,
      assignedRescues,
      pendingRescues,
      unassignedCount: pendingRescues.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignRescueToVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;

    const rescueRequest = await RescueRequest.findById(req.params.rescueId);

    if (!rescueRequest) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    const volunteer = await User.findById(volunteerId);

    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    rescueRequest.assignedVolunteer = volunteerId;
    rescueRequest.status = 'assigned';
    await rescueRequest.save();

    res.json(rescueRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
