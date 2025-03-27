import { GoogleGenerativeAI } from "@google/generative-ai"

// Load API Key securely
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// POST handler
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Convert messages to prompt text
    const prompt = messages.map((msg: any) => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n")

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return new Response(
      JSON.stringify({ message: text }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Gemini Error:", err)
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    })
  }
}

