export type UserRole = 
  | 'ADMIN'
  | 'FRONT_DESK'
  | 'DOCTOR'
  | 'NURSE'
  | 'PHARMACIST'
  | 'LAB_STAFF'
  | 'ACCOUNTANT'
  | 'HR';

export type Gender = 'Male' | 'Female' | 'Other';

export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'In-Consultation' | 'Completed' | 'Cancelled';

export type PatientStatus = 'Active' | 'OPD' | 'IPD' | 'Discharged';

export type StaffStatus = 'Active' | 'On Leave' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headName: string;
  doctorCount: number;
  bedCount: number;
}

export interface Doctor {
  id: string;
  staffId: string;
  name: string;
  specialization: string;
  department: string;
  qualification: string;
  roomNumber: string;
  consultationFee: number;
  phone: string;
  email: string;
  availableDays: string[];
  status: StaffStatus;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: Gender;
  dob: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  status: PatientStatus;
  lastVisitDate: string;
  assignedDoctor: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  appointmentNo: string;
  patientId: string;
  patientName: string;
  patientMrn: string;
  doctorId: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  timeSlot: string;
  type: 'OPD' | 'Follow-up' | 'Emergency' | 'Routine';
  status: AppointmentStatus;
  reason: string;
}

export interface IPDBed {
  id: string;
  bedNumber: string;
  wardName: string;
  wardType: 'General' | 'Semi-Private' | 'Private' | 'ICU' | 'CCU';
  isOccupied: boolean;
  patientName?: string;
  patientMrn?: string;
  doctorName?: string;
  admissionDate?: string;
  dailyCharge: number;
}

export interface PharmacyAlertItem {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  stockQuantity: number;
  minStockLevel: number;
  unitPrice: number;
  expiryDate: string;
  batchNo: string;
  alertType: 'Low Stock' | 'Expiring Soon' | 'Expired';
}

export interface LabOrder {
  id: string;
  orderNo: string;
  patientName: string;
  patientMrn: string;
  doctorName: string;
  testName: string;
  category: string;
  orderDate: string;
  status: 'Pending' | 'Sample Collected' | 'Processing' | 'Completed';
}

export interface DashboardMetrics {
  totalPatients: number;
  todaysAppointments: number;
  todaysOPDVisits: number;
  currentIPDPatients: number;
  availableBeds: number;
  totalBeds: number;
  pharmacySalesToday: number;
  pendingLabTests: number;
  todaysRevenue: number;
}
