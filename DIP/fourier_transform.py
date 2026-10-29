# Question 20: 2D Fourier Transform and Inverse DFT
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
f = np.fft.fft2(img)
fshift = np.fft.fftshift(f)
magnitude_spectrum = 20 * np.log(np.abs(fshift) + 1)

# Inverse DFT
inv_shift = np.fft.ifftshift(fshift)
reconstructed = np.abs(np.fft.ifft2(inv_shift))

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(magnitude_spectrum, cmap='gray'), plt.title('Magnitude Spectrum'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(reconstructed, cmap='gray'), plt.title('Reconstructed'), plt.axis('off')
plt.show()

# Output: Original image, centered magnitude spectrum, and reconstructed image via IDFT
