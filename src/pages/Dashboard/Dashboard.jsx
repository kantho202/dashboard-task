import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { BsCameraVideoFill, BsFillRecordCircleFill } from 'react-icons/bs';
import { FaPauseCircle, FaPlus } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { HiVideoCamera } from 'react-icons/hi';

// Counter animation hook
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!end) return;
        
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration]);

    return count;
};

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

    const [overview, setOverview] = useState({});
    const [loading, setLoading] = useState(true);
    
    // Animated counters
    const totalUsersCount = useCountUp(overview.totalUsers, 2000);
    const activeUsersCount = useCountUp(overview.activeUsers, 2000);
    const revenueCount = useCountUp(overview.revenue || 0, 2000);
    const growthCount = useCountUp(overview.growth || 0, 2000);
    
    useEffect(() => {
        fetch("https://task-api-eight-flax.vercel.app/api/overview")
            .then(res => res.json())
            .then(data => {
                setOverview(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg text-gray-600 font-medium animate-pulse">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='p-5 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen'>
            <div className="max-w-7xl mx-auto pb-5">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 animate-slide-down">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Plan, prioritize, and accomplish your tasks with ease.
                        </p>
                    </div>

                    <div className="flex gap-3 animate-fade-in-delay">
                        <button className="bg-green-700 flex gap-2 items-center font-semibold text-white px-5 py-2 rounded-full hover:bg-green-800 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95">
                            <FaPlus />Add Project
                        </button>

                        <button className="border font-semibold border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 hover:scale-105 hover:shadow-md transition-all duration-300 active:scale-95">
                            Import Data
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    {/* Total Users */}
                    <div className="bg-green-700 text-white rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in group" style={{animationDelay: '0.1s'}}>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold">Total Users</h3>
                            <div className="bg-white text-green-700 w-7 h-7 flex items-center justify-center rounded-full text-sm group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 group-hover:scale-110 transition-transform duration-300">
                            {totalUsersCount.toLocaleString()}
                        </h2>
                        <p className="text-xs mt-3 opacity-90">
                            Increased from last month
                        </p>
                    </div>

                    {/* Active Users */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in group" style={{animationDelay: '0.2s'}}>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm text-gray-600 font-semibold">Active Users</h3>
                            <div className="border w-7 h-7 flex items-center justify-center rounded-full text-sm text-gray-600 group-hover:scale-110 group-hover:rotate-45 group-hover:border-green-600 group-hover:text-green-600 transition-all duration-300">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 text-gray-800 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300">
                            {activeUsersCount.toLocaleString()}
                        </h2>
                        <p className="text-xs mt-3 text-green-600">
                            Increased from last month
                        </p>
                    </div>

                    {/* Revenue */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in group" style={{animationDelay: '0.3s'}}>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm text-gray-600 font-semibold">Revenue</h3>
                            <div className="border w-7 h-7 flex items-center justify-center rounded-full text-sm text-gray-600 group-hover:scale-110 group-hover:rotate-45 group-hover:border-green-600 group-hover:text-green-600 transition-all duration-300">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 text-gray-800 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300">
                            {revenueCount.toLocaleString()}
                        </h2>
                        <p className="text-xs mt-3 text-green-600">
                            Increased from last month
                        </p>
                    </div>

                    {/* Growth */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in group" style={{animationDelay: '0.4s'}}>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm text-gray-600 font-semibold">Growth</h3>
                            <div className="border w-7 h-7 flex items-center justify-center rounded-full text-sm text-gray-600 group-hover:scale-110 group-hover:rotate-45 group-hover:border-green-600 group-hover:text-green-600 transition-all duration-300">
                                <GoArrowUpRight size={20} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mt-4 text-gray-800 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300">
                            {growthCount.toLocaleString()}
                        </h2>
                        <p className="text-xs mt-3 text-green-600">
                            On Discuss
                        </p>
                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">

                    <div className='flex gap-6'>
                        {/* Project Analytics */}
                        <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-delay flex-1">
                            <h2 className="font-semibold text-gray-700 mb-4">
                                Project Analytics
                            </h2>

                            <div className="flex items-end gap-4 h-40">
                                {[40, 80, 60, 90, 50, 70, 65].map((h, i) => (
                                    <div
                                        key={i}
                                        className={`w-10 rounded-full transition-all duration-500 hover:scale-110 cursor-pointer ${
                                            i === 3
                                                ? "bg-green-700 hover:bg-green-800"
                                                : i === 1
                                                ? "bg-green-400 hover:bg-green-500"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Reminders */}
                        <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-delay group">
                            <h2 className="font-semibold text-gray-700 mb-4">
                                Reminders
                            </h2>

                            <p className="font-medium group-hover:text-green-600 transition-colors duration-300">
                                Meeting with Arc Company
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                02:00 pm - 04:00 pm
                            </p>

                            <button className="bg-green-700 flex gap-2 text-white px-5 py-3 font-bold rounded-full text-sm hover:bg-green-800 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95">
                                <BsCameraVideoFill size={22} /> Start Meeting
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        {/* Team Collaboration */}
                        <div className="bg-white rounded-2xl p-6 flex-1 hover:shadow-xl transition-all duration-300 animate-slide-up">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-gray-700">
                                    Team Collaboration
                                </h2>
                                <button className="border flex items-center  text-green-500  gap-2 px-4 py-2 rounded-full text-sm hover:bg-green-700 hover:text-white hover:border-green-700 transition-all duration-300 hover:scale-105">
                                    <FaPlus  />
 Add Member
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
                                        className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 hover:translate-x-2 group/item"
                                    >
                                        <div>
                                            <p className="font-medium text-sm group-hover/item:text-green-600 transition-colors duration-300">
                                                {member.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {member.task}
                                            </p>
                                        </div>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${member.color} group-hover/item:scale-110 transition-transform duration-300`}
                                        >
                                            {member.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Project Progress */}
                        <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 animate-slide-up group">
                            <h2 className="font-semibold text-gray-700 mb-4">
                                Project Progress
                            </h2>

                            <div className="relative w-40 h-40 mx-auto group-hover:scale-110 transition-transform duration-500">
                                <div className="absolute inset-0 rounded-full border-22 border-gray-200"></div>
                                <div className="absolute inset-0 rounded-full border-22 border-green-700 border-t-transparent rotate-45 group-hover:rotate-[405deg] transition-all duration-1000"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold group-hover:text-green-600 transition-colors duration-300">41%</span>
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
                    {/* Projects List */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-delay-2">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-gray-700 text-lg">
                                Projects
                            </h2>

                            <button className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm hover:bg-green-700 hover:text-white hover:border-green-700 transition-all duration-300 hover:scale-105">
                                <BiPlus size={14} />
                                New
                            </button>
                        </div>

                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div key={index} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 hover:translate-x-2 group/project cursor-pointer">
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full ${project.color} group-hover/project:scale-125 transition-transform duration-300`}
                                    >
                                        ●
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-800 group-hover/project:text-green-600 transition-colors duration-300">
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
                    <div className="bg-green-900 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in-delay-2 group">
                        <h2 className="font-semibold mb-4">Time Tracker</h2>

                        <p className="text-3xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                            01:24:08
                        </p>

                        <div className="flex gap-4">
                            <button className="bg-white text-green-900 p-3 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300 active:scale-95">
                                <FaPauseCircle />
                            </button>

                            <button className="bg-red-500 p-3 rounded-full hover:scale-110 hover:shadow-lg hover:bg-red-600 transition-all duration-300 active:scale-95">
                                <BsFillRecordCircleFill />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
