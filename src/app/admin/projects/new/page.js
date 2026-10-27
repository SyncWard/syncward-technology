"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  Upload,
  Trash2,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { IKContext, IKUpload } from "imagekitio-react";

export default function AddProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    image: "",
    techStack: "",
    liveUrl: "",
    status: "Active",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [useManualUrl, setUseManualUrl] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUploadSuccess = (res) => {
    setUploading(false);
    setErrorMsg("");
    setFormData((prev) => ({ ...prev, image: res.url }));
  };

  const handleUploadError = (err) => {
    setUploading(false);
    setErrorMsg("Image upload failed: " + (err?.message || "Check ImageKit configuration"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (uploading) {
      setErrorMsg("Please wait for the image upload to finish.");
      return;
    }

    if (!formData.image.trim()) {
      setErrorMsg("Please upload a project image or provide an image URL.");
      return;
    }

    setLoading(true);

    try {
      const formattedData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        liveUrl: formData.liveUrl.trim(),
        techStack: formData.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(result.error || "Failed to publish project.");
      }
    } catch (error) {
      console.error("Failed to add project:", error);
      setErrorMsg("Network error occurred while saving the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-12">
        <Link
          href="/admin"
          className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Add New Project</h1>
        <p className="text-slate-500 text-sm mb-6">
          Publish a new case study or portfolio item to SyncWard Technologies.
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-slate-700">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., E-Commerce Platform"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-slate-700">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud & AI">Cloud & AI</option>
                <option value="Custom Software">Custom Software</option>
                <option value="E-Commerce">E-Commerce</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short overview of the project, problem solved, and key results..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px] resize-none"
              required
            />
          </div>

          {/* Image Uploader / URL Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-slate-700">
                Project Image *
              </label>
              <button
                type="button"
                onClick={() => setUseManualUrl(!useManualUrl)}
                className="text-xs font-semibold text-[#286ef0] hover:underline inline-flex items-center gap-1"
              >
                <LinkIcon size={12} />
                {useManualUrl ? "Use ImageKit Uploader" : "Or paste Image URL"}
              </button>
            </div>

            {useManualUrl ? (
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ik.imagekit.io/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
              />
            ) : formData.image ? (
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-12 object-cover rounded-lg border border-emerald-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-semibold">
                      <CheckCircle size={16} /> Image Ready
                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-xs">
                      {formData.image}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                  className="p-2 rounded-xl bg-white text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                  title="Remove and upload another image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 text-center flex flex-col items-center justify-center">
                <IKContext
                  publicKey={publicKey}
                  urlEndpoint={urlEndpoint}
                  authenticator={async () => {
                    const res = await fetch("/api/imagekit-auth");
                    if (!res.ok) {
                      throw new Error("Unauthorized or failed to reach /api/imagekit-auth");
                    }
                    return await res.json();
                  }}
                >
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-[#286ef0]/10 text-[#286ef0] rounded-full flex items-center justify-center">
                      <Upload size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {uploading ? "Uploading to ImageKit..." : "Click to upload project image"}
                    </span>
                    <span className="text-xs text-slate-400">
                      PNG, JPG, or WebP (Recommended 16:10 ratio)
                    </span>
                    <IKUpload
                      fileName="project-image"
                      onUploadStart={() => {
                        setErrorMsg("");
                        setUploading(true);
                      }}
                      onError={handleUploadError}
                      onSuccess={handleUploadSuccess}
                      className="hidden"
                    />
                  </label>
                </IKContext>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-slate-700">
                Tech Stack (comma separated) *
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="Next.js, Tailwind, MongoDB"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-slate-700">
                Live URL
              </label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-slate-700">
                Visibility Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
              >
                <option value="Active">Active (Visible on site)</option>
                <option value="Draft">Draft (Hidden from public)</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#286ef0]"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Feature on Homepage Portfolio
                </span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl py-6 mt-4 text-[14px] font-bold shadow-md transition-all disabled:opacity-50"
          >
            {uploading
              ? "Waiting for image upload..."
              : loading
              ? "Saving Project..."
              : "Publish Project"}
          </Button>
        </form>
      </div>
    </div>
  );
}