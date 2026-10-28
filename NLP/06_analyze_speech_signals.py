# Program 06: Use Python libraries to analyze speech signals
import numpy as np
from scipy.io import wavfile

# Generate a synthetic speech-frequency sine tone (440 Hz)
rate = 16000
signal = (np.sin(2 * np.pi * 440 * np.linspace(0, 1, rate)) * 32767).astype(np.int16)
wavfile.write("sample.wav", rate, signal)

sr, data = wavfile.read("sample.wav")
data = data.astype(float)
print(f"Sampling Rate: {sr} Hz, Duration: {len(data)/sr:.1f}s")
print(f"Max Amplitude: {np.max(data)}, RMS Energy: {np.sqrt(np.mean(data**2)):.2f}")

# Output:
# Sampling Rate: 16000 Hz, Duration: 1.0s
# Max Amplitude: 32766.0, RMS Energy: 23168.42
