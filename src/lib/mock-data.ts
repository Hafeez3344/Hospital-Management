import {
  Department,
  Doctor,
  Patient,
  Appointment,
  IPDBed,
  PharmacyAlertItem,
  LabOrder,
  DashboardMetrics,
  User
} from './types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'System Admin',
    email: 'admin@hospital.com',
    role: 'ADMIN',
    department: 'Administration',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-doc1',
    name: 'Dr. Ahmed Khan',
    email: 'doctor@hospital.com',
    role: 'DOCTOR',
    department: 'General Medicine',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-front',
    name: 'Saima Reception',
    email: 'frontdesk@hospital.com',
    role: 'FRONT_DESK',
    department: 'Reception',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-nurse',
    name: 'Nurse Fatima',
    email: 'nurse@hospital.com',
    role: 'NURSE',
    department: 'Inpatient Nursing',
    avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-pharma',
    name: 'Bilal Pharmacist',
    email: 'pharmacist@hospital.com',
    role: 'PHARMACIST',
    department: 'Pharmacy',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-lab',
    name: 'Tariq Lab Tech',
    email: 'lab@hospital.com',
    role: 'LAB_STAFF',
    department: 'Pathology & Lab',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-accountant',
    name: 'Zainab Accountant',
    email: 'accountant@hospital.com',
    role: 'ACCOUNTANT',
    department: 'Billing & Finance',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-hr',
    name: 'Rashid HR Officer',
    email: 'hr@hospital.com',
    role: 'HR',
    department: 'Human Resources',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  }
];

export const DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'General Medicine', code: 'GM', description: 'Primary care, diagnosis and non-surgical treatments', headName: 'Dr. Ahmed Khan', doctorCount: 8, bedCount: 30 },
  { id: 'dept-2', name: 'Cardiology', code: 'CARD', description: 'Heart care, ECG, echo, and cardiac emergencies', headName: 'Dr. Sara Malik', doctorCount: 6, bedCount: 20 },
  { id: 'dept-3', name: 'Pediatrics', code: 'PED', description: 'Child healthcare, vaccinations, and infant care', headName: 'Dr. Usman Ali', doctorCount: 5, bedCount: 15 },
  { id: 'dept-4', name: 'Gynecology & Obstetrics', code: 'GYN', description: 'Womens healthcare, maternal care and delivery', headName: 'Dr. Ayesha Rahman', doctorCount: 7, bedCount: 25 },
  { id: 'dept-5', name: 'Orthopedics', code: 'ORTHO', description: 'Bone, joint, trauma and fracture care', headName: 'Dr. Hamza Shah', doctorCount: 6, bedCount: 20 },
  { id: 'dept-6', name: 'Emergency & ICU', code: 'EMG', description: '24/7 Critical care, trauma response and resuscitation', headName: 'Dr. Ahmed Khan', doctorCount: 10, bedCount: 18 },
  { id: 'dept-7', name: 'Laboratory & Pathology', code: 'LAB', description: 'Diagnostic blood tests, urine analysis, histology', headName: 'Dr. Tariq Mahmood', doctorCount: 4, bedCount: 0 },
  { id: 'dept-8', name: 'Pharmacy', code: 'PHARM', description: 'Inpatient & outpatient medicine dispensing', headName: 'Bilal Pharmacist', doctorCount: 3, bedCount: 0 },
  { id: 'dept-9', name: 'Radiology & Imaging', code: 'RAD', description: 'X-Ray, Ultrasound, CT Scan, and MRI diagnostics', headName: 'Dr. Nabeel Qureshi', doctorCount: 4, bedCount: 0 }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    staffId: 'STF-DOC-001',
    name: 'Dr. Ahmed Khan',
    specialization: 'Senior Consultant Physician',
    department: 'General Medicine',
    qualification: 'MBBS, FCPS (Internal Medicine)',
    roomNumber: 'OPD Room 101',
    consultationFee: 2500,
    phone: '+92 300 1234567',
    email: 'ahmed.khan@hospital.com',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Active'
  },
  {
    id: 'doc-2',
    staffId: 'STF-DOC-002',
    name: 'Dr. Sara Malik',
    specialization: 'Interventional Cardiologist',
    department: 'Cardiology',
    qualification: 'MBBS, MD (Cardiology), FACC',
    roomNumber: 'OPD Room 204',
    consultationFee: 3500,
    phone: '+92 301 9876543',
    email: 'sara.malik@hospital.com',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    status: 'Active'
  },
  {
    id: 'doc-3',
    staffId: 'STF-DOC-003',
    name: 'Dr. Usman Ali',
    specialization: 'Consultant Pediatrician',
    department: 'Pediatrics',
    qualification: 'MBBS, DCH, FCPS (Pediatrics)',
    roomNumber: 'OPD Room 108',
    consultationFee: 2000,
    phone: '+92 321 4567890',
    email: 'usman.ali@hospital.com',
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    status: 'Active'
  },
  {
    id: 'doc-4',
    staffId: 'STF-DOC-004',
    name: 'Dr. Ayesha Rahman',
    specialization: 'Gynecologist & Obstetrician',
    department: 'Gynecology & Obstetrics',
    qualification: 'MBBS, MRCOG, FCPS',
    roomNumber: 'OPD Room 302',
    consultationFee: 3000,
    phone: '+92 333 7654321',
    email: 'ayesha.rahman@hospital.com',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    status: 'Active'
  },
  {
    id: 'doc-5',
    staffId: 'STF-DOC-005',
    name: 'Dr. Hamza Shah',
    specialization: 'Orthopedic & Joint Surgeon',
    department: 'Orthopedics',
    qualification: 'MBBS, MS (Ortho), FRCS',
    roomNumber: 'OPD Room 112',
    consultationFee: 3000,
    phone: '+92 345 8889900',
    email: 'hamza.shah@hospital.com',
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri'],
    status: 'Active'
  }
];

// Helper generator for 50 realistic demo patients
const sampleFirstNames = [
  'Muhammad', 'Ali', 'Fatima', 'Zainab', 'Omar', 'Ayesha', 'Bilal', 'Hassan', 'Sana', 'Hamza',
  'Mariam', 'Usman', 'Sadia', 'Ibrahim', 'Hira', 'Tariq', 'Nadia', 'Asad', 'Rabia', 'Farhan',
  'Mehwish', 'Kamran', 'Sidra', 'Shahid', 'Anum', 'Waqas', 'Samina', 'Noman', 'Khadija', 'Imran',
  'Bushra', 'Rehan', 'Fouzia', 'Yousuf', 'Amina', 'Faisal', 'Shazia', 'Adnan', 'Rimsha', 'Danish',
  'Tehreem', 'Shoaib', 'Sumaira', 'Junaid', 'Amna', 'Kashif', 'Zoya', 'Nabeel', 'Hafsa', 'Mustafa'
];

const sampleLastNames = [
  'Ahmed', 'Khan', 'Malik', 'Chaudhry', 'Shah', 'Sheikh', 'Bhatti', 'Raza', 'Farooq', 'Qureshi',
  'Mirza', 'Siddiqui', 'Hashmi', 'Gill', 'Akram', 'Abbas', 'Iqbal', 'Hussain', 'Zafar', 'Aziz'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const statuses: ('Active' | 'OPD' | 'IPD' | 'Discharged')[] = ['Active', 'OPD', 'IPD', 'Discharged', 'OPD', 'Active'];
const doctorNames = ['Dr. Ahmed Khan', 'Dr. Sara Malik', 'Dr. Usman Ali', 'Dr. Ayesha Rahman', 'Dr. Hamza Shah'];

export const PATIENTS: Patient[] = Array.from({ length: 50 }).map((_, idx) => {
  const fName = sampleFirstNames[idx % sampleFirstNames.length];
  const lName = sampleLastNames[(idx * 3) % sampleLastNames.length];
  const age = 18 + ((idx * 7) % 65);
  const gender: 'Male' | 'Female' = (idx % 2 === 0) ? 'Male' : 'Female';
  const mrn = `MRN-2026-${String(idx + 1).padStart(4, '0')}`;
  const blood = bloodGroups[idx % bloodGroups.length];
  const status = idx < 8 ? 'IPD' : (idx < 25 ? 'OPD' : (idx % 4 === 0 ? 'Discharged' : 'Active'));
  const assignedDoc = doctorNames[idx % doctorNames.length];
  const year = 2026;
  const month = '08';
  const day = String((idx % 10) + 1).padStart(2, '0');

  return {
    id: `pat-${idx + 1}`,
    mrn,
    name: `${fName} ${lName}`,
    age,
    gender,
    dob: `${1960 + (65 - age)}-0${(idx % 9) + 1}-15`,
    bloodGroup: blood,
    phone: `+92 3${(idx % 4) + 0}${idx % 9}${String(idx * 12345).padStart(6, '0').slice(0, 6)}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${idx + 1}@example.com`,
    address: `House #${idx + 12}, Block ${(idx % 5) + 1}, Model Town, City`,
    status,
    lastVisitDate: `${year}-${month}-${day}`,
    assignedDoctor: assignedDoc,
    emergencyContact: {
      name: `${lName} Kin`,
      relation: gender === 'Male' ? 'Wife' : 'Husband',
      phone: `+92 300 999${String(idx + 100).padStart(4, '0')}`
    }
  };
});

export const APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    appointmentNo: 'APT-2026-001',
    patientId: 'pat-1',
    patientName: PATIENTS[0].name,
    patientMrn: PATIENTS[0].mrn,
    doctorId: 'doc-1',
    doctorName: 'Dr. Ahmed Khan',
    department: 'General Medicine',
    appointmentDate: '2026-08-11',
    timeSlot: '09:00 AM',
    type: 'OPD',
    status: 'In-Consultation',
    reason: 'High grade fever and persistent chest cough for 3 days'
  },
  {
    id: 'apt-2',
    appointmentNo: 'APT-2026-002',
    patientId: 'pat-2',
    patientName: PATIENTS[1].name,
    patientMrn: PATIENTS[1].mrn,
    doctorId: 'doc-2',
    doctorName: 'Dr. Sara Malik',
    department: 'Cardiology',
    appointmentDate: '2026-08-11',
    timeSlot: '09:30 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    reason: 'Post-angioplasty routine checkup and BP review'
  },
  {
    id: 'apt-3',
    appointmentNo: 'APT-2026-003',
    patientId: 'pat-3',
    patientName: PATIENTS[2].name,
    patientMrn: PATIENTS[2].mrn,
    doctorId: 'doc-3',
    doctorName: 'Dr. Usman Ali',
    department: 'Pediatrics',
    appointmentDate: '2026-08-11',
    timeSlot: '10:00 AM',
    type: 'Routine',
    status: 'Confirmed',
    reason: '6-month growth monitoring & routine pediatric vaccination'
  },
  {
    id: 'apt-4',
    appointmentNo: 'APT-2026-004',
    patientId: 'pat-4',
    patientName: PATIENTS[3].name,
    patientMrn: PATIENTS[3].mrn,
    doctorId: 'doc-4',
    doctorName: 'Dr. Ayesha Rahman',
    department: 'Gynecology & Obstetrics',
    appointmentDate: '2026-08-11',
    timeSlot: '10:30 AM',
    type: 'OPD',
    status: 'Scheduled',
    reason: 'Antenatal ultrasound scan and routine trimester evaluation'
  },
  {
    id: 'apt-5',
    appointmentNo: 'APT-2026-005',
    patientId: 'pat-5',
    patientName: PATIENTS[4].name,
    patientMrn: PATIENTS[4].mrn,
    doctorId: 'doc-5',
    doctorName: 'Dr. Hamza Shah',
    department: 'Orthopedics',
    appointmentDate: '2026-08-11',
    timeSlot: '11:00 AM',
    type: 'Emergency',
    status: 'Confirmed',
    reason: 'Acute knee injury during sports activity with joint swelling'
  },
  {
    id: 'apt-6',
    appointmentNo: 'APT-2026-006',
    patientId: 'pat-6',
    patientName: PATIENTS[5].name,
    patientMrn: PATIENTS[5].mrn,
    doctorId: 'doc-1',
    doctorName: 'Dr. Ahmed Khan',
    department: 'General Medicine',
    appointmentDate: '2026-08-11',
    timeSlot: '11:30 AM',
    type: 'OPD',
    status: 'Scheduled',
    reason: 'Diabetes Type 2 fasting blood sugar evaluation and medication adjustment'
  },
  {
    id: 'apt-7',
    appointmentNo: 'APT-2026-007',
    patientId: 'pat-7',
    patientName: PATIENTS[6].name,
    patientMrn: PATIENTS[6].mrn,
    doctorId: 'doc-2',
    doctorName: 'Dr. Sara Malik',
    department: 'Cardiology',
    appointmentDate: '2026-08-11',
    timeSlot: '12:00 PM',
    type: 'OPD',
    status: 'Completed',
    reason: 'Shortness of breath on mild exertion & ECG review'
  },
  {
    id: 'apt-8',
    appointmentNo: 'APT-2026-008',
    patientId: 'pat-8',
    patientName: PATIENTS[7].name,
    patientMrn: PATIENTS[7].mrn,
    doctorId: 'doc-3',
    doctorName: 'Dr. Usman Ali',
    department: 'Pediatrics',
    appointmentDate: '2026-08-11',
    timeSlot: '12:30 PM',
    type: 'OPD',
    status: 'Scheduled',
    reason: 'Viral upper respiratory tract infection and ear pain'
  }
];

export const IPD_BEDS: IPDBed[] = [
  { id: 'bed-101', bedNumber: 'B-101', wardName: 'Male General Ward A', wardType: 'General', isOccupied: true, patientName: PATIENTS[0].name, patientMrn: PATIENTS[0].mrn, doctorName: 'Dr. Ahmed Khan', admissionDate: '2026-08-08', dailyCharge: 2500 },
  { id: 'bed-102', bedNumber: 'B-102', wardName: 'Male General Ward A', wardType: 'General', isOccupied: true, patientName: PATIENTS[1].name, patientMrn: PATIENTS[1].mrn, doctorName: 'Dr. Sara Malik', admissionDate: '2026-08-09', dailyCharge: 2500 },
  { id: 'bed-103', bedNumber: 'B-103', wardName: 'Male General Ward A', wardType: 'General', isOccupied: false, dailyCharge: 2500 },
  { id: 'bed-104', bedNumber: 'B-104', wardName: 'Male General Ward A', wardType: 'General', isOccupied: false, dailyCharge: 2500 },
  { id: 'bed-201', bedNumber: 'B-201', wardName: 'Female Ward B', wardType: 'General', isOccupied: true, patientName: PATIENTS[2].name, patientMrn: PATIENTS[2].mrn, doctorName: 'Dr. Ayesha Rahman', admissionDate: '2026-08-10', dailyCharge: 2500 },
  { id: 'bed-202', bedNumber: 'B-202', wardName: 'Female Ward B', wardType: 'General', isOccupied: false, dailyCharge: 2500 },
  { id: 'bed-301', bedNumber: 'ICU-01', wardName: 'Intensive Care Unit (ICU)', wardType: 'ICU', isOccupied: true, patientName: PATIENTS[3].name, patientMrn: PATIENTS[3].mrn, doctorName: 'Dr. Ahmed Khan', admissionDate: '2026-08-07', dailyCharge: 15000 },
  { id: 'bed-302', bedNumber: 'ICU-02', wardName: 'Intensive Care Unit (ICU)', wardType: 'ICU', isOccupied: false, dailyCharge: 15000 },
  { id: 'bed-401', bedNumber: 'PVT-301', wardName: 'Executive Private Suite 3rd Fl', wardType: 'Private', isOccupied: true, patientName: PATIENTS[4].name, patientMrn: PATIENTS[4].mrn, doctorName: 'Dr. Hamza Shah', admissionDate: '2026-08-06', dailyCharge: 8000 },
  { id: 'bed-402', bedNumber: 'PVT-302', wardName: 'Executive Private Suite 3rd Fl', wardType: 'Private', isOccupied: false, dailyCharge: 8000 }
];

export const PHARMACY_ALERTS: PharmacyAlertItem[] = [
  { id: 'ph-1', itemCode: 'MED-PAN-500', name: 'Panadol Extra 500mg', category: 'Analgesic / Antipyretic', stockQuantity: 24, minStockLevel: 100, unitPrice: 15, expiryDate: '2026-11-30', batchNo: 'B-88912', alertType: 'Low Stock' },
  { id: 'ph-2', itemCode: 'MED-AUG-625', name: 'Augmentin 625mg Tablets', category: 'Antibiotic', stockQuantity: 18, minStockLevel: 50, unitPrice: 180, expiryDate: '2026-08-25', batchNo: 'B-77410', alertType: 'Expiring Soon' },
  { id: 'ph-3', itemCode: 'MED-INSU-L', name: 'Lantus Insulin Solostar Pen', category: 'Endocrine / Diabetes', stockQuantity: 5, minStockLevel: 25, unitPrice: 2400, expiryDate: '2026-09-10', batchNo: 'B-99102', alertType: 'Low Stock' },
  { id: 'ph-4', itemCode: 'MED-OMEP-20', name: 'Risek (Omeprazole) 20mg', category: 'Gastroenterology', stockQuantity: 42, minStockLevel: 150, unitPrice: 35, expiryDate: '2026-08-18', batchNo: 'B-66321', alertType: 'Expiring Soon' },
  { id: 'ph-5', itemCode: 'MED-IV-NS', name: 'Normal Saline 0.9% 1000ml IV', category: 'IV Fluids', stockQuantity: 12, minStockLevel: 80, unitPrice: 120, expiryDate: '2027-02-15', batchNo: 'B-55419', alertType: 'Low Stock' }
];

export const LAB_ORDERS: LabOrder[] = [
  { id: 'lab-1', orderNo: 'LAB-2026-089', patientName: PATIENTS[0].name, patientMrn: PATIENTS[0].mrn, doctorName: 'Dr. Ahmed Khan', testName: 'Complete Blood Count (CBC) with ESR', category: 'Hematology', orderDate: '2026-08-11 09:15 AM', status: 'Processing' },
  { id: 'lab-2', orderNo: 'LAB-2026-090', patientName: PATIENTS[1].name, patientMrn: PATIENTS[1].mrn, doctorName: 'Dr. Sara Malik', testName: 'Lipid Profile & Serum Electrolytes', category: 'Biochemistry', orderDate: '2026-08-11 09:45 AM', status: 'Sample Collected' },
  { id: 'lab-3', orderNo: 'LAB-2026-091', patientName: PATIENTS[3].name, patientMrn: PATIENTS[3].mrn, doctorName: 'Dr. Ayesha Rahman', testName: 'HbA1c & Fasting Blood Glucose', category: 'Endocrinology', orderDate: '2026-08-11 10:15 AM', status: 'Pending' },
  { id: 'lab-4', orderNo: 'LAB-2026-092', patientName: PATIENTS[4].name, patientMrn: PATIENTS[4].mrn, doctorName: 'Dr. Hamza Shah', testName: 'Knee Joint X-Ray (AP & Lateral View)', category: 'Radiology', orderDate: '2026-08-11 11:00 AM', status: 'Completed' }
];

export const DASHBOARD_METRICS: DashboardMetrics = {
  totalPatients: 1482,
  todaysAppointments: 38,
  todaysOPDVisits: 64,
  currentIPDPatients: 29,
  availableBeds: 16,
  totalBeds: 45,
  pharmacySalesToday: 142800,
  pendingLabTests: 14,
  todaysRevenue: 385500
};

// Data for Recharts graphs
export const PATIENT_VISITS_DATA = [
  { date: 'Aug 05', opd: 45, ipd: 8, emergency: 12 },
  { date: 'Aug 06', opd: 52, ipd: 11, emergency: 15 },
  { date: 'Aug 07', opd: 58, ipd: 9, emergency: 10 },
  { date: 'Aug 08', opd: 64, ipd: 14, emergency: 18 },
  { date: 'Aug 09', opd: 70, ipd: 12, emergency: 14 },
  { date: 'Aug 10', opd: 48, ipd: 6, emergency: 9 },
  { date: 'Aug 11', opd: 64, ipd: 15, emergency: 16 }
];

export const OPD_VS_IPD_DATA = [
  { name: 'OPD Consultations', value: 64, color: '#0D9488' },
  { name: 'IPD Admissions', value: 29, color: '#0284C7' },
  { name: 'Emergency Care', value: 16, color: '#F59E0B' }
];

export const REVENUE_TREND_DATA = [
  { day: 'Mon', OPD: 120000, IPD: 180000, Pharmacy: 65000, Lab: 45000 },
  { day: 'Tue', OPD: 140000, IPD: 195000, Pharmacy: 72000, Lab: 52000 },
  { day: 'Wed', OPD: 135000, IPD: 210000, Pharmacy: 80000, Lab: 48000 },
  { day: 'Thu', OPD: 150000, IPD: 175000, Pharmacy: 68000, Lab: 55000 },
  { day: 'Fri', OPD: 160000, IPD: 230000, Pharmacy: 90000, Lab: 60000 },
  { day: 'Sat', OPD: 110000, IPD: 150000, Pharmacy: 55000, Lab: 38000 },
  { day: 'Sun', OPD: 75000, IPD: 140000, Pharmacy: 42000, Lab: 28000 }
];

export const DEPARTMENT_ACTIVITY_DATA = [
  { department: 'Gen. Medicine', consultations: 142, admissions: 18 },
  { department: 'Cardiology', consultations: 98, admissions: 14 },
  { department: 'Pediatrics', consultations: 110, admissions: 8 },
  { department: 'Gynecology', consultations: 85, admissions: 12 },
  { department: 'Orthopedics', consultations: 76, admissions: 10 },
  { department: 'Emergency', consultations: 65, admissions: 22 }
];
