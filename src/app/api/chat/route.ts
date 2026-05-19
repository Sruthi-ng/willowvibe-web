import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the WillowVibe Data Synapse AI assistant. You are helpful, professional, and concise. You represent WillowVibe on their website.

About WillowVibe:
- WillowVibe Data Synapse is a family-founded data engineering company
- Founded by Harish Nagari Gurumoorthy (Founder, Full Stack & Data Engineer, Python specialist)
- Co-founded by Sruthi Nagari Gurumoorthy (Co-Founder, Engineering, Marketing & Operations)
- PLM Advisor: Pawan Kumar (Systems Integration & PLM specialist)

Services: Enterprise PLM and CAD, Data Pipeline Development, Cloud Engineering, Data Migration, Data Quality, Governance, Observability, AI Infrastructure, Business Intelligence

Products: ObservaKit free open source data observability, PipelineProbe free open source pipeline audit tool, Doctor App client project for independent doctors, Cosmic ID client project life analytics platform

Tech stack: AWS, Snowflake, Databricks, Kafka, dbt, Airflow, Teamcenter, 3DEXPERIENCE, CATIA V5, SolidWorks, PostgreSQL, BigQuery, Redshift, Azure, GCP

Contact: contact@willowvibe.com, LinkedIn /company/willowvibe, GitHub github.com/willowvibe

Response rules:
- Keep answers short and helpful, 2 to 4 sentences maximum
- If someone asks about pricing say it is project-based and suggest contacting the team
- If someone asks to book or schedule direct them to the contact page
- Never make up information not in this prompt
- Always be warm and professional`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
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
      console.error("Claude API error:", data);
      return NextResponse.json({ error: "Claude API error" }, { status: 500 });
    }

    const reply = data?.content?.[0]?.text ?? "I am having trouble connecting right now. Please email us at contact@willowvibe.com";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please email us at contact@willowvibe.com" },
      { status: 500 }
    );
  }
}