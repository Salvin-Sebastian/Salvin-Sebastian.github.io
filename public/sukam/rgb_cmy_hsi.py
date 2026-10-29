# Question 5: RGB, CMY, and HSI Color Models
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg')
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) / 255.0
r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]

# CMY conversion
cmy = 1.0 - rgb

# HSI conversion
i = (r + g + b) / 3.0
num = 0.5 * ((r - g) + (r - b))
den = np.sqrt((r - g)**2 + (r - b) * (g - b)) + 1e-6
theta = np.arccos(np.clip(num / den, -1.0, 1.0))
h = np.where(b > g, 2 * np.pi - theta, theta) / (2 * np.pi)
s = 1.0 - (3.0 / (r + g + b + 1e-6)) * np.minimum(np.minimum(r, g), b)
hsi = np.stack([h, s, i], axis=-1)

plt.subplot(1, 3, 1), plt.imshow(rgb), plt.title('RGB'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(cmy), plt.title('CMY'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(hsi), plt.title('HSI'), plt.axis('off')
plt.show()

# Output: Original RGB, converted CMY, and true HSI color images
