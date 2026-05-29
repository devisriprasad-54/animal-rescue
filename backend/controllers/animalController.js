import Animal from '../models/Animal.js';
import User from '../models/User.js';

export const createAnimal = async (req, res) => {
  try {
    const { name, species, breed, age, healthStatus, rescueStory, images } = req.body;
    const managingNGO = req.userId;

    if (!name || !species) {
      return res.status(400).json({ message: 'Name and species are required' });
    }

    const animal = await Animal.create({
      name,
      species,
      breed,
      age,
      healthStatus,
      rescueStory,
      images: images || [],
      managingNGO
    });

    await animal.populate('managingNGO', 'name ngoName profileImage');
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const { species, isAdopted, search } = req.query;
    let query = {};

    if (species) query.species = species;
    if (isAdopted !== undefined) query.isAdopted = isAdopted === 'true';
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { breed: new RegExp(search, 'i') }
      ];
    }

    const animals = await Animal.find(query)
      .populate('managingNGO', 'name ngoName profileImage');
    
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .populate('managingNGO', 'name ngoName profileImage phone address');
    
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    if (animal.managingNGO.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this animal' });
    }

    const { name, breed, age, healthStatus, rescueStory, images, isAdopted } = req.body;

    if (name) animal.name = name;
    if (breed) animal.breed = breed;
    if (age !== undefined) animal.age = age;
    if (healthStatus) animal.healthStatus = healthStatus;
    if (rescueStory) animal.rescueStory = rescueStory;
    if (images) animal.images = images;
    if (isAdopted !== undefined) animal.isAdopted = isAdopted;

    await animal.save();
    await animal.populate('managingNGO', 'name ngoName profileImage');
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    if (animal.managingNGO.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this animal' });
    }

    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adoptAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    animal.isAdopted = true;
    await animal.save();
    await animal.populate('managingNGO', 'name ngoName');

    res.json({ message: 'Adoption request sent successfully', animal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
