# Question 21: Frequency-Domain Filters
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
rows, cols = img.shape
crow, ccol = rows // 2, cols // 2

# Distance from center
y, x = np.ogrid[:rows, :cols]
mask_lp = np.uint8(np.sqrt((x - ccol)**2 + (y - crow)**2) <= 30)
mask_hp = 1 - mask_lp

fshift = np.fft.fftshift(np.fft.fft2(img))
low_pass = np.abs(np.fft.ifft2(np.fft.ifftshift(fshift * mask_lp)))
high_pass = np.abs(np.fft.ifft2(np.fft.ifftshift(fshift * mask_hp)))

plt.subplot(1, 2, 1), plt.imshow(low_pass, cmap='gray'), plt.title('Ideal Low Pass'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(high_pass, cmap='gray'), plt.title('Ideal High Pass'), plt.axis('off')
plt.show()

# Output: Low-pass filtered (smooth) and high-pass filtered (edges) frequency-domain images
