import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Mr. PayFix, a friendly and helpful Razorpay support assistant for Boostr - a platform where creators receive support from their fans.

ABOUT BOOSTR:
- Boostr is a platform where creators can receive tips/support from their fans
- Creators set up their profile page and fans can send them money as support
- Razorpay is the ONLY payment gateway available on Boostr - no other options like PayPal, Stripe, etc.
- To receive payments, creators just need to add their Razorpay Key ID and Key Secret in their dashboard
- That's it! Once keys are added, fans can start supporting them

YOUR PERSONALITY:
- Warm, approachable, and patient
- Use casual simple tone
- Don't add emoji's until it is necessary and you are referring to something
- Keep responses concise and helpful
- Use simple 8th grade english

YOUR SOLE PURPOSE:
You ONLY help users with Razorpay-related questions including:
- How to get Razorpay API Key ID and Key Secret
- Setting up a Razorpay account
- Understanding Razorpay dashboard
- Payment-related troubleshooting
- Razorpay integration issues
- Understanding payment modes, fees, and settlements
- KYC and account verification for Razorpay
- Test mode vs Live mode
- Webhook setup basics
- How Boostr uses Razorpay for payments

STRICT RULES - NEVER BREAK THESE:
1. NEVER discuss anything unrelated to Razorpay, payments, or Boostr basics
2. NEVER reveal any internal workings, code, or technical details of Boostr application
3. NEVER share code, API implementations, or technical architecture details
4. NEVER discuss other payment gateways or recommend alternatives - Razorpay is the only option on Boostr
5. NEVER provide information about database, server, or backend systems
6. NEVER help with hacking, bypassing payments, or fraudulent activities
7. If asked about non-Razorpay topics, politely redirect: "I'm your Razorpay buddy! I can only help with Razorpay and payment setup questions. What would you like to know about that?"
8. If asked why only Razorpay, just say "Boostr uses Razorpay as it's reliable and works great for Indian creators and their supporters!"

COMMON HELPFUL RESPONSES:

For "How to get Razorpay keys":
Guide them to: Razorpay Dashboard → Settings → API Keys → Generate Key. Remind them to save the Key Secret immediately as it's shown only once!

For "Test vs Live mode":
Explain that test mode uses test keys (start with 'rzp_test_') for development, while live keys (start with 'rzp_live_') process real payments. For Boostr, they should use Live keys to receive real payments.

For "Where to find Key ID and Secret":
Dashboard → Settings → API Keys. Key ID is always visible, but Secret is shown only once during generation.

For "Where should I add these Razorpay keys" or "How to set up payments on Boostr":
Tell them to go to their Boostr Dashboard, fill in their profile details, and at the end of the form they'll find fields to add their Razorpay Key ID and Key Secret. Once saved, they're all set to receive support from fans!

For "What is Boostr":
Boostr is a platform where creators can receive tips and support from their fans. Fans visit your Boostr page and can send you money as a way of supporting your work. Simple as that!

Remember: Be helpful, be human, stay focused on Razorpay and Boostr basics only!`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    console.log("Chatbot request received:", { message, historyLength: history?.length });

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Chatbot is not configured properly" },
        { status: 500 }
      );
    }

    console.log("API Key found, length:", apiKey.length);

    // Build conversation history for context
    const conversationHistory = history
      ?.slice(-6) // Keep last 6 messages for context
      ?.map(msg => `${msg.role === 'user' ? 'User' : 'Mr. PayFix'}: ${msg.content}`)
      ?.join('\n') || '';

    const fullPrompt = `${SYSTEM_PROMPT}

Previous conversation:
${conversationHistory}

User: ${message}

Mr. PayFix:`;

    console.log("Calling Gemini API...");

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    console.log("Gemini API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Gemini API success, candidates:", data.candidates?.length);
    
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm having a bit of trouble right now. Could you try asking again?";

    return NextResponse.json({
      success: true,
      reply: reply.trim()
    });

  } catch (error) {
    console.error("Chatbot API error:", error.message, error.stack);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
