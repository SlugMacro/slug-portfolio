import { useState } from "react";
import { contactData } from "@/data/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "email" | "message", string>>
  >({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    if (status === "error" || status === "success") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Valid email is required";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch(contactData.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      {/* Hero text: static on mobile, fixed on desktop */}
      <div className="relative z-0 flex min-h-[50vh] w-full items-end px-6 pb-12 pt-24 md:fixed md:top-0 md:left-0 md:w-[25%] md:max-w-[450px] md:items-start md:px-8 md:pt-[180px]">
        <h1 className="text-[clamp(56px,6vw,88px)] leading-[1.05] tracking-[-0.16vw] font-bold text-text-primary">
          Let's Talk
        </h1>
      </div>

      {/* Scrolling content */}
      <div className="relative z-10 w-full px-6 pb-24 md:ml-auto md:w-[75%] md:pt-[70vh] md:pr-8 md:pl-0">
        <div className="bg-bg pt-8 md:pl-8 md:pt-16">
          <div className="max-w-[600px]">
            <p className="mb-10 text-[18px] leading-[28px] text-text-secondary md:mb-12 md:text-[20px] md:leading-[30px]">
              Have a project in mind? Let's create something great together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="border-t border-border py-5 md:py-6">
                <label className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-text-secondary">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-[18px] text-text-primary outline-none transition-colors duration-300 focus:border-accent md:text-[20px]"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="border-t border-border py-5 md:py-6">
                <label className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-text-secondary">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-2 text-[18px] text-text-primary outline-none transition-colors duration-300 focus:border-accent md:text-[20px]"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="border-t border-border py-5 md:py-6">
                <label className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-text-secondary">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none border-b border-border bg-transparent py-2 text-[18px] text-text-primary outline-none transition-colors duration-300 focus:border-accent md:text-[20px]"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-8">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="min-h-[44px] py-3 text-[18px] tracking-[-0.02em] text-text-secondary transition-colors duration-300 hover:text-accent disabled:opacity-50 md:text-[20px]"
                  style={{
                    transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
                  }}
                >
                  {status === "submitting" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </form>

            {status === "success" && (
              <p className="mt-6 text-[16px] text-green-600">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-6 text-[16px] text-red-500">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
