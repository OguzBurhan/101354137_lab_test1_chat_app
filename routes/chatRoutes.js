const express = require('express');
const router = express.Router();



router.post('/send', async (req, res) => {
    try {
        // Extract message details from request body
        const { from_user, to_user, message } = req.body;

        // Create and save the chat message
        const newMessage = new ChatMessage({ from_user, to_user, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Error sending message" });
    }
});

router.get('/history/:room', async (req, res) => {
    try {
        // Fetch messages from a specific room
        const messages = await ChatMessage.find({ room: req.params.room });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chat history" });
    }
});

module.exports = router;