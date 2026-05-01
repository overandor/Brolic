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

// Local KPI generation without LLM - algorithmic creativity
const KPITemplates = [
  {
    name: "{prefix} {metric} {suffix}",
    description: "Measures the rate of change in {metric} over time, providing insights into {aspect} performance. This metric helps identify {benefit} and optimize for {outcome}.",
    formula: "({metric}_current - {metric}_previous) / {metric}_previous * 100",
    categories: ['velocity', 'acceleration', 'momentum', 'growth', 'rate'],
  },
  {
    name: "{prefix} {metric} {suffix}",
    description: "Calculates the {aspect} of {metric} across all {scope}, revealing patterns in {dimension} that impact {outcome}. Essential for understanding {benefit}.",
    formula: "SUM({metric} * weight) / COUNT({scope})",
    categories: ['index', 'score', 'ratio', 'coefficient', 'factor'],
  },
  {
    name: "{prefix} {metric} {suffix}",
    description: "Tracks the {dimension} of {metric} through {method}, providing visibility into {aspect} variations. Critical for {benefit} and {outcome} optimization.",
    formula: "STDDEV({metric}) / AVG({metric}) * 100",
    categories: ['variance', 'deviation', 'fluctuation', 'volatility', 'entropy'],
  },
];

const prefixes = [
  'Sentiment', 'Cognitive', 'Innovation', 'Engagement', 'Growth', 
  'User', 'Feature', 'Market', 'Team', 'Revenue', 'Customer', 'Product',
  'Technical', 'Strategic', 'Decision', 'Value', 'Cross-Functional'
];

const metrics = [
  'Velocity', 'Load', 'Momentum', 'Entropy', 'Acceleration', 'Synergy',
  'Adoption', 'Sentiment', 'Fluctuation', 'Predictability', 'Delight',
  'Resonance', 'Debt', 'Density', 'Journey', 'Alignment', 'Latency',
  'Efficiency', 'Collaboration', 'Realization', 'Impact', 'Depth'
];

const suffixes = [
  'Index', 'Score', 'Metric', 'Ratio', 'Coefficient', 'Factor',
  'Rate', 'Velocity', 'Acceleration', 'Amplitude', 'Pattern', 'Analysis',
  'Dynamics', 'Oscillation', 'Distribution', 'Decomposition', 'Optimization',
  'Coherence', 'Accumulation', 'Realization', 'Efficiency', 'Depth'
];

const aspects = [
  'team productivity', 'user engagement', 'market performance', 'innovation capacity',
  'customer satisfaction', 'technical quality', 'strategic alignment', 'operational efficiency',
  'decision effectiveness', 'value creation', 'collaboration depth', 'innovation velocity'
];

const benefits = [
  'bottlenecks early', 'hidden opportunities', 'performance trends', 'risk factors',
  'growth potential', 'efficiency gains', 'quality improvements', 'strategic misalignments',
  'decision delays', 'value leaks', 'collaboration gaps', 'innovation barriers'
];

const outcomes = [
  'faster decision-making', 'higher productivity', 'better user experience', 'increased revenue',
  'improved quality', 'reduced costs', 'enhanced innovation', 'stronger alignment',
  'greater efficiency', 'higher satisfaction', 'better collaboration', 'faster growth'
];

const scopes = [
  'departments', 'teams', 'projects', 'users', 'customers', 'products',
  'features', 'initiatives', 'campaigns', 'channels', 'segments', 'regions'
];

const dimensions = [
  'temporal patterns', 'geographic distribution', 'demographic segments', 'behavioral trends',
  'performance variance', 'sentiment shifts', 'engagement levels', 'adoption rates',
  'velocity changes', 'quality fluctuations', 'efficiency variations', 'innovation density'
];

const methods = [
  'statistical analysis', 'time-series decomposition', 'correlation mapping', 'regression modeling',
  'clustering algorithms', 'anomaly detection', 'pattern recognition', 'trend analysis',
  'variance analysis', 'distribution modeling', 'entropy calculation', 'momentum tracking'
];

// Generate exotic KPI using algorithmic creativity (no LLM API)
function generateExoticKPILocal(existingKPIs: ExoticKPI[]): ExoticKPI {
  const existingNames = new Set(existingKPIs.map(kpi => kpi.name.toLowerCase()));
  
  let attempts = 0;
  let kpi: ExoticKPI;
  
  do {
    // Select random template
    const template = KPITemplates[Math.floor(Math.random() * KPITemplates.length)];
    const category = template.categories[Math.floor(Math.random() * template.categories.length)];
    
    // Generate name
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    let name = template.name
      .replace('{prefix}', prefix)
      .replace('{metric}', metric)
      .replace('{suffix}', suffix);
    
    // Ensure uniqueness
    if (existingNames.has(name.toLowerCase())) {
      name = `${prefix} ${metric} ${suffix} ${Math.floor(Math.random() * 1000)}`;
    }
    
    // Generate description
    const aspect = aspects[Math.floor(Math.random() * aspects.length)];
    const benefit = benefits[Math.floor(Math.random() * benefits.length)];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    const scope = scopes[Math.floor(Math.random() * scopes.length)];
    const dimension = dimensions[Math.floor(Math.random() * dimensions.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    
    let description = template.description
      .replace('{metric}', metric.toLowerCase())
      .replace('{aspect}', aspect)
      .replace('{benefit}', benefit)
      .replace('{outcome}', outcome)
      .replace('{scope}', scope)
      .replace('{dimension}', dimension)
      .replace('{method}', method);
    
    // Generate formula
    let formula = template.formula
      .replace('{metric}', metric.toLowerCase())
      .replace('{scope}', scope.toLowerCase());
    
    // Calculate creativity score based on uniqueness and complexity
    const complexity = (name.length + description.length) / 10;
    const uniqueness = Math.random() * 20;
    const creativityScore = Math.min(100, Math.max(50, complexity + uniqueness));
    
    kpi = {
      id: `kpi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      formula,
      category,
      creativityScore: Math.floor(creativityScore),
      timestamp: Date.now(),
      value: Math.random() * 100,
      trend: ['up', 'down', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as any,
    };
    
    attempts++;
  } while (existingNames.has(kpi.name.toLowerCase()) && attempts < 10);
  
  return kpi;
}

// Calculate a simulated value for a KPI with more realistic patterns
function calculateKPIValue(kpi: ExoticKPI, iteration: number): number {
  // Create more realistic value patterns based on creativity score and iteration
  const baseValue = kpi.creativityScore * 0.6;
  const timeFactor = Math.sin(iteration * 0.1) * 10; // Cyclical pattern
  const variance = (Math.random() - 0.5) * 20;
  const trend = (iteration * 0.01) % 10; // Slight upward trend over time
  
  return Math.max(0, Math.min(100, baseValue + timeFactor + variance + trend));
}

// Never-ending KPI generation loop (24/7, no API calls)
function startKPIEngine() {
  if (engineState.isRunning) return;
  
  engineState.isRunning = true;
  
  const generateLoop = async () => {
    let iteration = 0;
    while (engineState.isRunning) {
      try {
        // Generate new KPI every 30 seconds (faster than LLM version since no API latency)
        await new Promise(resolve => setTimeout(resolve, 30000));
        
        const newKPI = generateExoticKPILocal(engineState.kpis);
        newKPI.value = calculateKPIValue(newKPI, iteration);
        
        engineState.kpis.push(newKPI);
        engineState.totalColumns++;
        engineState.lastGeneration = Date.now();
        
        // Keep only last 200 KPIs to manage memory (can store more since generation is faster)
        if (engineState.kpis.length > 200) {
          engineState.kpis = engineState.kpis.slice(-200);
        }
        
        iteration++;
        console.log(`[24/7] Generated KPI ${engineState.totalColumns}: ${newKPI.name} (Creativity: ${newKPI.creativityScore})`);
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
          message: '24/7 KPI engine started (no API calls)',
          mode: 'local',
          state: engineState,
        });
      }
      return NextResponse.json({
        status: 'already_running',
        message: 'KPI engine is already running',
        mode: 'local',
        state: engineState,
      });
    }
    
    if (action === 'stop') {
      engineState.isRunning = false;
      return NextResponse.json({
        status: 'stopped',
        message: 'KPI engine stopped',
        mode: 'local',
        state: engineState,
      });
    }
    
    if (action === 'generate_single') {
      const newKPI = generateExoticKPILocal(engineState.kpis);
      newKPI.value = calculateKPIValue(newKPI, engineState.totalColumns);
      engineState.kpis.push(newKPI);
      engineState.totalColumns++;
      engineState.lastGeneration = Date.now();
      
      return NextResponse.json({
        status: 'generated',
        mode: 'local',
        kpi: newKPI,
        state: engineState,
      });
    }
    
    if (action === 'generate_batch') {
      const { count = 10 } = body;
      const newKPIs = [];
      
      for (let i = 0; i < count; i++) {
        const newKPI = generateExoticKPILocal(engineState.kpis);
        newKPI.value = calculateKPIValue(newKPI, engineState.totalColumns + i);
        engineState.kpis.push(newKPI);
        newKPIs.push(newKPI);
      }
      
      engineState.totalColumns += count;
      engineState.lastGeneration = Date.now();
      
      return NextResponse.json({
        status: 'batch_generated',
        mode: 'local',
        count: newKPIs.length,
        kpis: newKPIs,
        state: engineState,
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action. Use: start, stop, generate_single, or generate_batch' },
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
  const iteration = engineState.totalColumns;
  
  // Update values for existing KPIs to simulate real-time data
  engineState.kpis = engineState.kpis.map((kpi, idx) => ({
    ...kpi,
    value: calculateKPIValue(kpi, iteration - (engineState.kpis.length - idx)),
    trend: ['up', 'down', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as any,
  }));
  
  if (format === 'json') {
    return NextResponse.json({
      mode: 'local',
      state: engineState,
      kpis: engineState.kpis,
      summary: {
        totalKPIs: engineState.kpis.length,
        totalColumns: engineState.totalColumns,
        averageCreativity: engineState.kpis.length > 0 
          ? engineState.kpis.reduce((sum, kpi) => sum + kpi.creativityScore, 0) / engineState.kpis.length 
          : 0,
        categories: [...new Set(engineState.kpis.map(kpi => kpi.category))],
        uptime: engineState.isRunning ? Date.now() - (engineState.lastGeneration || Date.now()) : 0,
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
        'Content-Disposition': 'attachment; filename="exotic-kpis-local.csv"',
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
    mode: 'local',
    state: engineState,
  });
}
