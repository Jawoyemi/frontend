import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Loader2, AlertCircle } from 'lucide-react';
import { ApiPatientCreate } from '../types';

interface CreatePatientModalProps {
  onClose: () => void;
  onCreate: (payload: ApiPatientCreate) => Promise<void>;
}

const FIELD_CLASS =
  'w-full px-3 py-2 rounded-xl border border-border bg-bg-main text-xs text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all';

const LABEL_CLASS = 'block text-[10px] font-bold uppercase tracking-wide text-text-secondary mb-1';

export default function CreatePatientModal({ onClose, onCreate }: CreatePatientModalProps) {
  const [form, setForm] = useState<ApiPatientCreate>({
    hospital_id: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'M',
    phone: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof ApiPatientCreate) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!form.hospital_id.trim() || !form.first_name.trim() || !form.last_name.trim() || !form.date_of_birth || !form.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await onCreate(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create patient.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 bg-white rounded-2xl shadow-2xl border border-border w-full max-w-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-text-primary">Register New Patient</h2>
                <p className="text-[10px] text-text-secondary">All required fields marked with *</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-main rounded-xl text-text-secondary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto thin-scrollbar">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Row 1 — Hospital ID */}
            <div>
              <label className={LABEL_CLASS}>Hospital ID *</label>
              <input
                type="text"
                value={form.hospital_id}
                onChange={set('hospital_id')}
                placeholder="e.g. CLX-2024-001"
                className={FIELD_CLASS}
                required
              />
            </div>

            {/* Row 2 — Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLASS}>First Name *</label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={set('first_name')}
                  placeholder="First name"
                  className={FIELD_CLASS}
                  required
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Last Name *</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={set('last_name')}
                  placeholder="Last name"
                  className={FIELD_CLASS}
                  required
                />
              </div>
            </div>

            {/* Row 3 — DOB + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLASS}>Date of Birth *</label>
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={set('date_of_birth')}
                  className={FIELD_CLASS}
                  required
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Gender *</label>
                <select value={form.gender} onChange={set('gender')} className={FIELD_CLASS}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>

            {/* Row 4 — Phone */}
            <div>
              <label className={LABEL_CLASS}>Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+234 800 000 0000"
                className={FIELD_CLASS}
                required
              />
            </div>

            {/* Row 5 — Address */}
            <div>
              <label className={LABEL_CLASS}>Address</label>
              <input
                type="text"
                value={form.address}
                onChange={set('address')}
                placeholder="Street address (optional)"
                className={FIELD_CLASS}
              />
            </div>

            {/* Section divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 border-t border-border" />
              <span className="text-[10px] font-bold uppercase text-text-light tracking-wider">Emergency Contact</span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Row 6 — Emergency contact */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLASS}>Contact Name</label>
                <input
                  type="text"
                  value={form.emergency_contact_name}
                  onChange={set('emergency_contact_name')}
                  placeholder="Full name"
                  className={FIELD_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Contact Phone</label>
                <input
                  type="tel"
                  value={form.emergency_contact_phone}
                  onChange={set('emergency_contact_phone')}
                  placeholder="Phone number"
                  className={FIELD_CLASS}
                />
              </div>
            </div>

            {/* Row 7 — Insurance */}
            <div>
              <label className={LABEL_CLASS}>Insurance / NHIS ID</label>
              <input
                type="text"
                value={form.insurance_id}
                onChange={set('insurance_id')}
                placeholder="Insurance ID (optional)"
                className={FIELD_CLASS}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2 pb-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-border text-text-secondary text-xs font-bold hover:bg-bg-main transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl gradient-primary text-white text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Register Patient
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
