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

// Free LLM options (no paid API keys required)
const FreeLLMProviders = [
  {
    name: 'Hugging Face Free Inference',
    url: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    requiresAuth: false, // Can work without auth for limited requests
    fallback: true,
  },
  {
    name: 'Hugging Face TinyLlama',
    url: 'https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0',
    requiresAuth: false,
    fallback: true,
  },
];

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

// Generate exotic KPI using free LLM (no paid API keys)
async function generateExoticKPIFree(existingKPIs: ExoticKPI[]): Promise<ExoticKPI> {
  const existingNames = existingKPIs.map(kpi => kpi.name).join(', ');
  const category = KPICategories[Math.floor(Math.random() * KPICategories.length)];
  
  // Try each free provider until one works
  for (const provider of FreeLLMProviders) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Optional: Use Hugging Face token if available (free tier)
      const hfToken = process.env.HUGGINGFACE_TOKEN;
      if (hfToken) {
        headers['Authorization'] = `Bearer ${hfToken}`;
      }
      
      const prompt = `You are a creative KPI engineer. Generate ONE exotic KPI in category: ${category}.
      
Return ONLY valid JSON with this exact format:
{
  "name": "unique KPI name (3-6 words)",
  "description": "detailed explanation (50-100 words)",
  "formula": "calculation method",
  "creativityScore": 75
}

Avoid: ${existingNames}

Make it creative and insightful for business value.`;

      const response = await fetch(provider.url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.9,
            return_full_text: false,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Handle different response formats
        let content = '';
        if (Array.isArray(data)) {
          content = data[0]?.generated_text || '';
        } else if (data.generated_text) {
          content = data.generated_text;
        } else if (data[0]?.generated_text) {
          content = data[0].generated_text;
        }
        
        // Extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          
          return {
            id: `kpi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: result.name || `${category} Index`,
            description: result.description || `Measures ${category} for business insights`,
            formula: result.formula || 'Calculated from relevant metrics',
            category,
            creativityScore: result.creativityScore || Math.floor(Math.random() * 30) + 70,
            timestamp: Date.now(),
            value: Math.random() * 100,
            trend: ['up', 'down', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as any,
          };
        }
      }
    } catch (error) {
      console.log(`Provider ${provider.name} failed, trying next...`);
      continue;
    }
  }
  
  // Fallback: Generate algorithmically if all free LLMs fail
  return generateExoticKPIFallback(category, existingNames);
}

// Fallback algorithmic generation when free LLMs are unavailable
function generateExoticKPIFallback(category: string, existingNames: string): ExoticKPI {
  const prefixes = ['Sentiment', 'Cognitive', 'Innovation', 'Engagement', 'Growth'];
  const metrics = ['Velocity', 'Load', 'Momentum', 'Entropy', 'Acceleration'];
  const suffixes = ['Index', 'Score', 'Metric', 'Ratio', 'Coefficient'];
  
  const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${metrics[Math.floor(Math.random() * metrics.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  
  return {
    id: `kpi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    description: `Algorithmically generated ${category} metric for business insights. Measures rate of change and provides visibility into performance patterns.`,
    formula: `(current_value - previous_value) / previous_value * 100`,
    category,
    creativityScore: Math.floor(Math.random() * 20) + 60,
    timestamp: Date.now(),
    value: Math.random() * 100,
    trend: ['up', 'down', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as any,
  };
}

// Calculate a simulated value for a KPI
function calculateKPIValue(kpi: ExoticKPI): number {
  const baseValue = kpi.creativityScore * 0.5;
  const variance = (Math.random() - 0.5) * 30;
  return Math.max(0, Math.min(100, baseValue + variance));
}

// Never-ending KPI generation loop using free LLM
function startKPIEngine() {
  if (engineState.isRunning) return;
  
  engineState.isRunning = true;
  
  const generateLoop = async () => {
    while (engineState.isRunning) {
      try {
        // Generate new KPI every 45 seconds (balance between speed and API limits)
        await new Promise(resolve => setTimeout(resolve, 45000));
        
        const newKPI = await generateExoticKPIFree(engineState.kpis);
        newKPI.value = calculateKPIValue(newKPI);
        
        engineState.kpis.push(newKPI);
        engineState.totalColumns++;
        engineState.lastGeneration = Date.now();
        
        // Keep only last 150 KPIs to manage memory
        if (engineState.kpis.length > 150) {
          engineState.kpis = engineState.kpis.slice(-150);
        }
        
        console.log(`[Free LLM] Generated KPI: ${newKPI.name} (Creativity: ${newKPI.creativityScore})`);
      } catch (error) {
        console.error('KPI generation error:', error);
        await new Promise(resolve => setTimeout(resolve, 10000));
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
          message: 'KPI engine started with free LLM (no paid API keys)',
          mode: 'free-llm',
          providers: FreeLLMProviders.map(p => p.name),
          state: engineState,
        });
      }
      return NextResponse.json({
        status: 'already_running',
        message: 'KPI engine is already running',
        mode: 'free-llm',
        state: engineState,
      });
    }
    
    if (action === 'stop') {
      engineState.isRunning = false;
      return NextResponse.json({
        status: 'stopped',
        message: 'KPI engine stopped',
        mode: 'free-llm',
        state: engineState,
      });
    }
    
    if (action === 'generate_single') {
      const newKPI = await generateExoticKPIFree(engineState.kpis);
      newKPI.value = calculateKPIValue(newKPI);
      engineState.kpis.push(newKPI);
      engineState.totalColumns++;
      engineState.lastGeneration = Date.now();
      
      return NextResponse.json({
        status: 'generated',
        mode: 'free-llm',
        kpi: newKPI,
        state: engineState,
      });
    }
    
    if (action === 'test_providers') {
      const results = [];
      for (const provider of FreeLLMProviders) {
        try {
          const response = await fetch(provider.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: 'test', parameters: { max_new_tokens: 10 } }),
          });
          results.push({
            provider: provider.name,
            status: response.ok ? 'available' : 'unavailable',
            statusCode: response.status,
          });
        } catch (error) {
          results.push({
            provider: provider.name,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
      
      return NextResponse.json({
        status: 'tested',
        results,
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action. Use: start, stop, generate_single, or test_providers' },
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
      mode: 'free-llm',
      providers: FreeLLMProviders.map(p => p.name),
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
        'Content-Disposition': 'attachment; filename="exotic-kpis-free.csv"',
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
    mode: 'free-llm',
    state: engineState,
  });
}
