import pyttsx3

engine = pyttsx3.init()

def speak_text(text: str):
    engine.save_to_file(text, "response.mp3")
    engine.runAndWait()
    return "response.mp3"
