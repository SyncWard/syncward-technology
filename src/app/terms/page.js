import HeroSection from "@/components/common/HeroSection";

export const metadata = {
  title: "Terms & Conditions | SyncWard Technologies",
  description: "Rules and guidelines for using our website and services.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeroSection 
        bgImage="/legal-hero-bg.jpg" // Same image as privacy policy use kar sakte ho
        subtitle="Legal"
        title="Terms & Conditions"
        description="Rules and guidelines for using our website and services."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
            
            <p className="text-[15px] leading-relaxed">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <p className="text-[15px] leading-relaxed">
              Welcome to SyncWard Technologies. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-[15px] leading-relaxed">
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use SyncWard Technologies if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">2. Services and Scope</h2>
              <p className="text-[15px] leading-relaxed">
                SyncWard Technologies provides custom software development, mobile app development, UI/UX design, and IT consulting services. All projects, timelines, and deliverables will be clearly outlined in a separate written agreement or Statement of Work (SOW) provided to the client before project commencement.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">3. Payment Terms</h2>
              <p className="text-[15px] leading-relaxed">
                Payment structures, including upfront deposits and milestone payments, are detailed in specific project proposals. Invoices are payable within the agreed timeframe. SyncWard Technologies reserves the right to halt work if payments are delayed.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property Rights</h2>
              <p className="text-[15px] leading-relaxed">
                Unless otherwise stated, SyncWard Technologies and/or its licensors own the intellectual property rights for all material on this website. Upon full payment for a custom project, intellectual property rights for the developed software are transferred to the client, as stipulated in the specific project contract.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-[15px] leading-relaxed">
                In no event shall SyncWard Technologies, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website or our services, whether such liability is under contract. SyncWard Technologies shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">6. Governing Law</h2>
              <p className="text-[15px] leading-relaxed">
                These terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Pune, Maharashtra for the resolution of any disputes.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}