# Question 21: Apply low-pass and high-pass filters in frequency domain
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image in grayscale
img = cv2.imread("sample.jpg", 0)

# Fourier Transform
f = np.fft.fft2(img)
fshift = np.fft.fftshift(f)

rows, cols = img.shape
crow, ccol = rows // 2, cols // 2

# Create Low-Pass and High-Pass masks
mask_low = np.zeros((rows, cols), np.uint8)
mask_high = np.ones((rows, cols), np.uint8)

r = 30  # Radius

# Circular masks
Y, X = np.ogrid[:rows, :cols]
distance = (X - ccol) ** 2 + (Y - crow) ** 2

mask_low[distance <= r**2] = 1
mask_high[distance <= r**2] = 0

# Apply filters
low_pass = fshift * mask_low
high_pass = fshift * mask_high

# Inverse Fourier Transform
low_img = np.fft.ifft2(np.fft.ifftshift(low_pass))
high_img = np.fft.ifft2(np.fft.ifftshift(high_pass))

# Magnitude
low_img = np.abs(low_img)
high_img = np.abs(high_img)

# Display images
plt.figure(figsize=(15,5))

plt.subplot(1,3,1)
plt.imshow(img, cmap='gray')
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,3,2)
plt.imshow(low_img, cmap='gray')
plt.title("Low-Pass Filter")
plt.axis("off")

plt.subplot(1,3,3)
plt.imshow(high_img, cmap='gray')
plt.title("High-Pass Filter")
plt.axis("off")

plt.tight_layout()
plt.show()
