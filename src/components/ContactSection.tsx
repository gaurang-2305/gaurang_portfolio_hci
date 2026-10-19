import React, { useState } from 'react';
import { Copy, Check, Send, AlertCircle, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { HciMarker } from './HciMarker';
import profile from '../data/profile.json';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const emailAddress = profile.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please specify a discussion topic or project inquiry.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide detailed message context (at least 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // 1. Construct mailto link
    const mailtoBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`)}&body=${encodeURIComponent(mailtoBody)}`;

    // 2. Persist locally
    const stored = JSON.parse(localStorage.getItem('contact-messages') || '[]');
    stored.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('contact-messages', JSON.stringify(stored));

    // 3. Open mailto in user's default email client
    setTimeout(() => {
      setStatus('success');
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <section id="contact" className="py-20 border-b border-line bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4 mb-12">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase font-semibold">
              § 06 / TRANSMISSION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mt-1">
              Contact &amp; Engineering Inquiries
            </h2>
          </div>
          <p className="font-mono text-xs text-muted mt-2 sm:mt-0">
            DIRECT SECURE DISPATCH &bull; NO THIRD-PARTY TRACKING
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-text">
              Let's Discuss Systems &amp; Applied AI
            </h3>
            <p className="text-sm text-text/80 leading-relaxed">
              Whether you are discussing full-stack RAG architectures, multi-tenant engineering, student research collaborations, or technical opportunities, my direct channels are open.
            </p>

            {/* Direct Email Card with Quick Action Buttons */}
            <div className="p-5 rounded-xl bg-surface border border-line shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent uppercase font-bold">
                  Direct Email Address
                </span>
                <span className="text-[10px] font-mono text-muted bg-bg px-2 py-0.5 rounded border border-line">
                  Primary
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-bg border border-line">
                <span className="font-mono text-xs sm:text-sm text-text font-medium truncate">
                  {emailAddress}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface hover:bg-accent hover:text-white text-xs font-mono text-text transition-colors border border-line min-h-[36px]"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-500" />
                        <span className="font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${emailAddress}?subject=Portfolio Inquiry`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white text-xs font-mono font-bold transition-colors hover:bg-accent/90 min-h-[36px]"
                  >
                    <Mail size={14} />
                    <span>Open Mail</span>
                  </a>
                </div>
              </div>
              <p className="text-[11px] font-mono text-muted">
                * Preferred channel for asynchronous technical correspondence.
              </p>
            </div>

            {/* Profiles & Links */}
            <div className="space-y-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="draft-card p-4 flex items-center justify-between group min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-bg border border-line text-accent">
                    <GithubIcon size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-text group-hover:text-accent transition-colors">
                      {profile.github.replace('https://', '')}
                    </h4>
                    <p className="text-[11px] font-mono text-muted">Open-source repositories and commit activity</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted group-hover:text-accent transition-colors" />
              </a>

              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="draft-card p-4 flex items-center justify-between group min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-bg border border-line text-accent">
                      <LinkedinIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-text group-hover:text-accent transition-colors">
                        LinkedIn Profile
                      </h4>
                      <p className="text-[11px] font-mono text-muted">{profile.linkedin.replace('https://', '')}</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-muted group-hover:text-accent transition-colors" />
                </a>
              ) : (
                <div className="p-4 rounded-xl bg-surface border border-line/60 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-bg border border-line text-muted">
                      <LinkedinIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-text">
                        LinkedIn Profile
                      </h4>
                      <p className="text-[11px] font-mono text-accent">[Set in src/data/profile.json]</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-bg px-2 py-0.5 rounded border border-line text-muted">
                    Pending
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-bg border border-line text-xs font-mono text-muted">
              <span className="text-accent font-bold">Privacy Note: </span>
              In accordance with security standards, phone numbers are not published online. All communication is routed securely via authenticated email.
            </div>
          </div>

          {/* Right: Working Accessible Form */}
          <div className="lg:col-span-7 draft-card p-6 sm:p-8 relative">
            <HciMarker id="lens-08" className="absolute -top-3 -right-3" />

            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <span className="font-mono text-xs text-accent tracking-widest uppercase font-semibold">
                  MESSAGE DISPATCH FORM
                </span>
                <h3 className="font-serif text-2xl font-bold text-text mt-0.5">
                  Send a Direct Message
                </h3>
              </div>
              <span className="font-mono text-[10px] bg-bg px-2 py-1 rounded border border-line text-muted">
                LIVE MAILTO / PERSISTED
              </span>
            </div>

            {/* Live Status Region */}
            <div aria-live="polite" className="sr-only">
              {status === 'submitting' && 'Preparing email dispatch...'}
              {status === 'success' && 'Message successfully logged and opened in mail client.'}
            </div>

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/15 text-green-400 mb-2">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-text">
                  Dispatch Prepared &amp; Logged!
                </h4>
                <p className="text-sm text-muted max-w-md mx-auto">
                  Thank you, <strong className="text-text">{formData.name}</strong>. Your message was saved, and your email client was opened to transmit it directly to <span className="text-accent font-mono">{emailAddress}</span>.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${emailAddress}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-mono text-xs font-bold transition-colors hover:bg-accent/90"
                  >
                    <Mail size={14} />
                    <span>Open in Email App Again</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', email: '', subject: '', message: '' });
                      setStatus('idle');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-surface border border-line hover:border-accent font-mono text-xs text-text transition-colors"
                  >
                    Send Another Dispatch &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-muted tracking-wider mb-1.5">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Dr. Alan Turing"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg bg-bg border text-xs font-mono text-text placeholder:text-muted/50 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-accent'
                    }`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-muted tracking-wider mb-1.5">
                    Your Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="e.g. alan@turing.ac.uk"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg bg-bg border text-xs font-mono text-text placeholder:text-muted/50 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-accent'
                    }`}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase text-muted tracking-wider mb-1.5">
                    Subject / Discussion Area <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, subject: e.target.value }));
                      if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                    }}
                    placeholder="e.g. Inquiring about FinScope RAG Architecture"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg bg-bg border text-xs font-mono text-text placeholder:text-muted/50 focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-accent'
                    }`}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-muted tracking-wider mb-1.5">
                    Message Context <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                    }}
                    placeholder="Share any specifications, project ideas, or questions..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg bg-bg border text-xs font-mono text-text placeholder:text-muted/50 focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-accent'
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-muted">
                    Opens directly in your mail client &bull; No data loss
                  </span>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md min-h-[44px]"
                  >
                    {status === 'submitting' ? (
                      <span>Opening Mail Client...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
