import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { BlinkBlur } from "react-loading-indicators";

const field =
  "peer block w-full rounded-xl border-2 border-[#b9dfe4] bg-white px-4 pb-2 pt-6 text-sm text-gray-900 focus:border-[#008D9F] focus:outline-none";
const label =
  "pointer-events-none absolute left-4 top-4 origin-[0] -translate-y-3 scale-75 text-sm text-[#087b89] duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#008D9F]";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm("service_fvyjy5k", "template_wjatw3b", form.current, "vfvKIY9D4tzjlkrbJ");
      alert("Message sent successfully!");
      form.current.reset();
    } catch {
      alert("Failed to send message, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold text-[#087b89]">Have a question or an opportunity?</p>
        <h2 className="mt-1 text-4xl font-bold sm:text-5xl">Get in touch</h2>
      </div>

      <form ref={form} onSubmit={sendEmail} className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg sm:grid-cols-2 sm:p-8">
        <div className="relative">
          <input name="firstName" id="firstName" type="text" placeholder=" " required className={field} />
          <label htmlFor="firstName" className={label}>First name</label>
        </div>
        <div className="relative">
          <input name="lastName" id="lastName" type="text" placeholder=" " required className={field} />
          <label htmlFor="lastName" className={label}>Last name</label>
        </div>
        <div className="relative sm:col-span-2">
          <input name="email" id="email" type="email" placeholder=" " required className={field} />
          <label htmlFor="email" className={label}>Email</label>
        </div>
        <div className="relative sm:col-span-2">
          <textarea name="message" id="message" rows="5" placeholder=" " required className={`${field} resize-none`} />
          <label htmlFor="message" className={label}>Your message</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-[#0D4580] to-[#008D9F] py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {loading ? "Sending..." : "Send message"}
        </button>
      </form>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A4857]/40 px-4" role="dialog" aria-modal="true" aria-label="Sending message">
          <div className="flex min-h-[188px] w-full max-w-sm items-center justify-center rounded-3xl bg-white shadow-xl">
            <BlinkBlur color={["#0D4580", "#0A4857", "#008D9F", "#45c4cf"]} size="medium" text="" textColor="" />
          </div>
        </div>
      )}
    </div>
  );
}