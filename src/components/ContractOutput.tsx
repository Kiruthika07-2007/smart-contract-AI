import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LegalAnalysis } from '@/src/types';
import { FileText, AlertTriangle, ShieldCheck, Scale, Download, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface ContractOutputProps {
  analysis: LegalAnalysis | null;
}

export function ContractOutput({ analysis }: ContractOutputProps) {
  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center space-y-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/30">
        <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100">
          <Scale className="w-12 h-12 text-slate-300" />
        </div>
        <div className="max-w-xs">
          <h3 className="text-lg font-medium text-slate-900">No Document Generated</h3>
          <p className="text-sm">Fill out the form on the left to generate your legal contract and risk analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="output"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="h-full flex flex-col"
      >
        <Tabs defaultValue="contract" className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <TabsList className="grid w-[400px] grid-cols-3 bg-transparent">
              <TabsTrigger value="contract" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                <FileText className="w-4 h-4 mr-2" />
                Contract
              </TabsTrigger>
              <TabsTrigger value="risks" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Risks
              </TabsTrigger>
              <TabsTrigger value="mitigation" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Mitigation
              </TabsTrigger>
            </TabsList>
            
            <div className="px-3 flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                {analysis.compliance}
              </Badge>
              <button className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-500" title="Download PDF">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <TabsContent value="contract" className="h-full mt-0 focus-visible:ring-0">
              <Card className="h-full border-slate-200 shadow-sm overflow-hidden">
                <ScrollArea className="h-[calc(100vh-280px)] p-8">
                  <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
                    <Markdown>{analysis.contract}</Markdown>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="h-full mt-0 focus-visible:ring-0">
              <Card className="h-full border-slate-200 shadow-sm">
                <ScrollArea className="h-[calc(100vh-280px)] p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Identified Legal Risks
                    </h3>
                    <p className="text-sm text-slate-500">
                      Our AI agent has identified the following potential vulnerabilities in the current contract structure.
                    </p>
                    <div className="grid gap-3">
                      {analysis.risks.map((risk, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-amber-50/50 border border-amber-100 rounded-lg flex gap-3"
                        >
                          <div className="mt-1">
                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                          </div>
                          <span className="text-slate-700 text-sm leading-relaxed">{risk}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="mitigation" className="h-full mt-0 focus-visible:ring-0">
              <Card className="h-full border-slate-200 shadow-sm">
                <ScrollArea className="h-[calc(100vh-280px)] p-6">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        Mitigation Strategies
                      </h3>
                      <p className="text-sm text-slate-500">
                        Recommended clause improvements to strengthen your legal position.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {analysis.mitigations.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
                        >
                          <div className="p-4 bg-slate-50 border-bottom border-slate-200">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Original Clause / Issue</span>
                            <p className="mt-1 text-sm text-slate-600 italic">"{m.original}"</p>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-green-600">Suggested Improvement</span>
                              <div className="mt-1 p-3 bg-green-50/50 border border-green-100 rounded-lg text-sm text-slate-800 font-medium">
                                {m.suggested}
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-slate-500">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5" />
                              <span><span className="font-semibold text-slate-700">Reasoning:</span> {m.reason}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}
