import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // 1. Replaced axios with emailjs
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FloatingField({ id, label, value, onChange, type = 'text', as = 'input', rows = 4, required = false }) {
  const Tag = as;

  const fieldClasses =
    'peer w-full rounded-lg border border-[#747775] bg-transparent px-4 pt-4 pb-[15px] text-[15px] leading-6 text-[#1f1f1f] outline-none transition-colors duration-150 placeholder-transparent focus:border-2 focus:border-[#0b57d0] focus:px-[15px] focus:pt-[15px] focus:pb-[14px] resize-none';

  const labelClasses =
    'pointer-events-none absolute left-3 top-4 origin-left bg-[#f8f9fa] px-1 text-[15px] text-[#5f6368] transition-all duration-150 ' +
    'peer-focus:-top-2.5 peer-focus:left-2.5 peer-focus:scale-[0.8] peer-focus:text-[#0b57d0] ' +
    'peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:scale-[0.8] peer-[:not(:placeholder-shown)]:text-[#5f6368]';

  return (
    <div className="relative w-full">
      <Tag
        id={id}
        name={id} // Crucial: name attribute maps directly to EmailJS dynamic template bracket tags
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className={fieldClasses}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}

export default function ContactCard() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false); // Added loading state flag

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // 2. Define template parameters object mapping to your EmailJS tags
    const templateParams = {
      email: email,
      subject: subject,
      message: message,
    };

    // 3. EmailJS credentials configuration settings
    const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with yours
    const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with yours
    const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with yours

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success('Email sent successfully!', {
          position: 'top-right',
          autoClose: 5000,
        });
        setEmail('');
        setSubject('');
        setMessage('');
        setIsSending(false);
      })
      .catch((error) => {
        toast.error('Failed to send email. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
        });
        console.error('EmailJS Error:', error);
        setIsSending(false);
      });
  };

  return (
    <div
      className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-[28px] border border-[#e0e0e0] bg-[#f8f9fa] p-8 font-sans shadow-sm md:p-10"
      id="contact-section"
    >
      {/* Heading */}
      <div className="mb-8 max-w-xl">
        <h2 className="text-center font-['Segoe_UI',Arial,sans-serif] text-3xl leading-tight tracking-tight text-[#1f1f1f] md:text-4xl">
          Please, let's stay in touch!
        </h2>
        <p className="mt-4 text-center font-poppins text-2xl leading-relaxed text-[#5f6368]">
          Let's get connected!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative flex w-full flex-col">
        <div className="mb-16 flex w-full flex-col gap-6 md:max-w-md">
          <FloatingField
            id="subject"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <FloatingField
            id="email"
            label="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FloatingField
            id="message"
            label="Message"
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Cut-corner send button, anchored to the card's bottom-right edge */}
        <div className="absolute bottom-0 right-0 flex h-16 items-stretch justify-end">
          <div className="pointer-events-none absolute -left-6 -top-6 h-12 w-12 rounded-full bg-transparent shadow-[12px_12px_0_0_#f8f9fa]" />
          <button
            type="submit"
            disabled={isSending}
            className="flex items-center justify-center gap-2 rounded-tl-[24px] rounded-br-[28px] bg-[#e8f0fe] px-8 text-sm font-medium text-[#0b57d0] transition-colors duration-200 hover:bg-[#d2e3fc] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSending ? 'Sending...' : 'Send'}</span>
            {!isSending && (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
}
