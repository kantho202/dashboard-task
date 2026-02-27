import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { GoArrowUpRight } from 'react-icons/go';
import { MdDashboard, MdNotificationsNone, MdOutlineEmail } from 'react-icons/md';
// import { data } from 'react-router';


const Dashboard = () => {
    const projects = [
        {
            title: "Develop API Endpoints",
            date: "Due: Nov 26, 2024",
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Onboarding Flow",
            date: "Due: Nov 26, 2024",
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Build Dashboard",
            date: "Due: Nov 30, 2024",
            color: "bg-cyan-100 text-cyan-600",
        },
        {
            title: "Optimize Page Load",
            date: "Due: Dec 15, 2024",
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Cross-Browser Testing",
            date: "Due: Dec 20, 2024",
            color: "bg-purple-100 text-purple-600",
        },
    ];
    const [overview, setOverview] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch("https://task-api-eight-flax.vercel.app/api/overview")
            .then(res => res.json())
            .then(data => {
                setOverview(data)
                console.log(data)
                setLoading(false)
            })
    }, [])
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading dashboard...</p>
            </div>
        );
    }
    return (
        <div className=' p-5 bg-[#f7f7f7]'>
            <div className="max-w-7xl mx-auto pb-5">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Plan, prioritize, and accomplish your tasks with ease.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-green-700 font-semibold text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
                            + Add Project
                        </button>

                        <button className="border font-semibold border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 transition">
                            Import Data
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    {/* Total Projects */}
                    <div className="bg-green-700 text-white rounded-2xl p-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold">Total Users</h3>
                            <div className="bg-white text-green-700 w-7 h-7 flex items-center justify-center rounded-full text-sm">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4">{overview.totalUsers}</h2>
                        <p className="text-xs mt-3 opacity-90">
                            Increased from last month
                        </p>
                    </div>

                    {/* Ended Projects */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm text-gray-600 font-semibold">Active Users</h3>
                            <div className="border w-7 h-7 flex items-center justify-center rounded-full text-sm text-gray-600">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 text-gray-800">{overview.activeUsers}</h2>
                        <p className="text-xs mt-3 text-green-600">
                            Increased from last month
                        </p>
                    </div>

                    {/* Running Projects */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm text-gray-600 font-semibold">Revenue</h3>
                            <div className="border w-7 h-7 flex items-center justify-center rounded-full text-sm text-gray-600">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 text-gray-800">{overview.revenue}</h2>
                        <p className="text-xs mt-3 text-green-600">
                            Increased from last month
                        </p>
                    </div>

                    {/* Pending Project */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm text-gray-600 font-semibold">Growth</h3>
                            <div className="border w-7 h-7 flex items-center justify-center rounded-full text-sm text-gray-600">
                                <GoArrowUpRight size={20} />

                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 text-gray-800">{overview.growth}</h2>
                        <p className="text-xs mt-3 text-green-600">
                            On Discuss
                        </p>
                    </div>

                </div>

            </div>
            <div className="  grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">

                    <div className='flex gap-6'>
                        {/* Project Analytics */}
                        <div className="bg-white rounded-2xl p-6">
                            <h2 className="font-semibold text-gray-700 mb-4">
                                Project Analytics
                            </h2>

                            <div className="flex items-end gap-4 h-40">
                                {[40, 80, 60, 90, 50, 70, 65].map((h, i) => (
                                    <div
                                        key={i}
                                        className={`w-10 rounded-full ${i === 3
                                            ? "bg-green-700"
                                            : i === 1
                                                ? "bg-green-400"
                                                : "bg-gray-200"
                                            }`}
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Reminders */}
                        <div className="bg-white rounded-2xl p-6">
                            <h2 className="font-semibold text-gray-700 mb-4">
                                Reminders
                            </h2>

                            <p className="font-medium">
                                Meeting with Arc Company
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                02:00 pm - 04:00 pm
                            </p>

                            <button className="bg-green-700 text-white px-4 py-2 rounded-full text-sm">
                                + Start Meeting
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-6 '>
                        {/* Team Collaboration */}
                        <div className="bg-white rounded-2xl p-6 flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-gray-700">
                                    Team Collaboration
                                </h2>
                                <button className="border px-4 py-1 rounded-full text-sm">
                                    + Add Member
                                </button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        name: "Alexandra Dell",
                                        task: "Working on GitHub Project Repository",
                                        status: "Completed",
                                        color: "bg-green-100 text-green-600",
                                    },
                                    {
                                        name: "Edwin Adenike",
                                        task: "Authentication System",
                                        status: "In Progress",
                                        color: "bg-yellow-100 text-yellow-600",
                                    },
                                    {
                                        name: "Isaac Okafor",
                                        task: "Search & Filter Functionality",
                                        status: "Pending",
                                        color: "bg-red-100 text-red-600",
                                    },
                                    {
                                        name: "David Ossoli",
                                        task: "Homepage Layout",
                                        status: "In Progress",
                                        color: "bg-yellow-100 text-yellow-600",
                                    },
                                ].map((member, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-medium text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {member.task}
                                            </p>
                                        </div>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${member.color}`}
                                        >
                                            {member.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Project Progress */}
                        <div className="bg-white rounded-2xl p-6 text-center">
                            <h2 className="font-semibold text-gray-700 mb-4">
                                Project Progress
                            </h2>

                            <div className="relative w-40 h-40 mx-auto">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                                <div className="absolute inset-0 rounded-full border-8 border-green-700 border-t-transparent rotate-45"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold">41%</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 mt-3">
                                Project Execution
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-sm">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-gray-700 text-lg">
                                Project
                            </h2>

                            <button className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition">
                                <BiPlus size={14} />
                                New
                            </button>
                        </div>

                        {/* Project List */}
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div key={index} className="flex items-start gap-3">

                                    {/* Icon Circle */}
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full ${project.color}`}
                                    >
                                        ●
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">
                                            {project.title}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {project.date}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>




                    {/* Time Tracker */}
                    <div className="bg-green-900 text-white rounded-2xl p-6">
                        <h2 className="font-semibold mb-4">Time Tracker</h2>

                        <p className="text-3xl font-bold mb-6">
                            01:24:08
                        </p>

                        <div className="flex gap-4">
                            <button className="bg-white text-green-900 p-3 rounded-full">
                                {/* <Play size={18} /> */}
                            </button>

                            <button className="bg-red-500 p-3 rounded-full">
                                {/* <Pause size={18} /> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Dashboard;