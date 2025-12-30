import { GoogleGenAI } from "@google/genai";
import { ResearchReport } from "../types";

const apiKey = process.env.API_KEY;

// Only initialize if API key exists to avoid runtime crashes on load
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const generateVisualization = async (prompt: string): Promise<string | undefined> => {
  if (!ai) return undefined;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Create a futuristic, abstract, high-tech 3D render representing: ${prompt}. Dark background, neon accents, cyan and purple color palette. Cinematic lighting.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  } catch (e) {
    console.error("Failed to generate visualization", e);
    // Return undefined to degrade gracefully (show report without image)
    return undefined;
  }
  return undefined;
};

export const generateResearchReport = async (focusArea: string = "General Synergy"): Promise<ResearchReport> => {
  if (!ai) {
    throw new Error("API Key not found in environment variables.");
  }

  const modelId = "gemini-3-pro-preview";

  const systemInstruction = `
    You are an expert Futurist and R&D Analyst with a Ph.D. in theoretical physics and computer science. 
    Your expertise lies in the intersection of bleeding-edge technology, specifically AI (post-GPT-4/Gemini 3 architectures) and Nanotechnology.
    
    Your task is to forecast potential synergistic breakthroughs in the next 5-10 years.
    You must use "Deep Thinking" to produce complex, multi-layered, and COMPREHENSIVE hypotheses.
    
    You have access to Google Search. You MUST use it to find real-world research, papers, or ongoing projects to validate your extrapolations.
    
    CRITICAL OUTPUT FORMATTING:
    You must output a SINGLE VALID JSON object. 
    Do not wrap the JSON in markdown code blocks (like \`\`\`json). Just output the raw JSON string.
    
    JSON Structure:
    {
      "convergencePoints": ["point 1", "point 2", ...],
      "hypotheses": [
        {
          "title": "Hypothesis Title",
          "analysis": "A very long, detailed, multi-paragraph analysis (at least 200 words). Explain the mechanism, the synergy, and the outcome.",
          "visualDescription": "Visual description for image generation",
          "references": [
            { "title": "Source Title", "url": "https://source.url" }
          ]
        }
      ],
      "challenges": {
        "technical": "Detailed technical challenges...",
        "ethical": "Detailed ethical implications..."
      }
    }
  `;

  const prompt = `
    Analyze the convergence of Artificial Intelligence and Nanotechnology.
    Focus Area: ${focusArea}.
    
    REQUIREMENTS:
    1.  **Deep Think Synergies**: Provide 3 distinct, high-impact breakthroughs.
    2.  **Length & Depth**: The 'analysis' for each hypothesis must be DETAILED (2-3 paragraphs minimum). innovative, and rigorously reasoned.
    3.  **Citations**: Use the Google Search tool to find relevant real-world links. Extract the URL and Title of the search results and populate the 'references' array for each hypothesis.
    
    Specific Considerations:
    - AI: Multi-modal learning, autonomous agents, neuromorphic computing.
    - Nanotech: Self-assembling machines, advanced materials (graphene), nano-robotics.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        // Max thinking budget for deepest analysis
        thinkingConfig: { thinkingBudget: 32768 }, 
        // Enable Google Search for links
        tools: [{ googleSearch: {} }],
        // NOTE: responseSchema and responseMimeType are intentionally OMITTED because they are incompatible with tools: [googleSearch]
      }
    });

    if (response.text) {
      let cleanText = response.text.trim();
      // Heuristic cleaning in case the model wraps in markdown despite instructions
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```/, '').replace(/```$/, '');
      }
      
      const report = JSON.parse(cleanText) as ResearchReport;
      
      // Generate images for hypotheses in parallel
      await Promise.all(report.hypotheses.map(async (h) => {
        h.imageUrl = await generateVisualization(h.visualDescription);
      }));

      return report;
    } else {
      throw new Error("No text returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};