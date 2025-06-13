export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  avatar?: string;
}

export interface Patient extends User {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  bloodType?: string;
  address?: string;
  phone?: string;
}

export interface Doctor extends User {
  specialization: string;
  qualifications: string[];
  experience: number;
  availableDays: string[];
  availableHours: string;
  consultationFee: number;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'rejected' | 'completed';
  reason: string;
  notes?: string;
  patientName?: string;
  doctorName?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export interface Bill {
  id: string;
  patientId: string;
  date: string;
  items: BillItem[];
  totalAmount: number;
  status: 'Pending' | 'Paid' | 'Cancelled';
  paymentMethod?: string;
  paymentDate?: string;
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface HospitalReport  {
  id: string;
  type: 'financial' | 'appointments' | 'patient' | 'doctor';
  title: string;
  generatedDate: string;
  period: string;
  data: any; // Can be more specific based on report type
  downloadUrl?: string;
}

export interface PatientReport {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  title: string;
  type: 'lab' | 'diagnostic' | 'prescription' | 'summary';
  content: string;
  attachments?: string[]; // URLs to attached files
  doctorName?: string;
  isShared: boolean;
}