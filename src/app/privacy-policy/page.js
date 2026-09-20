import HeroSection from "@/components/common/HeroSection";

export const metadata = {
  title: "Privacy Policy | SyncWard Technologies",
  description: "Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeroSection 
        bgImage="/background/legal-hero-bg.jpg" // public folder me ek minimal dark background rakh lena
        subtitle="Legal"
        title="Privacy Policy"
        description="We value your privacy. Learn how we collect, use, and protect your personal data."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
            
            <p className="text-[15px] leading-relaxed">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <p className="text-[15px] leading-relaxed">
              At SyncWard Technologies ("we," "our," or "us"), we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p className="text-[15px] leading-relaxed mb-3">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
              <ul className="list-disc pl-5 space-y-2 text-[15px]">
                <li>Names, email addresses, phone numbers, and job titles.</li>
                <li>Project details and business requirements submitted via our contact forms.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-[15px] leading-relaxed mb-3">We use personal information collected via our website for a variety of business purposes described below:</p>
              <ul className="list-disc pl-5 space-y-2 text-[15px]">
                <li>To respond to your inquiries and offer support.</li>
                <li>To deliver and facilitate delivery of services to the user.</li>
                <li>To send administrative information to you, such as updates to our terms, conditions, and policies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">3. Cookies and Tracking Technologies</h2>
              <p className="text-[15px] leading-relaxed">
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. You can set your browser to refuse all or some browser cookies, but this may affect your user experience on our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
              <p className="text-[15px] leading-relaxed">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
              <p className="text-[15px] leading-relaxed">
                If you have questions or comments about this notice, you may email us at <strong>connect@syncward.com</strong> or by post to:
                <br /><br />
                SyncWard Technologies<br />
                Pune, Maharashtra, India
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}