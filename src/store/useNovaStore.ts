import { create } from 'zustand';

export type LeadStatus = 'high-priority' | 'qualified' | 'low-intent';

export interface LeadData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  intentCategory: string;
}

export interface ConversationStep {
  id: string;
  type: 'video' | 'question' | 'input' | 'completion';
  videoUrl?: string;
  subtitle?: string;
  question?: string;
  options?: { label: string; value: string; nextStep: string }[];
  inputType?: 'text' | 'email';
  inputPlaceholder?: string;
  nextStep?: string;
  storeKey?: keyof LeadData;
}

interface NovaState {
  isOpen: boolean;
  currentStep: string;
  leadData: LeadData;
  isPlaying: boolean;
  isComplete: boolean;
  leadStatus: LeadStatus | null;
  history: string[];
  historyIndex: number;
  
  open: () => void;
  close: () => void;
  setStep: (step: string) => void;
  setPlaying: (playing: boolean) => void;
  updateLeadData: (key: keyof LeadData, value: string) => void;
  complete: (status: LeadStatus) => void;
  reset: () => void;
  goBack: () => void;
  goForward: () => void;
}

export const useNovaStore = create<NovaState>((set, get) => ({
  isOpen: false,
  currentStep: 'welcome',
  leadData: {
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    intentCategory: '',
  },
  isPlaying: false,
  isComplete: false,
  leadStatus: null,
  history: ['welcome'],
  historyIndex: 0,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setStep: (step) => {
    const state = get();
    const newHistory = [...state.history.slice(0, state.historyIndex + 1), step];
    set({ 
      currentStep: step, 
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },
  setPlaying: (playing) => set({ isPlaying: playing }),
  updateLeadData: (key, value) =>
    set((state) => ({
      leadData: { ...state.leadData, [key]: value },
    })),
  complete: (status) => set({ isComplete: true, leadStatus: status }),
  reset: () =>
    set({
      currentStep: 'welcome',
      leadData: {
        name: '',
        email: '',
        projectType: '',
        budget: '',
        timeline: '',
        intentCategory: '',
      },
      isPlaying: false,
      isComplete: false,
      leadStatus: null,
      history: ['welcome'],
      historyIndex: 0,
    }),
  goBack: () => {
    const state = get();
    if (state.historyIndex > 0) {
      set({
        historyIndex: state.historyIndex - 1,
        currentStep: state.history[state.historyIndex - 1]
      });
    }
  },
  goForward: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      set({
        historyIndex: state.historyIndex + 1,
        currentStep: state.history[state.historyIndex + 1]
      });
    }
  },
}));