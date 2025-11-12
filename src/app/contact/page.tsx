'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const { t, ready } = useTranslation('contact-page');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Se as traduções não estiverem prontas, mostrar loading
  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="flex space-x-2">
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('form.name.error');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.email.error');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.email.error');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('form.phone.error');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('form.subject.error');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.message.error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você integraria com sua API de envio de e-mail
      console.log('Form data:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Unified Content Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5667fe]/10 via-transparent to-[#d1dafb]/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#5667fe]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#d1dafb]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-32 pb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl font-urbancat-st font-bold mb-4 text-white">
              {t('title')}
            </h1>
            <p className="text-lg lg:text-xl text-[#d1dafb]/80 mb-6 font-light font-inter">
              {t('subtitle')}
            </p>
            <p className="text-base text-[#d1dafb]/60 max-w-2xl font-inter">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Contact Form & Info Section */}
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#191927]/50 backdrop-blur-xl border border-[#5667fe]/10 rounded-2xl p-8">
              <h2 className="text-2xl font-urbancat-st font-bold mb-6 text-white">
                {t('form.title')}
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400">{t('form.success')}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400">{t('form.error')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#d1dafb]/80 mb-2">
                      {t('form.name.label')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('form.name.placeholder')}
                      className={`w-full px-4 py-3 bg-[#0A0B0F]/50 border rounded-lg focus:ring-2 focus:ring-[#5667fe] focus:border-transparent transition-all duration-200 text-white placeholder-[#d1dafb]/40 ${
                        errors.name ? 'border-red-500' : 'border-[#5667fe]/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#d1dafb]/80 mb-2">
                      {t('form.email.label')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('form.email.placeholder')}
                      className={`w-full px-4 py-3 bg-[#0A0B0F]/50 border rounded-lg focus:ring-2 focus:ring-[#5667fe] focus:border-transparent transition-all duration-200 text-white placeholder-[#d1dafb]/40 ${
                        errors.email ? 'border-red-500' : 'border-[#5667fe]/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#d1dafb]/80 mb-2">
                      {t('form.phone.label')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('form.phone.placeholder')}
                      className={`w-full px-4 py-3 bg-[#0A0B0F]/50 border rounded-lg focus:ring-2 focus:ring-[#5667fe] focus:border-transparent transition-all duration-200 text-white placeholder-[#d1dafb]/40 ${
                        errors.phone ? 'border-red-500' : 'border-[#5667fe]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#d1dafb]/80 mb-2">
                      {t('form.company.label')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('form.company.placeholder')}
                      className="w-full px-4 py-3 bg-[#0A0B0F]/50 border border-[#5667fe]/20 rounded-lg focus:ring-2 focus:ring-[#5667fe] focus:border-transparent transition-all duration-200 text-white placeholder-[#d1dafb]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#d1dafb]/80 mb-2">
                    {t('form.subject.label')} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('form.subject.placeholder')}
                    className={`w-full px-4 py-3 bg-[#0A0B0F]/50 border rounded-lg focus:ring-2 focus:ring-[#5667fe] focus:border-transparent transition-all duration-200 text-white placeholder-[#d1dafb]/40 ${
                      errors.subject ? 'border-red-500' : 'border-[#5667fe]/20'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#d1dafb]/80 mb-2">
                    {t('form.message.label')} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('form.message.placeholder')}
                    rows={5}
                    className={`w-full px-4 py-3 bg-[#0A0B0F]/50 border rounded-lg focus:ring-2 focus:ring-[#5667fe] focus:border-transparent transition-all duration-200 text-white placeholder-[#d1dafb]/40 resize-vertical ${
                      errors.message ? 'border-red-500' : 'border-[#5667fe]/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#5667fe] to-[#4c5bfe] hover:from-[#4c5bfe] hover:to-[#5667fe] px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg shadow-[#5667fe]/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>{t('form.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('form.submit')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#191927]/50 backdrop-blur-xl border border-[#5667fe]/10 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-urbancat-st font-bold mb-6 text-white">
                {t('contact_info.title')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#5667fe] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#d1dafb]/60">{t('contact_info.email.label')}</p>
                    <p className="text-white">{t('contact_info.email.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#5667fe] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#d1dafb]/60">{t('contact_info.phone.label')}</p>
                    <p className="text-white">{t('contact_info.phone.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-[#5667fe] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#d1dafb]/60">{t('contact_info.whatsapp.label')}</p>
                    <p className="text-white">{t('contact_info.whatsapp.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#5667fe] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#d1dafb]/60">{t('contact_info.address.label')}</p>
                    <p className="text-white whitespace-pre-line">{t('contact_info.address.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#5667fe] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#d1dafb]/60">{t('contact_info.business_hours.label')}</p>
                    <p className="text-white whitespace-pre-line">{t('contact_info.business_hours.value')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}