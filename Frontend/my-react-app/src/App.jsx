import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://threewround1-3.onrender.com//users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const addUser = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    try {
      await axios.post('https://threewround1-3.onrender.com//users', { name: trimmedName });
      setNewName("");
      fetchUsers();
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const claimPoints = async (userId) => {
    try {
      await axios.post(`https://threewround1-3.onrender.com//claim/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to claim points:", err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://threewround1-3.onrender.com//users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000); // Auto refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Leaderboard</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addUser();
          }}
          placeholder="Add new user"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
              <td>
                <button onClick={() => claimPoints(user._id)} style={{ backgroundColor: "green", marginRight: "5px" }}>
                  Claim
                </button>
                <button onClick={() => deleteUser(user._id)} style={{ backgroundColor: "#ff4d4d", color: "#fff" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {sortedUsers.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
