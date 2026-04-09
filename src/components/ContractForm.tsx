import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ContractInputs, ContractType, Jurisdiction, RiskLevel } from '@/src/types';
import { FileText, Shield, Scale, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface ContractFormProps {
  onSubmit: (inputs: ContractInputs) => void;
  isLoading: boolean;
}

export function ContractForm({ onSubmit, isLoading }: ContractFormProps) {
  const [inputs, setInputs] = React.useState<ContractInputs>({
    type: 'NDA',
    partyA: '',
    partyB: '',
    jurisdiction: 'India',
    terms: '',
    riskLevel: 'Medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-slate-900">
          <Scale className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-xl font-semibold">Contract Parameters</CardTitle>
        </div>
        <CardDescription>
          Define the core terms and parties for your legal document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Contract Type</Label>
              <Select 
                value={inputs.type} 
                onValueChange={(v) => setInputs({ ...inputs, type: v as ContractType })}
              >
                <SelectTrigger id="type" className="bg-slate-50/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NDA">NDA (Non-Disclosure)</SelectItem>
                  <SelectItem value="Employment">Employment Contract</SelectItem>
                  <SelectItem value="Vendor">Vendor Agreement</SelectItem>
                  <SelectItem value="Lease">Lease Agreement</SelectItem>
                  <SelectItem value="Service">Service Agreement</SelectItem>
                  <SelectItem value="IP Assignment">IP Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Select 
                value={inputs.jurisdiction} 
                onValueChange={(v) => setInputs({ ...inputs, jurisdiction: v as Jurisdiction })}
              >
                <SelectTrigger id="jurisdiction" className="bg-slate-50/50">
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="EU">European Union</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partyA">Party A (Disclosing/Employer)</Label>
              <Input 
                id="partyA" 
                placeholder="e.g. ABC Pvt Ltd" 
                value={inputs.partyA}
                onChange={(e) => setInputs({ ...inputs, partyA: e.target.value })}
                className="bg-slate-50/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partyB">Party B (Receiving/Employee)</Label>
              <Input 
                id="partyB" 
                placeholder="e.g. XYZ Solutions" 
                value={inputs.partyB}
                onChange={(e) => setInputs({ ...inputs, partyB: e.target.value })}
                className="bg-slate-50/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Key Terms & Conditions</Label>
            <Textarea 
              id="terms" 
              placeholder="Specify payment terms, duration, termination clauses, IP rights, etc." 
              className="min-h-[120px] bg-slate-50/50 resize-none"
              value={inputs.terms}
              onChange={(e) => setInputs({ ...inputs, terms: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Risk Tolerance Level</Label>
            <div className="flex gap-4">
              {(['Low', 'Medium', 'High'] as RiskLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setInputs({ ...inputs, riskLevel: level })}
                  className={`flex-1 py-2 px-4 rounded-md border text-sm font-medium transition-all ${
                    inputs.riskLevel === level
                      ? level === 'Low' ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' :
                        level === 'Medium' ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm' :
                        'bg-red-50 border-red-200 text-red-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Contract...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Legal Document
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
