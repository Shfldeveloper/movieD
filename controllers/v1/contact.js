const express = require("express");
const contactModel = require("./../../models/contact");

exports.getAll = async (req, res) => {};
exports.create = async (req, res) => {
  try {
    const { name, email, phone, body } = req.body;
    if (!name | !email | !phone | !body) {
      return res.json({ message: "fill all the required fildes" });
    }
    const newContact = await contactModel.create({
      name,
      email,
      phone,
      body,
      answer: 0,
    });
    if (!newContact) {
      return res
        .status(500)
        .json({ message: "server error please try again..." });
    }

    return res.status(201).json(newContact);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};
exports.remove = async (req, res) => {};
exports.answer = async (req, res) => {};
