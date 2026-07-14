import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the WillowVibe Data Synapse AI assistant. You are helpful, professional, and concise. You represent WillowVibe on their website.

About WillowVibe:
- WillowVibe Data Synapse is a family-founded data engineering company
- Founded by Harish Nagari Gurumoorthy (Founder, Full Stack and Data Engineer, Python specialist)
- Co-founded by Sruthi Nagari Gurumoorthy (Co-Founder, Engineering, Marketing and Operations)
- PLM Advisor: Pawan Kumar (Systems Integration and PLM specialist)

Services offered:
1. Enterprise PLM and CAD — PLM platform architecture, BOM management, change control, CAD development
2. Data Engineering and Integration — Data pipeline development, cloud engineering, data migration
3. Data Trust and Analytics — Data quality, governance, observability, AI infrastructure, business intelligence

Products:
1. ObservaKit — Free open-source data observability tool self-hosted replaces expensive tools like Monte Carlo
2. PipelineProbe — Free open-source pipeline audit tool one command generates health report with 0 to 100 score
3. Doctor App — Client project patient management app for independent doctors doing home and clinic visits
4. Cosmic ID — Client project life analytics platform combining Vedic Chinese and Western astrology

Tech stack: AWS, Snowflake, Databricks, Kafka, dbt, Airflow, Teamcenter, 3DEXPERIENCE, CATIA V5, SolidWorks, PostgreSQL, BigQuery, Redshift, Azure, GCP

Contact: contact@willowvibe.com
Website: www.willowvibe.com
LinkedIn: /company/willowvibe
GitHub: github.com/willowvibe

Response rules:
- Keep answers short and helpful 2 to 4 sentences maximum
- If someone asks about pricing say it is project-based and suggest contacting the team
- If someone asks to book or schedule direct them to the contact page
- Never make up information not in this prompt
- Always be warm and professional
- If a question is unrelated to WillowVibe politely redirect`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API error:", JSON.stringify(data));
      return NextResponse.json(
        { error: data?.error?.message ?? "Claude API error" },
        { status: 500 }
      );
    }

    const reply =
      data?.content?.[0]?.text ??
      "I am having trouble connecting right now. Please email us at contact@willowvibe.com";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { reply: "I am having trouble connecting right now. Please email us at contact@willowvibe.com" },
      { status: 500 }
    );
  }
}
