import React from "react";
import { ArrowRight } from "lucide-react";

const DashboardCard = ({ icon: Icon, title, viewAllLink, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="font-serif text-xl text-gray-800">{title}</h2>
        </div>
        <a
          href={viewAllLink}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
          View all
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default DashboardCard;
