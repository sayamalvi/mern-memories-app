// this file executes the callback functions of the routes 

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// get/find posts 
export const getPosts = async (req, res) => {
    try {
        // finding something inside of a model will take time which means it is an asynchronous action so we have to add await and make the arrow function an async function 
        const postMessages = await PostMessage.find();

        // make the function return something , res.status(200) means everything went fine and return an array in json
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// add different posts 
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        // 201 means successfull creation
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No Post Found");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}