"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Users,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  X,
  Search,
  Trash2,
  Edit3,
  Eye,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// Helper: Convert date to local YYYY-MM-DD (Fixes IST vs UTC bug)
function toLocalDateString(dateInput) {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const LEAD_STATUS_STYLES = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Contacted: "bg-purple-50 text-purple-700 border-purple-200",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const PROJECT_STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  Archived: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("leads"); // "leads" | "projects"

  // Lead Filters
  const [selectedDate, setSelectedDate] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("ALL");

  // Project Filters
  const [projectSearch, setProjectSearch] = useState("");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("ALL");

  // Modals & Action States
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [savingProject, setSavingProject] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const [contactRes, projectRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/projects"),
      ]);

      const contactData = await contactRes.json();
      const projectData = await projectRes.json();

      if (contactData.success) setContacts(contactData.data || []);
      if (projectData.success) setProjects(projectData.data || []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // --- LEAD CRUD HANDLERS ---
  async function handleLeadStatusChange(leadId, newStatus) {
    setActionLoadingId(leadId);
    try {
      const res = await fetch(`/api/contact/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((item) => (item._id === leadId ? { ...item, status: newStatus } : item))
        );
        if (selectedLead?._id === leadId) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Network error while updating lead status");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleDeleteLead(leadId) {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    setActionLoadingId(leadId);
    try {
      const res = await fetch(`/api/contact/${leadId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((item) => item._id !== leadId));
        if (selectedLead?._id === leadId) setSelectedLead(null);
      } else {
        alert(data.error || "Failed to delete lead");
      }
    } catch (err) {
      console.error("Delete lead error:", err);
      alert("Network error while deleting lead");
    } finally {
      setActionLoadingId(null);
    }
  }

  // --- PROJECT CRUD HANDLERS ---
  function openEditProjectModal(project) {
    setEditingProject({
      ...project,
      techStackInput: Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
      status: project.status || "Active",
      featured: Boolean(project.featured),
      liveUrl: project.liveUrl || "",
    });
  }

  async function handleSaveProject(e) {
    e.preventDefault();
    if (!editingProject) return;
    setSavingProject(true);

    try {
      const res = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingProject.title,
          category: editingProject.category,
          description: editingProject.description,
          image: editingProject.image,
          liveUrl: editingProject.liveUrl,
          status: editingProject.status,
          featured: editingProject.featured,
          techStack: editingProject.techStackInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === editingProject._id ? data.data : p))
        );
        setEditingProject(null);
      } else {
        alert(data.error || "Failed to update project");
      }
    } catch (err) {
      console.error("Update project error:", err);
      alert("Network error while updating project");
    } finally {
      setSavingProject(false);
    }
  }

  async function handleDeleteProject(projectId) {
    if (!window.confirm("Are you sure you want to delete this project from the portfolio?")) return;
    setActionLoadingId(projectId);
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (err) {
      console.error("Delete project error:", err);
      alert("Network error while deleting project");
    } finally {
      setActionLoadingId(null);
    }
  }

  // --- MEMOIZED FILTERS ---
  const filteredContacts = useMemo(() => {
    return contacts.filter((lead) => {
      const matchesDate = !selectedDate || toLocalDateString(lead.createdAt) === selectedDate;
      const currentStatus = lead.status || "New";
      const matchesStatus = leadStatusFilter === "ALL" || currentStatus === leadStatusFilter;
      const q = leadSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.name?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        lead.subject?.toLowerCase().includes(q) ||
        lead.phone?.toLowerCase().includes(q);

      return matchesDate && matchesStatus && matchesSearch;
    });
  }, [contacts, selectedDate, leadStatusFilter, leadSearch]);

  const projectCategories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCat =
        projectCategoryFilter === "ALL" || proj.category === projectCategoryFilter;
      const q = projectSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.title?.toLowerCase().includes(q) ||
        proj.description?.toLowerCase().includes(q) ||
        proj.techStack?.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [projects, projectCategoryFilter, projectSearch]);

  const newLeadsCount = contacts.filter((c) => (c.status || "New") === "New").length;
  const activeProjectsCount = projects.filter((p) => (p.status || "Active") === "Active").length;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              SyncWard Admin Portal
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage client inquiries, lead pipelines, and live portfolio projects.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchData}
              className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Link href="/admin/projects/new">
              <Button className="bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-all">
                <PlusCircle size={18} className="mr-2" /> Add New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#286ef0]">
              <Users size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                Total Leads
              </p>
              <h3 className="text-2xl font-bold text-slate-900">{contacts.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                New / Unread Leads
              </p>
              <h3 className="text-2xl font-bold text-amber-600">{newLeadsCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                Total Projects
              </p>
              <h3 className="text-2xl font-bold text-slate-900">{projects.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                Active Projects
              </p>
              <h3 className="text-2xl font-bold text-emerald-600">{activeProjectsCount}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "leads"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Client Inquiries ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "projects"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Portfolio Projects ({projects.length})
          </button>
        </div>

        {/* TAB 1: CLIENT LEADS */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Client Inquiries & Leads</h3>
                <p className="text-xs text-slate-500">
                  Click any lead&apos;s View icon to read the complete inquiry message.
                </p>
              </div>

              {/* Search, Status & Date Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl flex-1 sm:w-64">
                  <Search size={16} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, email, subject..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="bg-transparent text-sm text-slate-700 outline-none w-full"
                  />
                </div>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                  <Calendar size={16} className="text-slate-500" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                  />
                </div>

                {(selectedDate || leadSearch || leadStatusFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSelectedDate("");
                      setLeadSearch("");
                      setLeadStatusFilter("ALL");
                    }}
                    className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                  >
                    <X size={14} /> Reset
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <p className="text-slate-500 text-sm py-8 text-center">Loading client leads...</p>
            ) : filteredContacts.length === 0 ? (
              <p className="text-slate-500 text-sm py-8 text-center">
                No matching leads found for the current filters.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Client</th>
                      <th className="pb-3 font-semibold">Contact Info</th>
                      <th className="pb-3 font-semibold">Subject & Preview</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Received</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredContacts.map((lead) => {
                      const status = lead.status || "New";
                      return (
                        <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 font-semibold text-slate-900 whitespace-nowrap">
                            {lead.name}
                          </td>
                          <td className="py-4">
                            <div className="flex flex-col gap-1">
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-[#286ef0] hover:underline text-xs flex items-center gap-1"
                              >
                                <Mail size={12} /> {lead.email}
                              </a>
                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="text-slate-500 text-xs flex items-center gap-1"
                                >
                                  <Phone size={12} /> {lead.phone}
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-4 max-w-xs">
                            <p className="font-semibold text-slate-800 text-xs mb-0.5">
                              {lead.subject || "General Inquiry"}
                            </p>
                            <p className="truncate text-slate-500 text-xs">{lead.message}</p>
                          </td>
                          <td className="py-4">
                            <select
                              disabled={actionLoadingId === lead._id}
                              value={status}
                              onChange={(e) => handleLeadStatusChange(lead._id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                                LEAD_STATUS_STYLES[status] || LEAD_STATUS_STYLES.New
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="py-4 text-xs text-slate-400 whitespace-nowrap">
                            <div>{new Date(lead.createdAt).toLocaleDateString("en-IN")}</div>
                            <div>
                              {new Date(lead.createdAt).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                          <td className="py-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#286ef0] transition-colors"
                                title="View Full Message"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                disabled={actionLoadingId === lead._id}
                                onClick={() => handleDeleteLead(lead._id)}
                                className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PORTFOLIO PROJECTS */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Published Portfolio Projects</h3>
                <p className="text-xs text-slate-500">
                  Edit project details, toggle status, or remove outdated case studies.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl flex-1 sm:w-64">
                  <Search size={16} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search title or tech stack..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="bg-transparent text-sm text-slate-700 outline-none w-full"
                  />
                </div>

                <select
                  value={projectCategoryFilter}
                  onChange={(e) => setProjectCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 outline-none cursor-pointer"
                >
                  {projectCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "ALL" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-slate-500 text-sm py-8 text-center">Loading projects...</p>
            ) : filteredProjects.length === 0 ? (
              <p className="text-slate-500 text-sm py-8 text-center">
                No projects found. Click &quot;Add New Project&quot; to create one.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Project</th>
                      <th className="pb-3 font-semibold">Category</th>
                      <th className="pb-3 font-semibold">Tech Stack</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredProjects.map((proj) => {
                      const status = proj.status || "Active";
                      return (
                        <tr key={proj._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {proj.image && (
                                <img
                                  src={proj.image}
                                  alt={proj.title}
                                  className="w-12 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                                />
                              )}
                              <div>
                                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                                  {proj.title}
                                  {proj.featured && (
                                    <span className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                      <Sparkles size={10} /> Featured
                                    </span>
                                  )}
                                </div>
                                {proj.liveUrl && (
                                  <a
                                    href={proj.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#286ef0] hover:underline inline-flex items-center gap-1 mt-0.5"
                                  >
                                    Live Preview <ExternalLink size={11} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 font-medium text-slate-700">{proj.category}</td>
                          <td className="py-4">
                            <div className="flex flex-wrap gap-1.5 max-w-md">
                              {proj.techStack?.map((tech, i) => (
                                <span
                                  key={i}
                                  className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                PROJECT_STATUS_STYLES[status] || PROJECT_STATUS_STYLES.Active
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="py-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => openEditProjectModal(proj)}
                                className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#286ef0] transition-colors"
                                title="Edit Project"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                disabled={actionLoadingId === proj._id}
                                onClick={() => handleDeleteProject(proj._id)}
                                className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: VIEW FULL LEAD MESSAGE */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedLead.name}</h3>
                <p className="text-xs text-slate-400">
                  Received on {new Date(selectedLead.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 block">Email</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-[#286ef0] font-semibold hover:underline"
                  >
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div>
                    <span className="text-xs text-slate-400 block">Phone</span>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-slate-800 font-semibold hover:underline"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Subject
                </span>
                <p className="font-semibold text-slate-900">
                  {selectedLead.subject || "General Inquiry"}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Full Message
                </span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Status:</span>
                  <select
                    value={selectedLead.status || "New"}
                    onChange={(e) => handleLeadStatusChange(selectedLead._id, e.target.value)}
                    className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteLead(selectedLead._id)}
                    className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                  >
                    <Trash2 size={14} className="mr-1" /> Delete
                  </Button>
                  <Button
                    onClick={() => setSelectedLead(null)}
                    className="bg-slate-900 text-white hover:bg-slate-800 text-xs"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-100 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-lg font-bold text-slate-900">Edit Project</h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProject.image}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, image: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Live Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editingProject.liveUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, Node.js, MongoDB, Tailwind CSS"
                  value={editingProject.techStackInput}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, techStackInput: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#286ef0]"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingProject.featured}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#286ef0]"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      Mark as Featured Project
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingProject(null)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingProject}
                  className="bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl px-6"
                >
                  {savingProject ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}