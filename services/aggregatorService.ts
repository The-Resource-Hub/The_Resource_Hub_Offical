
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

  switch (provider.toLowerCase()) {
    case 'openrouter':
      url = "https://openrouter.ai/api/v1/chat/completions";
      break;
    case 'groq':
      url = "https://api.groq.com/openai/v1/chat/completions";
      break;
    case 'mistral ai':
      url = "https://api.mistral.ai/v1/chat/completions";
      break;
    default:
      return { text: `Aggregator ${provider} not supported yet.`, error: true };
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
    if (data.error) throw new Error(data.error.message || "Aggregator Error");
    
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
