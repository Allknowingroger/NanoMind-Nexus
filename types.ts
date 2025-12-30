export interface Reference {
  title: string;
  url: string;
}

export interface Hypothesis {
  title: string;
  analysis: string;
  visualDescription: string;
  imageUrl?: string;
  references?: Reference[];
}

export interface Challenges {
  technical: string;
  ethical: string;
}

export interface ResearchReport {
  convergencePoints: string[];
  hypotheses: Hypothesis[];
  challenges: Challenges;
}

export interface ResearchParams {
  focusArea?: string;
}