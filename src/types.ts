export type Jurisdiction = 'India' | 'US' | 'UK' | 'EU' | 'Singapore' | 'Australia';
export type ContractType = 'NDA' | 'Employment' | 'Vendor' | 'Lease' | 'Service' | 'IP Assignment';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface ContractInputs {
  type: ContractType;
  partyA: string;
  partyB: string;
  jurisdiction: Jurisdiction;
  terms: string;
  riskLevel: RiskLevel;
}

export interface LegalAnalysis {
  contract: string;
  risks: string[];
  mitigations: {
    original: string;
    suggested: string;
    reason: string;
  }[];
  compliance: string;
}
