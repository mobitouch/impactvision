import { useState } from "react";
import { useForm } from "react-hook-form";
import { m } from "framer-motion";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        const errData = await response.json();
        throw new Error(errData.error || "Failed to send message.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="bg-navy text-white pt-[120px] pb-10 px-6 md:px-12 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(#d4e0ed 1px, transparent 1px), linear-gradient(90deg, #d4e0ed 1px, transparent 1px)",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-[120px]">
        {/* Left Col */}
        <m.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-[11px] text-accent tracking-[0.2em] mb-4">
            07 — CONTACT
          </div>
          <h2 className="font-serif text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.02em] mb-8">
            Ready to make an <em className="italic text-accent">Impact?</em>
          </h2>
          <p className="font-sans text-[16px] text-[#88a0c8] mb-12 max-w-[480px] leading-[1.7]">
            Whether you’re planning an international festival or a corporate
            gala, our experts are ready to bring your vision to life. Let’s
            discuss your next production.
          </p>

          <div className="flex flex-col gap-6 font-sans text-[15px]">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                Email
              </span>
              <a
                href="mailto:info@impactvision.com"
                className="hover:text-accent transition-colors"
              >
                info@impactvision.com
              </a>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                Main Office
              </span>
              <span className="text-[#88a0c8]">
                Riyadh, Kingdom of Saudi Arabia
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                Follow Us
              </span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </m.div>

        {/* Right Col: Form */}
        <m.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-[#ffffff05] border border-accent/20 rounded-[16px] p-8 md:p-12 backdrop-blur-sm"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/30 text-accent text-2xl">
                ✓
              </div>
              <h3 className="font-serif text-[32px] mb-3">Message Received</h3>
              <p className="font-sans text-[#88a0c8] max-w-[300px] leading-[1.6]">
                Thank you for reaching out. Our team will get back to you
                shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Honeypot field (hidden from real users, visible to simple bots) */}
              <div className="absolute opacity-0 -z-50 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex="-1">
                <label>Do not fill this out if you are human: 
                  <input {...register("bot_field")} type="text" tabIndex="-1" autoComplete="off" />
                </label>
              </div>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-md font-sans text-[14px] flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">!</span>
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                    First Name
                  </label>
                  <input
                    {...register("firstName", { required: true })}
                    data-cursor="TYPE"
                    className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors placeholder:text-white/20"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <span className="text-red-400 text-[11px] font-sans">
                      Required field
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", { required: true })}
                    data-cursor="TYPE"
                    className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors placeholder:text-white/20"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <span className="text-red-400 text-[11px] font-sans">
                      Required field
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  data-cursor="TYPE"
                  className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors placeholder:text-white/20"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="text-red-400 text-[11px] font-sans">
                    Valid email required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  data-cursor="TYPE"
                  className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors resize-none placeholder:text-white/20"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <span className="text-red-400 text-[11px] font-sans">
                    Required field
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="SEND"
                className="mt-4 bg-accent text-navy py-[16px] rounded-md font-sans text-[15px] font-bold tracking-wide shadow-[0_4px_20px_rgba(212,224,237,0.2)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(212,224,237,0.3)] transition-all disabled:opacity-50 disabled:-translate-y-0"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </m.div>
      </div>

      {/* Footer */}
      <footer className="mt-[120px] pt-10 pb-6 px-6 md:px-12 border-t border-[#ffffff11] relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        {/* Left: Brand + text */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="font-serif text-[24px] text-white">Impact Vision</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-[13px] text-[#6a8ab0]">
              © {new Date().getFullYear()} Impact Vision. All rights reserved.
            </span>
            <span className="text-[#6a8ab0]/40 text-[10px]">•</span>
            <a
              href="https://mobitouch.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[12px] text-[#6a8ab0]/70 hover:text-accent transition-colors duration-200"
            >
              Powered by <span className="font-medium text-[#6a8ab0]">MobiTouch.online</span>
            </a>
          </div>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-4 pr-20">
          {/* Instagram */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#6a8ab0] hover:text-accent transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#6a8ab0] hover:text-accent transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
        </div>
      </footer>
    </section>
  );
}
