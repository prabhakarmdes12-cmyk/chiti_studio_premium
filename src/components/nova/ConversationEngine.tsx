'use client';

import { useNovaStore, type LeadData } from '@/store/useNovaStore';
import VideoPlayer from './VideoPlayer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

type FlowStep = {
  type: string;
  videoUrl?: string;
  subtitle?: string;
  question?: string;
  options?: { label: string; value: string; nextStep: string }[];
  inputType?: string;
  inputPlaceholder?: string;
  nextStep?: string;
  storeKey?: keyof LeadData;
};

export default function ConversationEngine() {
  const { 
    currentStep, 
    setStep, 
    updateLeadData, 
    complete,
    goBack,
    goForward,
    history,
    historyIndex,
    close,
    isComplete,
    leadStatus
  } = useNovaStore();
  
  const flow: Record<string, FlowStep> = {
    "welcome": { type: "video", videoUrl: "/nova/videos/welcome.mp4", subtitle: "Welcome. I'm Nova.", nextStep: "intent-selection" },
    "intent-selection": { type: "video", videoUrl: "/nova/videos/thinking.mp4", question: "What brings you here?", options: [{ label: "Build something new", value: "build", nextStep: "project-type" }, { label: "Improve what exists", value: "improve", nextStep: "project-type" }, { label: "Just exploring", value: "explore", nextStep: "exploration" }] },
    "exploration": { type: "video", videoUrl: "/nova/videos/acknowledgement.mp4", subtitle: "Take your time. I'm here when you're ready.", nextStep: "end" },
    "project-type": { type: "video", videoUrl: "/nova/videos/thinking.mp4", question: "What type of project?", options: [{ label: "Website / Web App", value: "website", nextStep: "budget" }, { label: "Mobile App", value: "mobile", nextStep: "budget" }, { label: "Brand / Design", value: "brand", nextStep: "budget" }, { label: "SaaS / Product", value: "saas", nextStep: "budget" }, { label: "Something else", value: "other", nextStep: "budget" }], storeKey: "projectType" },
    "budget": { type: "video", videoUrl: "/nova/videos/thinking.mp4", question: "What's your budget range?", options: [{ label: "Under ₹50K", value: "under-50k", nextStep: "timeline" }, { label: "₹50K - ₹1L", value: "50k-1l", nextStep: "timeline" }, { label: "₹1L - ₹5L", value: "1l-5l", nextStep: "timeline" }, { label: "₹5L+", value: "above-5l", nextStep: "timeline" }, { label: "Let's discuss", value: "discuss", nextStep: "timeline" }], storeKey: "budget" },
    "timeline": { type: "video", videoUrl: "/nova/videos/thinking.mp4", question: "When do you need it?", options: [{ label: "ASAP", value: "asap", nextStep: "contact" }, { label: "Within a month", value: "month", nextStep: "contact" }, { label: "1-3 months", value: "1-3months", nextStep: "contact" }, { label: "Just planning", value: "planning", nextStep: "contact" }], storeKey: "timeline" },
    "contact": { type: "video", videoUrl: "/nova/videos/thinking.mp4", question: "What's your name?", inputType: "text", inputPlaceholder: "Your name", storeKey: "name", nextStep: "email" },
    "email": { type: "video", videoUrl: "/nova/videos/thinking.mp4", question: "And your email?", inputType: "email", inputPlaceholder: "Your email", storeKey: "email", nextStep: "approval" },
    "approval": { type: "video", videoUrl: "/nova/videos/approval.mp4", subtitle: "Perfect. Let me prepare your summary.", nextStep: "summary" },
    "summary": { type: "completion", nextStep: "closing" },
    "closing": { type: "video", videoUrl: "/nova/videos/closing.mp4", subtitle: "I'll be in touch soon.", nextStep: "end" },
    "end": { type: "close" }
  };
  
  const stepData = flow[currentStep];

  // Auto-advance from completion to next step
  useEffect(() => {
    if (stepData?.type === 'completion' && stepData.nextStep) {
      const timer = setTimeout(() => {
        // Score the lead and mark complete
        complete('qualified');
        setStep(stepData.nextStep);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, stepData]);

  const handleVideoComplete = () => {
    if (stepData?.nextStep && stepData.type === 'video') {
      setStep(stepData.nextStep);
    }
  };

  const handleOptionSelect = (value: string, nextStep: string) => {
    if (stepData?.storeKey) {
      updateLeadData(stepData.storeKey as keyof LeadData, value);
    }
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const handleInputSubmit = (value: string, _nextStep: string) => {
    if (stepData?.storeKey) {
      updateLeadData(stepData.storeKey as keyof LeadData, value);
    }
    if (stepData?.nextStep) {
      setStep(stepData.nextStep);
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  if (!stepData) return null;

  if (isComplete) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-center justify-center bg-black/80 p-8 text-center">
        <motion.div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.div>
        <h3 className="text-2xl font-light text-white mb-2">Thank you</h3>
        <p className="text-white/60 mb-4">Your information has been received.</p>
        {leadStatus && <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"><span className="text-white/40">Status: </span><span className={leadStatus === 'high-priority' ? 'text-red-400' : leadStatus === 'qualified' ? 'text-yellow-400' : 'text-green-400'}>{leadStatus === 'high-priority' ? 'High Priority' : leadStatus === 'qualified' ? 'Qualified' : 'Low Intent'}</span></div>}
      </motion.div>
    );
  }

  if (stepData.type === 'completion') {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex items-center justify-center bg-black/80"><p className="text-white/80 text-lg">Preparing your summary...</p></motion.div>;
  }

  if (stepData.type === 'close') {
    close();
    return null;
  }

  return (
    <VideoPlayer
      src={stepData.videoUrl || ''}
      subtitle={stepData.subtitle}
      question={stepData.question}
      options={stepData.options}
      inputType={stepData.inputType as 'text' | 'email'}
      inputPlaceholder={stepData.inputPlaceholder}
      onComplete={handleVideoComplete}
      onOptionSelect={handleOptionSelect}
      onInputSubmit={handleInputSubmit}
      canGoBack={canGoBack}
      canGoForward={canGoForward}
      onGoBack={goBack}
      onGoForward={goForward}
      onClose={close}
    />
  );
}
