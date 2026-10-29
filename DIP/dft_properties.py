# Question 22: DFT Properties
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)

# Translation property: spatial shift leaves magnitude spectrum invariant
shifted = np.roll(np.roll(img, 50, axis=0), 50, axis=1)

# Scaling property: spatial compression broadens frequency spectrum
scaled = cv2.resize(cv2.resize(img, (img.shape[1] // 2, img.shape[0] // 2)), (img.shape[1], img.shape[0]))

mag_orig = 20 * np.log(np.abs(np.fft.fftshift(np.fft.fft2(img))) + 1)
mag_shift = 20 * np.log(np.abs(np.fft.fftshift(np.fft.fft2(shifted))) + 1)
mag_scale = 20 * np.log(np.abs(np.fft.fftshift(np.fft.fft2(scaled))) + 1)

plt.subplot(2, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(2, 3, 2), plt.imshow(shifted, cmap='gray'), plt.title('Translated'), plt.axis('off')
plt.subplot(2, 3, 3), plt.imshow(scaled, cmap='gray'), plt.title('Scaled (Compressed)'), plt.axis('off')
plt.subplot(2, 3, 4), plt.imshow(mag_orig, cmap='gray'), plt.title('Orig Spectrum'), plt.axis('off')
plt.subplot(2, 3, 5), plt.imshow(mag_shift, cmap='gray'), plt.title('Shift Spectrum'), plt.axis('off')
plt.subplot(2, 3, 6), plt.imshow(mag_scale, cmap='gray'), plt.title('Scaled Spectrum'), plt.axis('off')
plt.show()

# Output: Demonstrates DFT translation (magnitude invariance) and scaling properties
