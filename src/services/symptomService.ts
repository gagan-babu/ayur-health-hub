// Mock symptom service

export interface Symptom {
  id: string;
  name: string;
  category: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

const mockSymptoms: Symptom[] = [
  { id: '1', name: 'Headache', category: 'Neurological', description: 'Pain in the head or upper neck', severity: 'mild' },
  { id: '2', name: 'Fatigue', category: 'General', description: 'Persistent tiredness or weakness', severity: 'mild' },
  { id: '3', name: 'Joint Pain', category: 'Musculoskeletal', description: 'Pain or stiffness in joints', severity: 'moderate' },
  { id: '4', name: 'Digestive Issues', category: 'Gastrointestinal', description: 'Problems with digestion', severity: 'moderate' },
  { id: '5', name: 'Skin Rashes', category: 'Dermatological', description: 'Redness or irritation on skin', severity: 'mild' },
  { id: '6', name: 'Insomnia', category: 'Sleep', description: 'Difficulty falling or staying asleep', severity: 'moderate' },
  { id: '7', name: 'Anxiety', category: 'Mental', description: 'Feelings of worry or unease', severity: 'moderate' },
  { id: '8', name: 'Back Pain', category: 'Musculoskeletal', description: 'Pain in the lower or upper back', severity: 'moderate' },
  { id: '9', name: 'Respiratory Issues', category: 'Respiratory', description: 'Breathing difficulties or cough', severity: 'moderate' },
  { id: '10', name: 'Fever', category: 'General', description: 'Elevated body temperature', severity: 'moderate' },
  { id: '11', name: 'Nausea', category: 'Gastrointestinal', description: 'Feeling of sickness with urge to vomit', severity: 'mild' },
  { id: '12', name: 'Muscle Cramps', category: 'Musculoskeletal', description: 'Sudden involuntary muscle contractions', severity: 'mild' },
  { id: '13', name: 'Dizziness', category: 'Neurological', description: 'Feeling of being unbalanced or lightheaded', severity: 'moderate' },
  { id: '14', name: 'Loss of Appetite', category: 'General', description: 'Reduced desire to eat', severity: 'mild' },
  { id: '15', name: 'Constipation', category: 'Gastrointestinal', description: 'Difficulty passing stool', severity: 'mild' },
];

export const symptomService = {
  getSymptoms: async (): Promise<Symptom[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSymptoms;
  },

  getSymptomById: async (id: string): Promise<Symptom | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSymptoms.find(s => s.id === id) || null;
  },

  getSymptomsByCategory: async (category: string): Promise<Symptom[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSymptoms.filter(s => s.category === category);
  },

  getCategories: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...new Set(mockSymptoms.map(s => s.category))];
  },

  // Admin functions
  addSymptom: async (symptom: Omit<Symptom, 'id'>): Promise<Symptom> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newSymptom = { ...symptom, id: String(mockSymptoms.length + 1) };
    mockSymptoms.push(newSymptom);
    return newSymptom;
  },

  updateSymptom: async (id: string, data: Partial<Symptom>): Promise<Symptom | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockSymptoms.findIndex(s => s.id === id);
    if (index !== -1) {
      mockSymptoms[index] = { ...mockSymptoms[index], ...data };
      return mockSymptoms[index];
    }
    return null;
  },

  deleteSymptom: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockSymptoms.findIndex(s => s.id === id);
    if (index !== -1) {
      mockSymptoms.splice(index, 1);
      return true;
    }
    return false;
  },
};
