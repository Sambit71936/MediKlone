import streamlit as st
import openai

# --- CONFIGURATION ---
openai.api_key = st.secrets["OPENAI_API_KEY"] if "OPENAI_API_KEY" in st.secrets else "sk-..."

# --- UI INPUT ---
st.title("AI-based App Flow Feedback System")
st.write("Paste logs, user interactions, or screen flow descriptions below:")

input_data = st.text_area("App Flow Input", height=200)
analyze_btn = st.button("Analyze Flow")

# --- AI PROMPT ---
def build_prompt(data):
    return f"""
You are an expert UX reviewer. Analyze the following app flow data and summarize any defects or issues in user experience.
For each issue, provide:
- Short summary
- Defect location (if applicable)
- Suggested fix
- Priority label (Immediate, Soon, Low Priority)

App Flow Data:
{data}
"""

# --- AI CALL ---
def get_feedback(data):
    prompt = build_prompt(data)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Or another model
        messages=[{"role": "user", "content": prompt}],
        max_tokens=512,
        temperature=0.3,
    )
    return response.choices[0].message.content

# --- DISPLAY FEEDBACK ---
if analyze_btn and input_data.strip():
    with st.spinner("Analyzing..."):
        feedback = get_feedback(input_data)
        st.subheader("AI Feedback Summary")
        st.markdown(feedback)

# --- EXTENSIBILITY ---
# To support more feedback types:
# - Add more fields to the prompt (e.g., accessibility, performance)
# - Parse and structure AI output for richer UI (tables, tags)
# - Integrate with other models/APIs for specialized checks

# --- GITHUB ACTIONS INTEGRATION ---
# To automate feedback in CI:
# - Create a GitHub Action that runs this script on PRs
# - Save feedback to a file or post as a PR comment
# - Use GitHub's workflow triggers and secrets for API keys

# Example: See https://docs.github.com/en/actions for workflow setup
