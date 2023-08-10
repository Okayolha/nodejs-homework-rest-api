const { updateFavoriteContact } = require("../models/contacts");
const { Contact } = require("../models/contacts");
const { schema } = require("../shema/index");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.json({ contact });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const contactData = req.body;
  const { error } = schema.validate(contactData);
  try {
    if (error) {
      return res.status(400).json({
        message: "Missing required name field",
      });
    }
    const newContact = await Contact.create(contactData);
    res.status(201).json({ contact: newContact });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await Contact.findOneAndRemove(id);
    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const contactData = req.body;
  const { error } = schema.validate(contactData);
  try {
    const id = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, { new: true });
    if (error) {
      return res.status(400).json({
        message: "Missing fields",
      });
    } else if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.json({ contact: updatedContact });
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  const statusData = req.body;
  const { error } = updateFavoriteContact.validate(statusData);
  try {
    const id = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(id, statusData, { new: true });
    if (error) {
      return res.status(400).json({
        message: "Missing favorite field",
      });
    } else if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.json({ contact: updatedContact });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContactById,
  updateContact,
  updateContactStatus,
};
