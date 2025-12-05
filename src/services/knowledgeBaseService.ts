// Mock knowledge base service for Ayurvedic information

export interface Herb {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  uses: string[];
  doshaEffect: string;
  imageUrl?: string;
}

export interface AyurvedicRemedy {
  id: string;
  name: string;
  condition: string;
  ingredients: string[];
  preparation: string;
  dosage: string;
  benefits: string;
}

const mockHerbs: Herb[] = [
  {
    id: '1',
    name: 'Ashwagandha',
    sanskritName: 'Withania somnifera',
    description: 'Known as Indian Ginseng, Ashwagandha is an adaptogenic herb that helps the body manage stress.',
    benefits: ['Reduces stress and anxiety', 'Improves sleep quality', 'Boosts immunity', 'Enhances strength'],
    uses: ['Stress management', 'Sleep disorders', 'General weakness', 'Cognitive enhancement'],
    doshaEffect: 'Balances Vata and Kapha',
  },
  {
    id: '2',
    name: 'Brahmi',
    sanskritName: 'Bacopa monnieri',
    description: 'A renowned brain tonic in Ayurveda, Brahmi enhances memory and cognitive function.',
    benefits: ['Improves memory', 'Reduces anxiety', 'Enhances concentration', 'Neuroprotective'],
    uses: ['Memory enhancement', 'ADHD', 'Anxiety', 'Cognitive decline'],
    doshaEffect: 'Balances all three doshas',
  },
  {
    id: '3',
    name: 'Triphala',
    sanskritName: 'Three Fruits',
    description: 'A combination of three fruits (Amalaki, Bibhitaki, Haritaki), Triphala is a powerful digestive and detoxifying formula.',
    benefits: ['Digestive support', 'Detoxification', 'Antioxidant', 'Weight management'],
    uses: ['Constipation', 'Digestive issues', 'Detox programs', 'Eye health'],
    doshaEffect: 'Balances all three doshas',
  },
  {
    id: '4',
    name: 'Turmeric',
    sanskritName: 'Curcuma longa',
    description: 'The golden spice of India, known for its powerful anti-inflammatory and antioxidant properties.',
    benefits: ['Anti-inflammatory', 'Antioxidant', 'Digestive aid', 'Immune booster'],
    uses: ['Joint pain', 'Skin conditions', 'Digestive disorders', 'Immunity'],
    doshaEffect: 'Balances all doshas, reduces Kapha',
  },
  {
    id: '5',
    name: 'Tulsi',
    sanskritName: 'Ocimum sanctum',
    description: 'Holy Basil, revered in India as the "Queen of Herbs" for its healing properties.',
    benefits: ['Respiratory support', 'Stress relief', 'Immune support', 'Antioxidant'],
    uses: ['Colds and flu', 'Respiratory issues', 'Stress', 'Skin health'],
    doshaEffect: 'Balances Vata and Kapha',
  },
  {
    id: '6',
    name: 'Neem',
    sanskritName: 'Azadirachta indica',
    description: 'Known as the "Village Pharmacy", Neem has powerful purifying and healing properties.',
    benefits: ['Blood purifier', 'Skin health', 'Antimicrobial', 'Dental health'],
    uses: ['Skin disorders', 'Blood purification', 'Infections', 'Diabetes support'],
    doshaEffect: 'Reduces Pitta and Kapha',
  },
  {
    id: '7',
    name: 'Shatavari',
    sanskritName: 'Asparagus racemosus',
    description: 'The "Queen of Herbs" for women\'s health, nourishing and rejuvenating.',
    benefits: ['Hormonal balance', 'Digestive support', 'Immune boost', 'Rejuvenating'],
    uses: ['Women\'s health', 'Digestive issues', 'Immunity', 'Reproductive health'],
    doshaEffect: 'Balances Vata and Pitta',
  },
  {
    id: '8',
    name: 'Guggulu',
    sanskritName: 'Commiphora mukul',
    description: 'A powerful resin used for purification, weight management, and joint health.',
    benefits: ['Joint support', 'Weight management', 'Cholesterol support', 'Detoxification'],
    uses: ['Arthritis', 'Weight loss', 'High cholesterol', 'Skin conditions'],
    doshaEffect: 'Reduces Vata and Kapha',
  },
];

const mockRemedies: AyurvedicRemedy[] = [
  {
    id: '1',
    name: 'Golden Milk',
    condition: 'Inflammation and Sleep',
    ingredients: ['Turmeric', 'Milk', 'Black pepper', 'Honey', 'Ghee'],
    preparation: 'Heat milk with turmeric and black pepper. Add ghee and honey when warm.',
    dosage: 'One cup before bedtime',
    benefits: 'Reduces inflammation, promotes restful sleep, boosts immunity',
  },
  {
    id: '2',
    name: 'Triphala Churna',
    condition: 'Digestive Issues',
    ingredients: ['Amalaki', 'Bibhitaki', 'Haritaki'],
    preparation: 'Mix equal parts of three dried fruit powders',
    dosage: '1 teaspoon with warm water before bed',
    benefits: 'Cleanses digestive tract, promotes regular elimination, detoxifies',
  },
  {
    id: '3',
    name: 'Ashwagandha Milk',
    condition: 'Stress and Anxiety',
    ingredients: ['Ashwagandha powder', 'Milk', 'Honey', 'Cardamom'],
    preparation: 'Simmer ashwagandha in milk for 10 minutes, strain, add honey and cardamom',
    dosage: 'One cup in the evening',
    benefits: 'Reduces stress, improves sleep, builds strength',
  },
  {
    id: '4',
    name: 'Ginger-Lemon Tea',
    condition: 'Cold and Congestion',
    ingredients: ['Fresh ginger', 'Lemon', 'Honey', 'Hot water'],
    preparation: 'Steep grated ginger in hot water, add lemon juice and honey',
    dosage: '2-3 cups daily when sick',
    benefits: 'Clears congestion, boosts immunity, soothes throat',
  },
];

export const knowledgeBaseService = {
  getHerbs: async (): Promise<Herb[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockHerbs;
  },

  getHerbById: async (id: string): Promise<Herb | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockHerbs.find(h => h.id === id) || null;
  },

  searchHerbs: async (query: string): Promise<Herb[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return mockHerbs.filter(
      h =>
        h.name.toLowerCase().includes(lowerQuery) ||
        h.sanskritName.toLowerCase().includes(lowerQuery) ||
        h.benefits.some(b => b.toLowerCase().includes(lowerQuery)) ||
        h.uses.some(u => u.toLowerCase().includes(lowerQuery))
    );
  },

  getRemedies: async (): Promise<AyurvedicRemedy[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRemedies;
  },

  getRemedyById: async (id: string): Promise<AyurvedicRemedy | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRemedies.find(r => r.id === id) || null;
  },

  searchRemedies: async (query: string): Promise<AyurvedicRemedy[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return mockRemedies.filter(
      r =>
        r.name.toLowerCase().includes(lowerQuery) ||
        r.condition.toLowerCase().includes(lowerQuery) ||
        r.ingredients.some(i => i.toLowerCase().includes(lowerQuery))
    );
  },

  searchAll: async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const herbs = await knowledgeBaseService.searchHerbs(query);
    const remedies = await knowledgeBaseService.searchRemedies(query);
    return { herbs, remedies };
  },
};
