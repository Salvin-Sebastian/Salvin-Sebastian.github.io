# Question 22: Demonstrate properties of DFT (translation, scaling)
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image in grayscale
img = cv2.imread("sample.jpg", 0)

# ----------------------------
# Translation Property
# ----------------------------
rows, cols = img.shape

# Shift image by (50, 30)
M = np.float32([[1, 0, 50],
                [0, 1, 30]])
translated = cv2.warpAffine(img, M, (cols, rows))

# ----------------------------
# Scaling Property
# ----------------------------
scaled = cv2.resize(img, None, fx=1.5, fy=1.5)

# ----------------------------
# DFT Magnitude Spectrum Function
# ----------------------------
def magnitude_spectrum(image):
    dft = np.fft.fft2(image)
    dft_shift = np.fft.fftshift(dft)
    spectrum = np.log(np.abs(dft_shift) + 1)
    return spectrum

# Compute spectra
original_spectrum = magnitude_spectrum(img)
translated_spectrum = magnitude_spectrum(translated)
scaled_spectrum = magnitude_spectrum(scaled)

# ----------------------------
# Display Images
# ----------------------------
plt.figure(figsize=(15,8))

plt.subplot(2,3,1)
plt.imshow(img, cmap='gray')
plt.title("Original Image")
plt.axis("off")

plt.subplot(2,3,2)
plt.imshow(translated, cmap='gray')
plt.title("Translated Image")
plt.axis("off")

plt.subplot(2,3,3)
plt.imshow(scaled, cmap='gray')
plt.title("Scaled Image")
plt.axis("off")

plt.subplot(2,3,4)
plt.imshow(original_spectrum, cmap='gray')
plt.title("Original DFT")
plt.axis("off")

plt.subplot(2,3,5)
plt.imshow(translated_spectrum, cmap='gray')
plt.title("Translated DFT")
plt.axis("off")

plt.subplot(2,3,6)
plt.imshow(scaled_spectrum, cmap='gray')
plt.title("Scaled DFT")
plt.axis("off")

plt.tight_layout()
plt.show()
