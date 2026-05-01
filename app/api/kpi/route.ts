import { NextRequest, NextResponse } from 'next/server';

// KPI calculation types
interface KPICalculation {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  timestamp: number;
}

interface KPIStream {
  calculations: KPICalculation[];
  isStreaming: boolean;
  lastUpdate: number;
}

// In-memory storage for active KPI streams
const activeStreams = new Map<string, KPIStream>();

// LLM integration for KPI calculation
async function calculateKPIWithLLM(metric: string, context: any): Promise<KPICalculation> {
  const groqApiKey = process.env.GROQ_API_KEY;
  const openrouterApiKey = process.env.OPENROUTER_API_KEY;
  
  // Use Groq API for fast inference
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
          content: 'You are a KPI calculation engine. Analyze the given metric and context to calculate its value, trend, and confidence score. Return only JSON with format: {"metric": string, "value": number, "trend": "up"|"down"|"stable", "confidence": number (0-1)}'
        },
        {
          role: 'user',
          content: `Calculate KPI for metric: ${metric}. Context: ${JSON.stringify(context)}`
        }
      ],
      temperature: 0.3,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    throw new Error('LLM calculation failed');
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  return {
    metric: result.metric,
    value: result.value,
    trend: result.trend,
    confidence: result.confidence,
    timestamp: Date.now(),
  };
}

// Continuous KPI calculation loop
function startKPIStream(streamId: string, metrics: string[], context: any) {
  const stream: KPIStream = {
    calculations: [],
    isStreaming: true,
    lastUpdate: Date.now(),
  };
  
  activeStreams.set(streamId, stream);

  // Calculate each metric continuously
  metrics.forEach(async (metric) => {
    while (activeStreams.get(streamId)?.isStreaming) {
      try {
        const calculation = await calculateKPIWithLLM(metric, context);
        const currentStream = activeStreams.get(streamId);
        if (currentStream) {
          currentStream.calculations.push(calculation);
          currentStream.lastUpdate = Date.now();
          
          // Keep only last 100 calculations per metric
          const metricCalculations = currentStream.calculations.filter(c => c.metric === metric);
          if (metricCalculations.length > 100) {
            currentStream.calculations = currentStream.calculations.filter(c => c.metric !== metric);
            currentStream.calculations.push(...metricCalculations.slice(-100));
          }
        }
      } catch (error) {
        console.error(`KPI calculation error for ${metric}:`, error);
      }
      
      // Wait 5 seconds before next calculation
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  });
}

// POST - Start new KPI stream
export async function POST(request: NextRequest) {
  try {
    const { metrics, context } = await request.json();
    
    if (!metrics || !Array.isArray(metrics)) {
      return NextResponse.json(
        { error: 'Metrics array is required' },
        { status: 400 }
      );
    }

    const streamId = `stream-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    startKPIStream(streamId, metrics, context || {});
    
    return NextResponse.json({
      streamId,
      status: 'started',
      metrics,
      message: 'KPI calculation stream started',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to start KPI stream' },
      { status: 500 }
    );
  }
}

// GET - Get KPI stream status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const streamId = searchParams.get('streamId');
  
  if (!streamId) {
    // Return all active streams
    const streams = Array.from(activeStreams.entries()).map(([id, stream]) => ({
      id,
      isStreaming: stream.isStreaming,
      calculationCount: stream.calculations.length,
      lastUpdate: stream.lastUpdate,
    }));
    
    return NextResponse.json({ streams });
  }
  
  const stream = activeStreams.get(streamId);
  
  if (!stream) {
    return NextResponse.json(
      { error: 'Stream not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    streamId,
    isStreaming: stream.isStreaming,
    calculations: stream.calculations,
    lastUpdate: stream.lastUpdate,
  });
}

// DELETE - Stop KPI stream
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const streamId = searchParams.get('streamId');
  
  if (!streamId) {
    return NextResponse.json(
      { error: 'StreamId is required' },
      { status: 400 }
    );
  }
  
  const stream = activeStreams.get(streamId);
  
  if (!stream) {
    return NextResponse.json(
      { error: 'Stream not found' },
      { status: 404 }
    );
  }
  
  stream.isStreaming = false;
  activeStreams.delete(streamId);
  
  return NextResponse.json({
    streamId,
    status: 'stopped',
    message: 'KPI calculation stream stopped',
  });
}
