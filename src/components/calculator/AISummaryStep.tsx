import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle, Sparkles, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AISummaryStepProps {
  isAnalyzing: boolean;
  summaryData: any;
}

export const AISummaryStep = ({ isAnalyzing, summaryData }: AISummaryStepProps) => {
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold">Analyzing your financial profile...</p>
        <p className="text-sm text-muted-foreground mt-2">Our AI is evaluating your information</p>
        <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
          <p>• Estimating trade-in value</p>
          <p>• Calculating debt-to-income ratio</p>
          <p>• Generating personalized loan options</p>
          <p>• Creating leasing alternatives</p>
        </div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="p-8 text-center max-w-lg bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Ready to View Your Results!</h3>
          <p className="text-muted-foreground mb-6">
            We've completed the AI analysis of your financial profile and generated personalized financing options.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">Click "View Results" to see your options</span>
          </div>
        </Card>
      </div>
    );
  }

  // Parse the AI analysis to extract key points
  const analysisPoints = summaryData.analysis?.split('\n').filter((line: string) => line.trim().startsWith('•')) || [];

  return (
    <div className="space-y-6 py-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">Analysis Complete</span>
        </div>
        <h3 className="text-2xl font-bold">Your Financial Overview</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {summaryData.tradeInValue > 0 && (
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Trade-In Value</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  ${summaryData.tradeInValue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Percent className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Recommended APR</p>
              <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                {summaryData.recommendedAPR || 'N/A'}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Loan Options</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-300">
                {summaryData.loanOptions?.length || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Lease Options</p>
              <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
                {summaryData.leaseOptions?.length || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      {analysisPoints.length > 0 && (
        <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-lg">Key Insights</h4>
          </div>
          <div className="space-y-3">
            {analysisPoints.map((point: string, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <p className="text-sm leading-relaxed">{point.replace('•', '').trim()}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {summaryData.bankStatementAnalysis && (
        <Card className="p-5 border-muted">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Financial Health
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summaryData.bankStatementAnalysis}
          </p>
        </Card>
      )}

      <div className="text-center pt-4">
        <Badge variant="outline" className="text-xs">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered Analysis
        </Badge>
      </div>
    </div>
  );
};
