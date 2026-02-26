import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Users Management
          </h1>
          <p className="text-gray-500">
            Manage and monitor registered users.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-sm font-medium text-gray-600">Name</th>
                  <th className="p-4 text-sm font-medium text-gray-600">Email</th>
                  <th className="p-4 text-sm font-medium text-gray-600">Role</th>
                  <th className="p-4 text-sm font-medium text-gray-600">Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full 
                        ${
                          user.role === "Admin"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Users;