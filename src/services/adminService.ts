// Mock admin service

export interface Disease {
  id: string;
  name: string;
  ayurvedicName: string;
  description: string;
  doshaInvolvement: string[];
  commonSymptoms: string[];
}

export interface Treatment {
  id: string;
  name: string;
  diseaseId: string;
  herbs: string[];
  therapies: string[];
  dietaryGuidelines: string;
  duration: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  age?: number;
  gender?: string;
  registeredAt: string;
  lastActive: string;
  consultationCount: number;
}

// Mock data
const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Vata Imbalance',
    ayurvedicName: 'Vata Vyadhi',
    description: 'Condition caused by aggravated Vata dosha leading to dryness, anxiety, and irregular digestion',
    doshaInvolvement: ['Vata'],
    commonSymptoms: ['Anxiety', 'Insomnia', 'Constipation', 'Joint Pain', 'Dry Skin'],
  },
  {
    id: '2',
    name: 'Pitta Imbalance',
    ayurvedicName: 'Pitta Vyadhi',
    description: 'Condition caused by aggravated Pitta dosha leading to inflammation, acidity, and irritability',
    doshaInvolvement: ['Pitta'],
    commonSymptoms: ['Acidity', 'Skin Rashes', 'Anger', 'Headache', 'Excessive Heat'],
  },
  {
    id: '3',
    name: 'Kapha Imbalance',
    ayurvedicName: 'Kapha Vyadhi',
    description: 'Condition caused by aggravated Kapha dosha leading to heaviness, congestion, and lethargy',
    doshaInvolvement: ['Kapha'],
    commonSymptoms: ['Fatigue', 'Weight Gain', 'Congestion', 'Slow Digestion', 'Depression'],
  },
  {
    id: '4',
    name: 'Amavata (Rheumatoid condition)',
    ayurvedicName: 'Amavata',
    description: 'Accumulation of toxins in joints causing pain and stiffness',
    doshaInvolvement: ['Vata', 'Kapha'],
    commonSymptoms: ['Joint Pain', 'Stiffness', 'Swelling', 'Fatigue'],
  },
];

const mockTreatments: Treatment[] = [
  {
    id: '1',
    name: 'Vata Pacifying Protocol',
    diseaseId: '1',
    herbs: ['Ashwagandha', 'Brahmi', 'Shatavari', 'Bala'],
    therapies: ['Abhyanga (Oil Massage)', 'Basti (Enema therapy)', 'Shirodhara'],
    dietaryGuidelines: 'Warm, moist, grounding foods. Favor sweet, sour, salty tastes.',
    duration: '4-8 weeks',
  },
  {
    id: '2',
    name: 'Pitta Cooling Protocol',
    diseaseId: '2',
    herbs: ['Amalaki', 'Shatavari', 'Neem', 'Guduchi'],
    therapies: ['Virechana (Purgation)', 'Cool oil massage', 'Sheetali Pranayama'],
    dietaryGuidelines: 'Cool, sweet, bitter foods. Avoid spicy, sour, fermented items.',
    duration: '3-6 weeks',
  },
  {
    id: '3',
    name: 'Kapha Reducing Protocol',
    diseaseId: '3',
    herbs: ['Triphala', 'Guggulu', 'Trikatu', 'Punarnava'],
    therapies: ['Udvartana (Dry massage)', 'Vamana (Emesis)', 'Nasya'],
    dietaryGuidelines: 'Light, warm, dry foods. Favor pungent, bitter, astringent tastes.',
    duration: '6-10 weeks',
  },
];

const mockUsers: UserRecord[] = [
  { id: '1', name: 'John Patient', email: 'patient@example.com', role: 'patient', age: 35, gender: 'male', registeredAt: '2024-01-15', lastActive: '2024-12-01', consultationCount: 5 },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'patient', age: 28, gender: 'female', registeredAt: '2024-03-20', lastActive: '2024-11-28', consultationCount: 3 },
  { id: '3', name: 'Dr. Sharma', email: 'doctor@example.com', role: 'doctor', registeredAt: '2024-01-01', lastActive: '2024-12-02', consultationCount: 0 },
  { id: '4', name: 'Mike Johnson', email: 'mike@example.com', role: 'patient', age: 45, gender: 'male', registeredAt: '2024-06-10', lastActive: '2024-11-15', consultationCount: 2 },
];

export const adminService = {
  // Disease management
  getDiseases: async (): Promise<Disease[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDiseases;
  },

  addDisease: async (disease: Omit<Disease, 'id'>): Promise<Disease> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newDisease = { ...disease, id: String(mockDiseases.length + 1) };
    mockDiseases.push(newDisease);
    return newDisease;
  },

  updateDisease: async (id: string, data: Partial<Disease>): Promise<Disease | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockDiseases.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDiseases[index] = { ...mockDiseases[index], ...data };
      return mockDiseases[index];
    }
    return null;
  },

  deleteDisease: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockDiseases.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDiseases.splice(index, 1);
      return true;
    }
    return false;
  },

  // Treatment management
  getTreatments: async (): Promise<Treatment[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTreatments;
  },

  addTreatment: async (treatment: Omit<Treatment, 'id'>): Promise<Treatment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTreatment = { ...treatment, id: String(mockTreatments.length + 1) };
    mockTreatments.push(newTreatment);
    return newTreatment;
  },

  updateTreatment: async (id: string, data: Partial<Treatment>): Promise<Treatment | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTreatments.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTreatments[index] = { ...mockTreatments[index], ...data };
      return mockTreatments[index];
    }
    return null;
  },

  // User management
  getUsers: async (): Promise<UserRecord[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  },

  getUserById: async (id: string): Promise<UserRecord | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(u => u.id === id) || null;
  },

  // Analytics
  getAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalUsers: mockUsers.length,
      totalPatients: mockUsers.filter(u => u.role === 'patient').length,
      totalDoctors: mockUsers.filter(u => u.role === 'doctor').length,
      totalConsultations: 15,
      todayConsultations: 3,
      weeklyConsultations: [2, 4, 3, 5, 4, 2, 3],
      monthlyConsultations: [45, 52, 48, 61, 55, 58, 62, 70, 65, 72, 68, 75],
      topSymptoms: [
        { name: 'Headache', count: 25 },
        { name: 'Fatigue', count: 20 },
        { name: 'Joint Pain', count: 18 },
        { name: 'Digestive Issues', count: 15 },
        { name: 'Anxiety', count: 12 },
      ],
      triageLevels: {
        normal: 10,
        needsDoctor: 4,
        urgent: 1,
      },
    };
  },
};
