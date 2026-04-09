import { GoogleGenAI, Type } from "@google/genai";
import { ContractInputs, LegalAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `You are an expert AI Legal Agent. Your task is to generate professional legal contracts and provide detailed risk analysis.
Always follow this structure:
1. CONTRACT: A full, structured legal document with title, definitions, clauses, and signature section.
2. RISK ANALYSIS: A list of potential legal risks identified in the generated contract or user terms.
3. MITIGATION SUGGESTIONS: Specific improvements to clauses to reduce risk.
4. COMPLIANCE: A brief statement on compliance with the selected jurisdiction's laws.

Use professional legal language. Highlight risky areas. Use clear headings and numbering.`;

export async function generateLegalDocument(inputs: ContractInputs): Promise<LegalAnalysis> {
  const prompt = `
    Generate a ${inputs.type} contract between ${inputs.partyA} and ${inputs.partyB}.
    Jurisdiction: ${inputs.jurisdiction}
    Key Terms: ${inputs.terms}
    Target Risk Level: ${inputs.riskLevel}
    
    Please provide the response in a structured JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          contract: { type: Type.STRING, description: "The full legal contract in markdown format" },
          risks: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of identified legal risks"
          },
          mitigations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                suggested: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["original", "suggested", "reason"]
            }
          },
          compliance: { type: Type.STRING, description: "Compliance statement" }
        },
        required: ["contract", "risks", "mitigations", "compliance"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Invalid response from AI Legal Agent");
  }
}
