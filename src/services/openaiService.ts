import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export interface FundSizingParams {
  strategy: string;
  sector: string;
  region: string;
  targetDeals: number;
  avgDealSize: number;
  investmentPeriod: number;
  marketConditions?: string;
}

export interface ValuationAnalysisParams {
  stage: string;
  sector: string;
  region: string;
  metrics: {
    revenue?: number;
    ebitda?: number;
    growth?: number;
    margins?: number;
  };
  comparables?: string[];
}

export interface ValuationResult {
  preMoney: number;
  postMoney: number;
  methodology: string;
  multiples: {
    revenue?: number;
    ebitda?: number;
  };
  comparables: {
    company: string;
    multiple: number;
  }[];
  rationale: string;
}

export interface FundSizingResult {
  recommendedSize: number;
  rationale: string;
  deploymentSchedule: number[];
  riskFactors: string[];
  opportunities: string[];
}

export async function analyzeFundSizing(params: FundSizingParams): Promise<FundSizingResult> {
  try {
    const prompt = `
      As a private equity fund structuring expert, analyze and recommend an optimal fund size based on:
      
      Strategy: ${params.strategy}
      Sector Focus: ${params.sector}
      Geographic Region: ${params.region}
      Target Number of Deals: ${params.targetDeals}
      Average Deal Size: $${params.avgDealSize.toLocaleString()}
      Investment Period: ${params.investmentPeriod} years
      Market Conditions: ${params.marketConditions || 'Current market conditions'}
      
      Please provide:
      1. Recommended fund size with rationale
      2. Suggested deployment schedule (percentage per year)
      3. Key risk factors to consider
      4. Market opportunities
      
      Format the response in JSON with the following structure:
      {
        "recommendedSize": number (in USD),
        "rationale": "string",
        "deploymentSchedule": [array of yearly percentages],
        "riskFactors": ["array of strings"],
        "opportunities": ["array of strings"]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: "You are an expert private equity fund structuring advisor with deep knowledge of market dynamics, fund sizing, and deployment strategies. Always provide numerical responses with exactly 2 decimal places where applicable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);

    return {
      ...response,
      recommendedSize: Number(response.recommendedSize.toFixed(2)),
      deploymentSchedule: response.deploymentSchedule.map((value: number) => Number(value.toFixed(2)))
    };
  } catch (error) {
    console.error('Error analyzing fund sizing:', error);
    
    return {
      recommendedSize: params.targetDeals * params.avgDealSize,
      rationale: "Calculated based on target deals and average deal size (fallback calculation)",
      deploymentSchedule: Array(params.investmentPeriod).fill(100 / params.investmentPeriod).map(v => Number(v.toFixed(2))),
      riskFactors: ["Market volatility", "Deployment pace risk", "Deal competition"],
      opportunities: ["Market consolidation", "Digital transformation", "Sustainable investments"]
    };
  }
}

export async function analyzeValuation(params: ValuationAnalysisParams): Promise<ValuationResult> {
  try {
    const prompt = `
      As a private equity valuation expert, analyze and provide pre-money and post-money valuations for:
      
      Investment Stage: ${params.stage}
      Sector: ${params.sector}
      Region: ${params.region}
      Key Metrics:
      ${params.metrics.revenue ? `- Revenue: $${params.metrics.revenue.toLocaleString()}` : ''}
      ${params.metrics.ebitda ? `- EBITDA: $${params.metrics.ebitda.toLocaleString()}` : ''}
      ${params.metrics.growth ? `- Growth Rate: ${params.metrics.growth}%` : ''}
      ${params.metrics.margins ? `- Margins: ${params.metrics.margins}%` : ''}
      
      Comparable Companies: ${params.comparables?.join(', ') || 'Use relevant market comparables'}
      
      Please provide:
      1. Pre-money and post-money valuations
      2. Valuation methodology used
      3. Relevant multiples applied
      4. Comparable company analysis
      5. Rationale for valuation
      
      Format the response in JSON with the following structure:
      {
        "preMoney": number,
        "postMoney": number,
        "methodology": "string",
        "multiples": {
          "revenue": number (optional),
          "ebitda": number (optional)
        },
        "comparables": [
          {
            "company": "string",
            "multiple": number
          }
        ],
        "rationale": "string"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: "You are an expert private equity valuation advisor with deep knowledge of market multiples, valuation methodologies, and sector-specific considerations. Always provide numerical responses with exactly 2 decimal places where applicable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);

    // Format numbers to 2 decimal places
    return {
      ...response,
      preMoney: Number(response.preMoney.toFixed(2)),
      postMoney: Number(response.postMoney.toFixed(2)),
      multiples: {
        revenue: response.multiples.revenue ? Number(response.multiples.revenue.toFixed(2)) : undefined,
        ebitda: response.multiples.ebitda ? Number(response.multiples.ebitda.toFixed(2)) : undefined
      },
      comparables: response.comparables.map((comp: any) => ({
        ...comp,
        multiple: Number(comp.multiple.toFixed(2))
      }))
    };
  } catch (error) {
    console.error('Error analyzing valuation:', error);
    
    // Provide fallback values
    return {
      preMoney: 0,
      postMoney: 0,
      methodology: "Error occurred - please try again",
      multiples: {},
      comparables: [],
      rationale: "Error occurred while analyzing valuation"
    };
  }
}