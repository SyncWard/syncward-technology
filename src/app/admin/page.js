"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Briefcase, Mail, Phone, Calendar, X } from "lucide-react";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(""); // Particular date state (Format: YYYY-MM-DD)

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactRes, projectRes] = await Promise.all([
          fetch("/api/contact"),
          fetch("/api/projects")
        ]);
        
        const contactData = await contactRes.json();
        const projectData = await projectRes.json();

        if (contactData.success) setContacts(contactData.data);
        if (projectData.success) setProjects(projectData.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Particular Date Filtering Logic
  const filteredContacts = contacts.filter((lead) => {
    if (!selectedDate) return true; // Agar date select nahi ki toh sabhi dikhao

    const leadDate = new Date(lead.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD format
    return leadDate === selectedDate;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage SyncWard Technologies leads and portfolio projects.</p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl px-6 py-5 text-[14px] font-bold shadow-md transition-all">
              <PlusCircle size={18} className="mr-2" /> Add New Project
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-[#f0f5ff] rounded-2xl flex items-center justify-center text-[#286ef0]">
              <Briefcase size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Projects</p>
              <h3 className="text-2xl font-bold text-slate-900">{projects.length}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Users size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Client Leads / Messages</p>
              <h3 className="text-2xl font-bold text-emerald-600">{contacts.length}</h3>
            </div>
          </div>
        </div>

        {/* SECTION 1: Client Leads / Contact Messages with Particular Date Picker */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-slate-900">Client Inquiries & Leads</h3>
            
            {/* Particular Date Picker & Clear Button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <Calendar size={16} className="text-slate-500" />
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                />
              </div>

              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate("")}
                  className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                >
                  <X size={14} /> Clear Filter
                </button>
              )}
            </div>
          </div>
          
          {loading ? (
            <p className="text-slate-500 text-sm py-4">Loading leads...</p>
          ) : filteredContacts.length === 0 ? (
            <p className="text-slate-500 text-sm py-4">No leads found for the selected date.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Client Name</th>
                    <th className="pb-3 font-semibold">Contact Info</th>
                    <th className="pb-3 font-semibold">Subject</th>
                    <th className="pb-3 font-semibold">Message</th>
                    <th className="pb-3 font-semibold text-right">Received Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredContacts.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-semibold text-slate-900">{lead.name}</td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${lead.email}`} className="text-[#286ef0] hover:underline text-xs flex items-center gap-1">
                            <Mail size={12} /> {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="text-slate-500 text-xs flex items-center gap-1">
                              <Phone size={12} /> {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-4 font-medium text-slate-800">{lead.subject || "N/A"}</td>
                      <td className="py-4 max-w-xs truncate text-slate-500">{lead.message}</td>
                      <td className="py-4 text-right text-xs text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SECTION 2: Existing Projects Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Published Projects</h3>
          
          {loading ? (
            <p className="text-slate-500 text-sm">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-slate-500 text-sm">No projects found. Click "Add New Project" to create one.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Tech Stack</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {projects.map((proj) => (
                    <tr key={proj._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-semibold text-slate-900">{proj.title}</td>
                      <td className="py-4">{proj.category}</td>
                      <td className="py-4">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                          {proj.techStack?.join(", ")}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}