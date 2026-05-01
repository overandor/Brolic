import { NextRequest, NextResponse } from 'next/server';

// Types for exotic KPIs
interface ExoticKPI {
  id: string;
  name: string;
  description: string;
  formula: string;
  category: string;
  creativityScore: number;
  timestamp: number;
  value?: number;
  trend?: 'up' | 'down' | 'stable' | 'volatile';
}

interface KPIEngineState {
  kpis: ExoticKPI[];
  currentColumn: number;
  totalColumns: number;
  lastGeneration: number;
  isRunning: boolean;
}

// In-memory storage (in production, use a database)
const engineState: KPIEngineState = {
  kpis: [],
  currentColumn: 1,
  totalColumns: 0,
  lastGeneration: 0,
  isRunning: false,
};

// Exotic KPI categories for LLM creativity
const KPICategories = [
  'sentiment-velocity-acceleration',
  'cognitive-load-distribution-index',
  'innovation-momentum-decomposition',
  'engagement-entropy-fluctuation',
  'growth-acceleration-variance',
  'user-synergy-resonance-score',
  'feature-adoption-velocity-dynamics',
  'market-sentiment-oscillation-pattern',
  'team-velocity-fluctuation-analysis',
  'revenue-predictability-confidence-index',
  'customer-delight-retention-metric',
  'product-market-resonance-amplitude',
  'technical-debt-velocity-accumulation',
  'innovation-density-spatiotemporal-index',
  'user-journey-smoothness-optimization',
  'strategic-alignment-coherence-score',
  'decision-latency-impact-analysis',
  'value-creation-efficiency-ratio',
  'cross-functional-collaboration-depth',
  'strategic-option-value-realization',
];

// Generate exotic KPI using LLM creativity
async function generateExoticKPI(existingKPIs: ExoticKPI[]): Promise<ExoticKPI> {
  const groqApiKey = process.env.GROQ_API_KEY;
  
  // Get existing KPI names to avoid duplicates
  const existingNames = existingKPIs.map(kpi => kpi.name).join(', ');
  
  // Select a random category
  const category = KPICategories[Math.floor(Math.random() * KPICategories.length)];
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: `You are a creative KPI engineer. Generate exotic, novel, and insightful KPIs that most companies never track. Be creative but practical. Return only JSON with format: {"name": "unique KPI name", "description": "what it measures and why it matters", "formula": "how to calculate it", "creativityScore": number (0-100)}. Avoid these existing KPIs: ${existingNames}`
        },
        {
          role: 'user',
          content: `Generate a new exotic KPI in the category: ${category}. Make it creative, insightful, and something that could provide genuine business value.`
        }
      ],
      temperature: 0.9,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error('LLM generation failed');
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  return {
    id: `kpi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: result.name,
    description: result.description,
    formula: result.formula,
    category,
    creativityScore: result.creativityScore || Math.floor(Math.random() * 30) + 70,
    timestamp: Date.now(),
    value: Math.random() * 100, // Simulated initial value
    trend: ['up', 'down', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as any,
  };
}

// Calculate a simulated value for a KPI
function calculateKPIValue(kpi: ExoticKPI): number {
  // Simulate value based on creativity score and random factors
  const baseValue = kpi.creativityScore * 0.5;
  const variance = (Math.random() - 0.5) * 30;
  return Math.max(0, Math.min(100, baseValue + variance));
}

// Never-ending KPI generation loop
function startKPIEngine() {
  if (engineState.isRunning) return;
  
  engineState.isRunning = true;
  
  const generateLoop = async () => {
    while (engineState.isRunning) {
      try {
        // Generate new KPI every 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        const newKPI = await generateExoticKPI(engineState.kpis);
        newKPI.value = calculateKPIValue(newKPI);
        
        engineState.kpis.push(newKPI);
        engineState.totalColumns++;
        engineState.lastGeneration = Date.now();
        
        // Keep only last 100 KPIs to manage memory
        if (engineState.kpis.length > 100) {
          engineState.kpis = engineState.kpis.slice(-100);
        }
        
        console.log(`Generated new KPI: ${newKPI.name} (Creativity: ${newKPI.creativityScore})`);
      } catch (error) {
        console.error('KPI generation error:', error);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  };
  
  generateLoop();
}

// POST - Start the KPI engine
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (action === 'start') {
      if (!engineState.isRunning) {
        startKPIEngine();
        return NextResponse.json({
          status: 'started',
          message: 'KPI never-ending engine started',
          state: engineState,
        });
      }
      return NextResponse.json({
        status: 'already_running',
        message: 'KPI engine is already running',
        state: engineState,
      });
    }
    
    if (action === 'stop') {
      engineState.isRunning = false;
      return NextResponse.json({
        status: 'stopped',
        message: 'KPI engine stopped',
        state: engineState,
      });
    }
    
    if (action === 'generate_single') {
      const newKPI = await generateExoticKPI(engineState.kpis);
      newKPI.value = calculateKPIValue(newKPI);
      engineState.kpis.push(newKPI);
      engineState.totalColumns++;
      engineState.lastGeneration = Date.now();
      
      return NextResponse.json({
        status: 'generated',
        kpi: newKPI,
        state: engineState,
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action. Use: start, stop, or generate_single' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// GET - Get current engine state and KPIs
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  
  // Update values for existing KPIs to simulate real-time data
  engineState.kpis = engineState.kpis.map(kpi => ({
    ...kpi,
    value: calculateKPIValue(kpi),
    trend: ['up', 'down', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as any,
  }));
  
  if (format === 'json') {
    return NextResponse.json({
      state: engineState,
      kpis: engineState.kpis,
      summary: {
        totalKPIs: engineState.kpis.length,
        totalColumns: engineState.totalColumns,
        averageCreativity: engineState.kpis.length > 0 
          ? engineState.kpis.reduce((sum, kpi) => sum + kpi.creativityScore, 0) / engineState.kpis.length 
          : 0,
        categories: [...new Set(engineState.kpis.map(kpi => kpi.category))],
      },
    });
  }
  
  if (format === 'csv') {
    const headers = ['ID', 'Name', 'Description', 'Formula', 'Category', 'Creativity', 'Value', 'Trend', 'Timestamp'];
    const rows = engineState.kpis.map(kpi => [
      kpi.id,
      kpi.name,
      kpi.description,
      kpi.formula,
      kpi.category,
      kpi.creativityScore,
      kpi.value?.toFixed(2),
      kpi.trend,
      new Date(kpi.timestamp).toISOString(),
    ]);
    
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="exotic-kpis.csv"',
      },
    });
  }
  
  return NextResponse.json(
    { error: 'Invalid format. Use: json or csv' },
    { status: 400 }
  );
}

// DELETE - Reset the engine
export async function DELETE(request: NextRequest) {
  engineState.kpis = [];
  engineState.currentColumn = 1;
  engineState.totalColumns = 0;
  engineState.lastGeneration = 0;
  engineState.isRunning = false;
  
  return NextResponse.json({
    status: 'reset',
    message: 'KPI engine reset',
    state: engineState,
  });
}
