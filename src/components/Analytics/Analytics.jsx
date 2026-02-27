import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/analytics")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 ">
      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800">Analytics Overview</h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Views */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-primary">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">Total Views</h3>
            <p className="text-3xl font-bold text-primary">
              {data.reduce((sum, d) => sum + d.views, 0)}
            </p>
          </div>
        </div>

        {/* Clicks */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-secondary">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">Total Clicks</h3>
            <p className="text-3xl font-bold text-secondary">
              {data.reduce((sum, d) => sum + d.clicks, 0)}
            </p>
          </div>
        </div>

        {/* Conversions */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-accent">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">Conversions</h3>
            <p className="text-3xl font-bold text-accent">
              {data.reduce((sum, d) => sum + d.conversions, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>Date</th>
              <th>Views</th>
              <th>Clicks</th>
              <th>Conversions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i} className="even:bg-gray-50 hover:bg-gray-100">
                <td>{d.date}</td>
                <td>{d.views}</td>
                <td>{d.clicks}</td>
                <td>{d.conversions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;