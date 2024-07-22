// Generated controllers based on user input
const mongoose = require("mongoose"); 
const express = require("express"); 
const Profile = require('../models/profileSchema');

// CRUD operations for Profile
// Create Controller 
const createProfile = async (req, res) => { 
    const { username, dob } = req.body;
    try {
        const profile = await Profile.create({ username, dob }) 
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            for (it in error.errors) {
                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        } console.error(error);
        res.status(500).json({'Server Error ': error.message});
    }
};

// Update Controller 
const updateProfile = async (req, res) => { 
    const _id=req.params.id;
    const { username, dob } = req.body;
    try {
        const profile = await Profile.findByIdAndUpdate( _id, { username, dob },{new:true}) 
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            for (it in error.errors) {
                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        } console.error(error);
        return res.status(500).json({'Server Error':error.message});
    }
};

// Delete Controller 
const deleteProfile = async (req, res) => { 
    const _id=req.params.id;
    try {
        const profile = await Profile.findById(_id)
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        await Profile.deleteOne({_id: _id})
        await profile.save();
        res.status(201).json({message: "Deleted Successfully"});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            for (it in error.errors) {
                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        } console.error(error);
        return res.status(500).json({'Server Error':error.message});
    }
};

// get by Id Controller 
const getProfile = async (req, res) => { 
    const _id=req.params.id;
    try {
        const profile = await Profile.findById(_id)
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        res.status(201).json(profile);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            for (it in error.errors) {
                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        } console.error(error);
        return res.status(500).json({'Server Error':error.message});
    }
};

// getAll Controller 
const getAllProfile = async (req, res) => { 
    try {
        const profile = await Profile.find({})
        if (!profile) {
            return res.status(404).send('Nothing found !!');
        }
        res.status(201).json(profile);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            for (it in error.errors) {
                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        } console.error(error);
        return res.status(500).json({'Server Error':error.message});
    }
};

module.exports = {
    createProfile,
    updateProfile,
    deleteProfile,
    getProfile,
    getAllProfile
}