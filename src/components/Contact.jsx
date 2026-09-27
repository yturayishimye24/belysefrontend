import {useRef,useState,useEffect} from "react"
import emailjs from "@emailjs/browser";
import {BlinkBlur} from "react-loading-indicators"
import Aos from "aos";
import "aos/dist/aos.css"

export default function Contact() {
  const [loading,setLoading] = useState(false);
  const form = useRef();
  useEffect(()=>{
     Aos.init({
      duration: 1000,
      once: true,
     })
  },[])
  const sendEmail = async (e) =>{
    e.preventDefault();
    setLoading(true);

    try{
      await emailjs.sendForm("service_fvyjy5k", "template_wjatw3b", form.current, "vfvKIY9D4tzjlkrbJ");
      alert("Message sent successfully!");
      form.current.reset();
    } catch {
      alert("Failed to send message, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="w-full scroll-mt-24 bg-white px-4 py-16">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-5xl font-poppins text-center text-gray-800">Get in Touch</h2>
        
        <form ref={form} className="space-y-5" onSubmit={sendEmail}>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
         <div className="flex flex-col space-y-4">
          <div className="relative">
            <input
              data-aos="fade-up"
              name="firstName"
              type="text"
              id="firstName"
              className="block w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:border-transparent peer"
              placeholder=""
              required
            />
            <label
              htmlFor="firstName"
              className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0F9D58]"
            >
              First name
            </label>
          </div>

          <div className="relative">
            <input
              data-aos="fade-left"
              name="lastName"
              type="text"
              id="lastName"
              className="block w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:border-transparent peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="lastName"
              className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0F9D58]"
            >
              Last name
            </label>
          </div>
          
          <div className="relative">
            <input
              data-aos="fade-left"
              name="email"
              type="email"
              id="email"
              className="block w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:border-transparent peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0F9D58]"
            >
               Email
            </label>
          </div>
          </div>
         
          <div className="relative h-full">
            <textarea
              data-aos="fade-down"
              name="message"
              id="message"
              rows="4"
              className="block h-full min-h-[188px] w-full resize-none px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:border-transparent peer"
              placeholder=""
              required
            />
            <label
              htmlFor="message"
              className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0F9D58]"
            >
              Your Message
            </label>
          </div>
</div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0F9D58] hover:bg-[#18975a] text-white font-medium rounded-md text-sm transition-all disabled:cursor-not-allowed disabled:hover:bg-green-100"
          >
            {!loading? "Send" : "Sending..."}
          </button>
        </form>
      </div>

      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Sending message"
        >
          <div className="flex min-h-[188px] w-full max-w-sm items-center justify-center rounded-md bg-white px-8 shadow-xl">
            <BlinkBlur
              color={["#4285F4", "#EA4335", "#FBBC05", "#34A853"]}
              size="medium"
              text=""
              textColor=""
            />
          </div>
        </div>
      )}
    </section>
  );
}
