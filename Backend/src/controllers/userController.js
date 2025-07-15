import User from "../models/User.js";
import ClaimHistory from "../models/claimHistory.js";
const userController = {
  // Add new user
  addUser: async (req, res) => {
    const { name } = req.body;
    const user = await User.create({ name  : name, totalPoints: 0 });
    res.json(user);
  },

  // Get all users sorted by points
  getUsers: async (req, res) => {
    const users = await User.find().sort({ totalPoints: -1 });
    const rankedUsers = users.map((user, index) => ({
      ...user._doc,
      rank: index + 1,
    }));
    res.json(rankedUsers);
  },

  // Claim random points
  claimPoints: async (req, res) => {
    const { userId } = req.params;
    const points = Math.floor(Math.random() * 10) + 1;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { totalPoints: points },
      },
      { new: true }
    );

    await ClaimHistory.create({ userId, claimedPoints: points });

    res.json({ message: "Points claimed", points, user });
  },

  // Delete user
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted" });
  },
};

export default userController;
