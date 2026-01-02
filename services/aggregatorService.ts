
/**
 * AGGREGATOR SERVICE
 * Handles requests to third-party model aggregators.
 */

interface AggregatorOptions {
  model: string;
  messages: any[];
  apiKey?: string;
  temperature?: number;
}

// ---------------------------------------------------------------------------
// OPENROUTER SERVICE - START
// ---------------------------------------------------------------------------
export async function callOpenRouter(options: AggregatorOptions) {
  const key = options.apiKey || process.env.OPENROUTER_API_KEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature || 0.7
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}
// ---------------------------------------------------------------------------
// OPENROUTER SERVICE - END
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// GROQ CLOUD SERVICE - START
// ---------------------------------------------------------------------------
export async function callGroq(options: AggregatorOptions) {
  const key = options.apiKey || process.env.GROQ_API_KEY;
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: options.model,
      messages: options.messages
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}
// ---------------------------------------------------------------------------
// GROQ CLOUD SERVICE - END
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MISTRAL API SERVICE - START
// ---------------------------------------------------------------------------
export async function callMistral(options: AggregatorOptions) {
  const key = options.apiKey || process.env.MISTRAL_API_KEY;
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: options.model,
      messages: options.messages
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}
// ---------------------------------------------------------------------------
// MISTRAL API SERVICE - END
// ---------------------------------------------------------------------------
