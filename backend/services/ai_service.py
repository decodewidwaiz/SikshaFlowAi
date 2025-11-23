import google.generativeai as genai
from config.config import GEMINI_API_KEY
import json

# Initialize Gemini client
try:
    genai.configure(api_key=GEMINI_API_KEY)
    gemini_available = True
    print("Gemini API configured successfully")
except Exception as e:
    print(f"Gemini not configured: {e}")
    gemini_available = False


def generate_lecture(prompt):
    """Generates structured lecture JSON from prompt using Gemini."""
    if not gemini_available:
        print("Gemini not available, returning fallback content")
        return '''{
    "slides":[
        {
            "title":"Introduction to Photosynthesis",
            "content":["Photosynthesis converts light energy to chemical energy","It occurs in chloroplasts of plant cells","It produces glucose and oxygen"],
            "script":"Photosynthesis converts light to chemical energy in plant chloroplasts, producing glucose and oxygen."
        }
    ],
    "quiz":[
        {
            "question":"Where does photosynthesis occur?",
            "options":["Mitochondria","Chloroplasts","Nucleus","Cell membrane"],
            "answer":"Chloroplasts"
        }
    ]
}'''

    try:
        system_prompt = """You are an educational content generator. 
Given a topic, target audience, and duration, produce structured lecture content.

Requirements:
1. Create detailed slide outlines with title, content bullets, and a CONCISE narration script (approximately 10-15 seconds when read aloud for faster videos)
2. Generate 3 multiple-choice quiz questions with 4 options each
3. Keep scripts SHORT and PUNCHY - focus on key points only
4. Each script should be no more than 2-3 sentences maximum

IMPORTANT: Output ONLY valid JSON with NO markdown formatting, NO code blocks, NO additional text.

JSON Structure:
{
    "slides": [
        {
            "title": "Slide Title Here",
            "content": ["Key point 1", "Key point 2", "Key point 3"],
            "script": "Concise narration script for this slide, approximately 10-15 seconds when read aloud. Keep it short and focused!"
        }
    ],
    "quiz": [
        {
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Correct Option"
        }
    ]
}

Return ONLY the JSON object, nothing else."""

        full_prompt = system_prompt + "\n\nUSER REQUEST:\n" + prompt

        # Try models in order of preference
        model = None
        preferred_models = [
            'gemini-2.5-flash-latest',  # Latest and greatest
            'gemini-2.5-flash',         # Specific version
            'gemini-1.5-flash-latest',  # Previous generation latest
            'gemini-1.5-flash',         # Previous generation specific
            'gemini-1.5-pro-latest',    # More capable but slower
            'gemini-1.5-pro',           # More capable specific version
            'gemini-pro'                # Legacy fallback
        ]
        
        for model_name in preferred_models:
            try:
                model = genai.GenerativeModel(model_name)
                # Quick test to see if model is available
                test_response = model.generate_content("Hello", generation_config=genai.GenerationConfig(temperature=0.0, max_output_tokens=10))
                print(f"Successfully initialized model: {model_name}")
                break
            except Exception as e:
                print(f"Model {model_name} not available: {str(e)[:100]}...")  # Truncate long error messages
                continue
        
        if model is None:
            print("No working model found, returning fallback content")
            return '''{"slides": [{"title":"API Error","content":["No working AI model found"],"script":"Error connecting to AI service."}], "quiz": []}'''

        # Generate content with appropriate settings for educational content
        response = model.generate_content(
            full_prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.7,      # Balanced creativity and consistency
                top_p=0.95,           # Diversity in responses
                top_k=40,             # Token diversity
                max_output_tokens=4096  # Reduced tokens for concise content
            ),
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_ONLY_HIGH"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_ONLY_HIGH"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_ONLY_HIGH"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_ONLY_HIGH"
                }
            ]
        )

        # Extract text from response
        response_text = response.text.strip()
        
        # Clean up response - remove markdown code blocks if present
        if response_text.startswith('```json'):
            response_text = response_text[7:]  # Remove ```json
        elif response_text.startswith('```'):
            response_text = response_text[3:]  # Remove ```
        
        if response_text.endswith('```'):
            response_text = response_text[:-3]  # Remove trailing ```
        
        response_text = response_text.strip()
        
        # Validate JSON
        try:
            parsed = json.loads(response_text)
            # Ensure required keys exist
            if 'slides' not in parsed or 'quiz' not in parsed:
                raise ValueError("Response missing 'slides' or 'quiz' keys")
            print(f"Successfully generated lecture with {len(parsed['slides'])} slides and {len(parsed['quiz'])} quiz questions")
            return response_text
        except json.JSONDecodeError as je:
            print(f"JSON parsing error: {je}")
            print(f"Response text (first 500 chars): {response_text[:500]}...")  # Print first 500 chars
            # Return fallback content
            return '''{"slides": [{"title":"Content Generation Error","content":["Unable to parse AI response"],"script":"Error generating content."}], "quiz": []}'''

    except Exception as e:
        print(f"Error generating lecture: {e}")
        import traceback
        traceback.print_exc()
        return '''{"slides": [{"title":"Error","content":["Error during content generation"],"script":"Please try again."}], "quiz": []}'''