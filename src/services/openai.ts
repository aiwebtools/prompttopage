
import { toast } from "sonner";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface GeneratedContent {
  title: string;
  subtitle: string;
  description: string;
  callToAction: string;
  features: {
    title: string;
    description: string;
  }[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  disclaimer: string;
}

const OPENAI_API_KEY = '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';

export const generateContent = async (prompt: string): Promise<GeneratedContent> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert at creating compelling landing page content for AI products. 
            Based on the user's prompt about their AI product, generate JSON content for a landing page with the following structure:
            {
              "title": "Main title for the product (max 5 words)",
              "subtitle": "A subtitle that complements the main title (max 5 words)",
              "description": "A compelling description of the product (2-3 sentences)",
              "callToAction": "Primary call-to-action text (4-6 words)",
              "features": [
                {
                  "title": "Feature name",
                  "description": "Brief explanation of the feature (1-2 sentences)"
                },
                // Include 6 features total
              ],
              "faqs": [
                {
                  "question": "Frequently asked question?",
                  "answer": "Answer to the question (2-3 sentences)"
                },
                // Include 5 FAQs total
              ],
              "testimonials": [
                {
                  "name": "Full Name",
                  "role": "Job Title, Company",
                  "content": "Positive testimonial quote (1-2 sentences)",
                  "rating": 5
                },
                // Include 3 testimonials total
              ],
              "disclaimer": "A legal disclaimer for the AI product (3-4 sentences)"
            }
            
            Make the content compelling, professional, and optimized for conversion. Use tech-forward, innovative language.
            For testimonials, create realistic but fictional names, companies, and quotes.
            For the disclaimer, include standard legal protection language related to the AI product.
            The response should be valid JSON that can be parsed directly.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const contentString = data.choices[0].message.content;
    
    // Extract JSON from the response
    let contentJson;
    try {
      contentJson = JSON.parse(contentString);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = contentString.match(/```json\n([\s\S]*)\n```/) || 
                        contentString.match(/```\n([\s\S]*)\n```/);
      
      if (jsonMatch && jsonMatch[1]) {
        contentJson = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Failed to parse response as JSON');
      }
    }

    return contentJson as GeneratedContent;
  } catch (error) {
    console.error('Error generating content:', error);
    toast.error("Failed to generate content. Please try again.");
    throw error;
  }
};
