const { manager, userProfile } = require("../database-models/index.js");
const mongoose = require("mongoose");


const managerController = {
    /**
     * @description adds manager status to a user
     * @route POST/manager/addStatus
     */
    addStatus: async (req, res) => {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const isUserExist = await userProfile.findOne({ userId });
        if (!isUserExist) {
            return res.status(404).json({ message: "User not found" });
        }

        try {
            await userProfile.findOneAndUpdate({ userId: userId }, { $set: { isManager: true } }, { upsert: true });

            // create manager record
            const managerRecord = new manager({
                managerId: userId,

            });
            await managerRecord.save();
            res.status(200).json({ message: "Manager status added successfully and manager created succesfully" });


        } catch (error) {
            console.error("Error adding manager status to user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    },
    /**
     * @description removes manager status from a user
     * @route POST /manager/removeStatus
     *
    **/

    removeStatus: async (req, res) => {
        const { managerId } = req.body;
        if (!managerId) {
            return res.status(400).json({ message: "Manager ID is required" });
        }
        try {
            await manager.findOneAndDelete({ managerId: managerId });
            await userProfile.findOneAndUpdate({ userId: managerId }, { $set: { isManager: false } });
            res.status(200).json({ message: "Manager status removed successfully" });
        } catch (error) {
            console.error("Error removing manager status from user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },


    /**
     * @description adds client to a manager
     * @route POST/manager/addClient
     */
    addClient: async (req, res) => {
        const { managerId, clientUsername } = req.body;

        //find client by username 
        const client = await userProfile.findOne({ username: clientUsername });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        try {
            await manager.findOneAndUpdate({ managerId: managerId }, { $push: { clientId: client.userId } });
            res.status(200).json({ message: "Client added successfully" });
        } catch (error) {
            console.error("Error adding client to manager:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    /**
     * @description removes client from a manager
     * @route POST /manager/removeClient
     */
    removeClient: async (req, res) => {
        const { managerId, clientUsername } = req.body;
        const client = await userProfile.findOne({ username: clientUsername }); 
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        try {
            await manager.findOneAndUpdate({ managerId: managerId }, { $pull: { clientId: client.userId } });
            res.status(200).json({ message: "Client removed successfully" });
        } catch (error) {
            console.error("Error removing client from manager:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    /**
     * @description updates manager's details
     * @route POST /manager/update 
     */

    updateManager: async (req, res) => {
        const updateFields = req.body;
        if (!updateFields.managerId) {
            return res.status(400).json({ message: "Is not a manager" });
        }
        try {
            await manager.findOneAndUpdate({ managerId: updateFields.managerId }, updateFields);
            res.status(200).json({ message: "Manager details updated successfully" });
        } catch (error) {
            console.error("Error updating manager details:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    /**
     * @description gets all managers
     * @route GET /manager/getAll
     */

    getAllManagers: async (req, res) => {
        try {
            const managers = await manager.find({});
            res.status(200).json(managers);
        } catch (error) {
            console.error("Error getting all managers:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    /**
     * @description gets manager by username
     */
    getManagerByUsername: async (req, res) => {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        try {
            const user = await userProfile.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const managerId = user.userId;
            if (!user) {
                return res.status(404).json({ message: "Manager not found" });
            }
            const managerObject = await manager.findOne({managerId});
            console.log(managerObject);
            res.status(200).json(managerObject);
        } catch (error) {
            console.error("Error getting manager by username:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
}


module.exports = managerController;