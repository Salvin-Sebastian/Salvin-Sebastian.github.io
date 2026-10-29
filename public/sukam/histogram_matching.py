# Question 14: Histogram Matching
import cv2
import numpy as np
import matplotlib.pyplot as plt

src = cv2.imread('image.jpg', 0)
ref = cv2.imread('reference.jpg', 0)

# Compute cumulative distribution functions (CDFs)
s_cdf = np.cumsum(np.histogram(src, 256, [0, 256])[0]) / src.size
r_cdf = np.cumsum(np.histogram(ref, 256, [0, 256])[0]) / ref.size

# Map source intensities to reference intensities
lut = np.array([np.argmin(np.abs(s_cdf[i] - r_cdf)) for i in range(256)], dtype=np.uint8)
matched = lut[src]

plt.subplot(1, 3, 1), plt.imshow(src, cmap='gray'), plt.title('Source'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(ref, cmap='gray'), plt.title('Reference'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(matched, cmap='gray'), plt.title('Matched'), plt.axis('off')
plt.show()

# Output: Source image matched to the histogram of reference image
