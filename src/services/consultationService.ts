// Mock consultation service

export interface ConsultationInput {
  userId: string;
  symptoms: string[];
  mentalCondition: {
    stressLevel: number;
    sleepQuality: number;
    mood: string;
  };
  healthInfo: {
    weight: string;
    lifestyle: string;
    dietaryHabits: string;
  };
  diseaseHistory: string;
  oldTreatments: string;
}

export interface AIRecommendation {
  herbs: { name: string; dosage: string; benefits: string }[];
  foods: { consume: string[]; avoid: string[] };
  lifestyle: string[];
  yogaPractices: string[];
}

export interface Consultation {
  id: string;
  userId: string;
  date: string;
  symptoms: string[];
  mentalCondition: ConsultationInput['mentalCondition'];
  healthInfo: ConsultationInput['healthInfo'];
  diseaseHistory: string;
  oldTreatments: string;
  predictedDisease: { name: string; confidence: number }[];
  recommendations: AIRecommendation;
  triageLevel: 'Normal' | 'Needs Doctor Consultation' | 'Urgent';
  status: 'pending' | 'completed' | 'reviewed';
  doctorNotes?: string;
}

// Mock consultations database
const mockConsultations: Consultation[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-12-01T10:00:00Z',
    symptoms: ['Headache', 'Fatigue', 'Insomnia'],
    mentalCondition: { stressLevel: 7, sleepQuality: 4, mood: 'anxious' },
    healthInfo: { weight: '70kg', lifestyle: 'sedentary', dietaryHabits: 'irregular meals' },
    diseaseHistory: 'None significant',
    oldTreatments: 'Paracetamol for headaches',
    predictedDisease: [
      { name: 'Vata Imbalance', confidence: 85 },
      { name: 'Stress-related disorder', confidence: 72 },
    ],
    recommendations: {
      herbs: [
        { name: 'Ashwagandha', dosage: '500mg twice daily', benefits: 'Reduces stress and improves sleep' },
        { name: 'Brahmi', dosage: '300mg daily', benefits: 'Enhances mental clarity' },
      ],
      foods: {
        consume: ['Warm soups', 'Ghee', 'Sesame oil', 'Sweet fruits', 'Cooked vegetables'],
        avoid: ['Cold drinks', 'Raw foods', 'Caffeine', 'Processed foods'],
      },
      lifestyle: [
        'Maintain regular sleep schedule',
        'Practice oil massage (Abhyanga)',
        'Take warm baths before bed',
      ],
      yogaPractices: ['Shavasana', 'Pranayama', 'Gentle stretching'],
    },
    triageLevel: 'Normal',
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    date: '2024-11-15T14:30:00Z',
    symptoms: ['Joint Pain', 'Digestive Issues'],
    mentalCondition: { stressLevel: 5, sleepQuality: 6, mood: 'neutral' },
    healthInfo: { weight: '72kg', lifestyle: 'moderately active', dietaryHabits: 'regular meals' },
    diseaseHistory: 'Mild arthritis',
    oldTreatments: 'Turmeric supplements',
    predictedDisease: [
      { name: 'Ama accumulation', confidence: 78 },
      { name: 'Pitta-Vata imbalance', confidence: 65 },
    ],
    recommendations: {
      herbs: [
        { name: 'Triphala', dosage: '1 tsp before bed', benefits: 'Cleanses digestive system' },
        { name: 'Guggulu', dosage: '250mg twice daily', benefits: 'Supports joint health' },
      ],
      foods: {
        consume: ['Ginger tea', 'Leafy greens', 'Turmeric milk', 'Light grains'],
        avoid: ['Heavy foods', 'Fried items', 'Dairy excess', 'Red meat'],
      },
      lifestyle: [
        'Light fasting once a week',
        'Warm compress on joints',
        'Regular walks after meals',
      ],
      yogaPractices: ['Pawanmuktasana', 'Trikonasana', 'Cat-cow stretch'],
    },
    triageLevel: 'Normal',
    status: 'completed',
  },
];

export const consultationService = {
  createConsultation: async (input: ConsultationInput): Promise<Consultation> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI prediction based on symptoms
    const predictedDisease = generateMockPrediction(input.symptoms);
    const recommendations = generateMockRecommendations(input.symptoms);
    const triageLevel = determineTriage(input.symptoms, input.mentalCondition.stressLevel);
    
    const newConsultation: Consultation = {
      id: String(mockConsultations.length + 1),
      userId: input.userId,
      date: new Date().toISOString(),
      symptoms: input.symptoms,
      mentalCondition: input.mentalCondition,
      healthInfo: input.healthInfo,
      diseaseHistory: input.diseaseHistory,
      oldTreatments: input.oldTreatments,
      predictedDisease,
      recommendations,
      triageLevel,
      status: 'completed',
    };
    
    mockConsultations.unshift(newConsultation);
    return newConsultation;
  },

  getConsultations: async (userId?: string): Promise<Consultation[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (userId) {
      return mockConsultations.filter(c => c.userId === userId);
    }
    return mockConsultations;
  },

  getConsultationById: async (id: string): Promise<Consultation | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockConsultations.find(c => c.id === id) || null;
  },

  updateConsultation: async (id: string, data: Partial<Consultation>): Promise<Consultation | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockConsultations.findIndex(c => c.id === id);
    if (index !== -1) {
      mockConsultations[index] = { ...mockConsultations[index], ...data };
      return mockConsultations[index];
    }
    return null;
  },

  getRecentConsultations: async (limit: number = 5): Promise<Consultation[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockConsultations.slice(0, limit);
  },

  getConsultationStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      total: mockConsultations.length,
      pending: mockConsultations.filter(c => c.status === 'pending').length,
      completed: mockConsultations.filter(c => c.status === 'completed').length,
      needsReview: mockConsultations.filter(c => c.triageLevel !== 'Normal').length,
    };
  },
};

// Helper functions for mock AI predictions
function generateMockPrediction(symptoms: string[]): { name: string; confidence: number }[] {
  const diseaseMap: Record<string, { name: string; baseConfidence: number }[]> = {
    'Headache': [{ name: 'Vata Imbalance', baseConfidence: 75 }, { name: 'Pitta aggravation', baseConfidence: 60 }],
    'Fatigue': [{ name: 'Kapha imbalance', baseConfidence: 70 }, { name: 'Ama accumulation', baseConfidence: 65 }],
    'Joint Pain': [{ name: 'Vata-Kapha disorder', baseConfidence: 80 }, { name: 'Amavata', baseConfidence: 72 }],
    'Digestive Issues': [{ name: 'Agni dysfunction', baseConfidence: 78 }, { name: 'Pitta imbalance', baseConfidence: 68 }],
    'Insomnia': [{ name: 'Vata disorder', baseConfidence: 82 }, { name: 'Stress-related condition', baseConfidence: 75 }],
    'Anxiety': [{ name: 'Vata-Pitta imbalance', baseConfidence: 85 }, { name: 'Manas Roga', baseConfidence: 70 }],
  };

  const predictions: { name: string; confidence: number }[] = [];
  symptoms.forEach(symptom => {
    const matches = diseaseMap[symptom] || [{ name: 'General Dosha imbalance', baseConfidence: 55 }];
    matches.forEach(match => {
      const existing = predictions.find(p => p.name === match.name);
      if (existing) {
        existing.confidence = Math.min(95, existing.confidence + 5);
      } else {
        predictions.push({ name: match.name, confidence: match.baseConfidence + Math.random() * 10 });
      }
    });
  });

  return predictions.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}

function generateMockRecommendations(symptoms: string[]): AIRecommendation {
  return {
    herbs: [
      { name: 'Ashwagandha', dosage: '500mg twice daily', benefits: 'Adaptogenic, reduces stress' },
      { name: 'Triphala', dosage: '1 tsp before bed', benefits: 'Digestive support, detoxification' },
      { name: 'Turmeric', dosage: '500mg with meals', benefits: 'Anti-inflammatory, immune support' },
    ],
    foods: {
      consume: ['Fresh fruits', 'Warm soups', 'Whole grains', 'Green vegetables', 'Herbal teas'],
      avoid: ['Processed foods', 'Excessive caffeine', 'Cold drinks', 'Heavy fried foods'],
    },
    lifestyle: [
      'Follow a regular daily routine (Dinacharya)',
      'Practice meditation for 15-20 minutes daily',
      'Get adequate sleep (7-8 hours)',
      'Stay hydrated with warm water',
    ],
    yogaPractices: [
      'Surya Namaskar (Sun Salutation)',
      'Pranayama breathing exercises',
      'Shavasana for relaxation',
    ],
  };
}

function determineTriage(symptoms: string[], stressLevel: number): Consultation['triageLevel'] {
  const severeSymptoms = ['Chest Pain', 'Severe Headache', 'High Fever'];
  const hasSevere = symptoms.some(s => severeSymptoms.includes(s));
  
  if (hasSevere || stressLevel >= 9) return 'Urgent';
  if (symptoms.length >= 4 || stressLevel >= 7) return 'Needs Doctor Consultation';
  return 'Normal';
}
