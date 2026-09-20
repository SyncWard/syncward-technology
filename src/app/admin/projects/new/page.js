"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Upload } from "lucide-react";
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
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (res) => {
    setUploading(false);
    setFormData({ ...formData, image: res.url });
    alert("Image uploaded successfully via ImageKit!");
  };

  const handleUploadError = (err) => {
    setUploading(false);
    alert("Image upload failed: " + err.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a project image first!");
      return;
    }
    setLoading(true);

    try {
      const formattedData = {
        ...formData,
        techStack: formData.techStack.split(",").map((tech) => tech.trim()),
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Project added successfully!");
        router.push("/admin");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Failed to add project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-12">
        
        <Link href="/admin" className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Project</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Project Title *</label>
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
            <label className="text-[13px] font-semibold text-slate-700">Category *</label>
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
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Description *</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short overview of the project..." 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px] resize-none"
              required
            ></textarea>
          </div>

          {/* ImageKit Uploader */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Project Image *</label>
            {formData.image ? (
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium">
                <CheckCircle size={18} /> Image Uploaded Successfully!
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 text-center flex flex-col items-center justify-center">
                <IKContext 
                  publicKey={publicKey} 
                  urlEndpoint={urlEndpoint} 
                  authenticator={async () => {
                    const res = await fetch("/api/imagekit-auth");
                    return await res.json();
                  }}
                >
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-[#286ef0]/10 text-[#286ef0] rounded-full flex items-center justify-center">
                      <Upload size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {uploading ? "Uploading..." : "Click to upload project image"}
                    </span>
                    <IKUpload 
                      fileName="project-image"
                      onUploadStart={() => setUploading(true)}
                      onError={handleUploadError}
                      onSuccess={handleUploadSuccess}
                      className="hidden"
                    />
                  </label>
                </IKContext>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Tech Stack (comma separated) *</label>
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
            <label className="text-[13px] font-semibold text-slate-700">Live URL</label>
            <input 
              type="text" 
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://example.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl py-6 mt-4 text-[14px] font-bold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Saving Project..." : "Publish Project"}
          </Button>
        </form>

      </div>
    </div>
  );
}