
export interface AggregatorOptions {
  model: string;
  provider: string;
  apiKey: string;
  type: string;
}

export async function callAggregator(prompt: string, options: AggregatorOptions) {
  const { provider, model, apiKey } = options;
  
  let url = "";
  let body: any = {
    model: model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  };

  const providerKey = provider.toLowerCase();

  if (providerKey === 'openrouter') {
    url = "https://openrouter.ai/api/v1/chat/completions";
  } else if (providerKey === 'groq') {
    url = "https://api.groq.com/openai/v1/chat/completions";
  } else if (providerKey === 'mistral ai' || providerKey === 'mistral') {
    url = "https://api.mistral.ai/v1/chat/completions";
  } else if (providerKey === 'deepseek') {
    url = "https://api.deepseek.com/v1/chat/completions";
  } else {
    // Generic OpenAI-compatible endpoint logic
    url = `https://api.${providerKey}.com/v1/chat/completions`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message || "Aggregator API Error");
    
    return {
      text: data.choices[0].message.content,
      sources: [],
      modelUsed: `${provider}/${model}`
    };
  } catch (error) {
    console.error(`Aggregator Error (${provider}):`, error);
    return { text: "", error: true };
  }
}
