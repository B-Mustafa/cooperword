"use client";

import React from "react";
import { Calendar, FileText, Tag } from "lucide-react";

const featuresData = [
  {
    id: 1,
    icon: <FileText className="text-green-600 w-8 h-8" />,
    title: "Task Management",
    description: "Create, update, and delete tasks or events with ease.",
  },
  {
    id: 2,
    icon: <Calendar className="text-orange-600 w-8 h-8" />,
    title: "Calendar Integration",
    description: "View all your events on an interactive monthly calendar.",
  },
  {
    id: 3,
    icon: <Tag className="text-purple-600 w-8 h-8" />,
    title: "Priority Settings",
    description:
      "Set priorities to your tasks/events to manage them efficiently.",
  },
];

const Features = () => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Amazing Features
        </h2>
        <p className="text-white text-lg md:text-xl mb-8">
          Discover the powerful features that make our application stand out
          from the crowd.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-4 md:m-0">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-zinc-900 rounded-lg shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
