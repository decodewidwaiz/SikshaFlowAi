from gtts import gTTS
import os

def generate_voiceover(script_text, path):
    tts = gTTS(text=script_text, lang='en', slow=False)
    tts.save(path)
    return path

def combine_audio(audio_paths, output_path):
    """
    Combine multiple audio files into one.
    Simple concatenation approach for MP3 files.
    """
    if not audio_paths:
        raise ValueError("No audio paths provided")
    
    with open(output_path, 'wb') as output_file:
        for i, path in enumerate(audio_paths):
            if not os.path.exists(path):
                raise FileNotFoundError(f"Audio file not found: {path}")
            
            with open(path, 'rb') as input_file:
                data = input_file.read()
                # For MP3 files, we can simply concatenate them
                # This works for files with the same encoding and sample rate
                output_file.write(data)
    
    return output_path