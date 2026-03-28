export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <h1 className="text-4xl font-bold tracking-tight text-[#37352F] mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-[#505050] font-medium leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#37352F]">1. Information We Collect</h2>
          <p>
            When you use QuantumCraft, we collect information that identifies you, such as your full name, email address, and company details. We also securely collect authentication data through Supabase to provide your dashboard access.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#37352F]">2. How We Use Your Data</h2>
          <p>
            Your information is used exclusively to facilitate your content orders, manage your dashboard experience, and communicate important updates regarding your project statuses.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#37352F]">3. Data Security</h2>
          <p>
            We implement industry-standard Row Level Security (RLS) via Supabase, ensuring that your data and content requests are perfectly isolated and accessible only to you and our internal team.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#37352F]">4. Contact Us</h2>
          <p>
            If you have questions about your privacy, please contact us at privacy@quantumcraft.com.
          </p>
        </section>
      </div>
    </div>
  );
}
