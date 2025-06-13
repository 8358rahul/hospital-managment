import type { Doctor, Patient, Appointment, MedicalRecord, Bill, HospitalReport, PatientReport } from '../@types';

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@gmail.com',
    role: 'doctor',
    specialization: 'Cardiology',
    qualifications: ['MD', 'PhD in Cardiology'],
    experience: 15,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableHours: '9:00 AM - 5:00 PM',
    consultationFee: 200,
    avatar: '/avatars/doctor1.jpg',
    status: 'active',
  },
  // Add more doctors...
];

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Smith',
    email: 'patient@gmail.com',
    role: 'patient',
    age: 45,
    gender: 'male',
    bloodType: 'A+',
    address: '123 Main St, Anytown',
    phone: '555-123-4567',
    avatar: '/avatars/patient1.jpg',
  },
  // Add more patients...
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2023-06-15',
    time: '10:00 AM',
    status: 'approved',
    reason: 'Annual checkup',
    patientName: 'John Smith',
    doctorName: 'Dr. Sarah Johnson',
  },
  // Add more appointments...
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'm1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2023-05-10',
    diagnosis: 'Hypertension',
    prescription: 'Lisinopril 10mg daily',
    notes: 'Patient advised to reduce salt intake and exercise regularly',
  },
  // Add more records...
];

export const mockBills: Bill[] = [
  {
    id: 'b1',
    patientId: 'p1',
    date: '2023-06-15',
    totalAmount: 450,
    status: 'paid',
    paymentMethod: 'Credit Card',
    paymentDate: '2023-06-15',
    items: [
      {
        id: 'i1',
        description: 'Consultation Fee',
        quantity: 1,
        unitPrice: 200,
        amount: 200
      },
      {
        id: 'i2',
        description: 'Lab Tests',
        quantity: 2,
        unitPrice: 125,
        amount: 250
      }
    ]
  },
  // Add more bills...
];

 
export const mockReports: HospitalReport[] = [
  {
    id: 'r1',
    type: 'financial',
    title: 'Monthly Revenue Report - June 2023',
    generatedDate: '2023-06-30',
    period: 'June 2023',
    data: {
      totalRevenue: 12500,
      paidBills: 28,
      pendingBills: 5,
      revenueByService: {
        consultations: 6500,
        labTests: 4000,
        procedures: 2000
      },
      notes: 'Revenue increased by 15% compared to last month.'
    }
  },
  {
    id: 'r2',
    type: 'appointments',
    title: 'Appointment Statistics - Q2 2023',
    generatedDate: '2023-07-01',
    period: 'April - June 2023',
    data: {
      totalAppointments: 342,
      completedAppointments: 310,
      cancelledAppointments: 22,
      noShowAppointments: 10,
      cancellationRate: 6.4,
      notes: 'No-show rate decreased by 2% compared to Q1.'
    }
  },
  {
    id: 'r3',
    type: 'patient',
    title: 'Patient Demographics - 2023',
    generatedDate: '2023-07-15',
    period: 'January - June 2023',
    data: {
      newPatients: 124,
      returningPatients: 287,
      averageVisits: 2.8,
      notes: 'Patient retention rate remains high at 82%.'
    }
  },
  {
    id: 'r4',
    type: 'doctor',
    title: 'Doctor Performance - June 2023',
    generatedDate: '2023-07-05',
    period: 'June 2023',
    data: {
      topDoctor: {
        name: 'Dr. Sarah Johnson',
        count: 48
      },
      topRatedDoctor: {
        name: 'Dr. Michael Chen',
        rating: 4.9
      },
      busiestDay: {
        day: 'Wednesday',
        count: 68
      },
      notes: 'Dr. Johnson continues to handle the highest patient load.'
    }
  }
];

export const mockPatientReports: PatientReport[] = [
  {
    id: 'pr1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2023-06-15',
    title: 'Blood Test Results',
    type: 'lab',
    content: 'Complete blood count results show normal ranges for all parameters. Hemoglobin levels are optimal at 14.2 g/dL.',
    attachments: ['/reports/blood-test-p1-061523.pdf'],
    doctorName: 'Dr. Sarah Johnson',
    isShared: true
  },
  {
    id: 'pr2',
    patientId: 'p1',
    doctorId: 'd2',
    date: '2023-05-20',
    title: 'Annual Checkup Summary',
    type: 'summary',
    content: 'Patient shows improvement in blood pressure management. Current medication appears effective. Recommended follow-up in 6 months.',
    doctorName: 'Dr. Michael Chen',
    isShared: true
  },
  {
    id: 'pr3',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2023-04-10',
    title: 'X-Ray Report',
    type: 'diagnostic',
    content: 'Chest X-ray shows clear lungs with no signs of infection or abnormalities. Heart size appears normal.',
    attachments: ['/reports/xray-p1-041023.pdf'],
    doctorName: 'Dr. Sarah Johnson',
    isShared: false
  },
];