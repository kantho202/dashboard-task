import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data)
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
   <div className="overflow-x-auto">
  <table className="table table-zebra border-2 border-gray-600">
    {/* head */}
    <thead>
      <tr className="">
        <th>Sl</th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Join Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user,index)=>{
          // console.log(user.name)
         return( <tr key={user.id} className="odd:bg-white even:bg-[#f7f7f7] hover:bg-green-300/20 transition ">
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.joinDate}</td>
      </tr>)
        })
      }
      
      
      
    </tbody>
  </table>
</div>
  );
};

export default Users;