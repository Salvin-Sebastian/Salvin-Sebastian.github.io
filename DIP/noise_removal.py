# Question 25: Noise Addition and Removal
import cv2
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
img = cv2.imread('image.jpg', 0).astype(np.float32)

# Generate noise types
rand = np.random.rand(*img.shape)
sp = img.copy()
sp[rand < 0.02] = 0
sp[rand > 0.98] = 255

noises = {
    'Gaussian': img + np.random.normal(0, 25, img.shape),
    'Salt & Pepper': sp,
    'Rayleigh': img + np.random.rayleigh(20, img.shape),
    'Gamma': img + np.random.gamma(2, 10, img.shape),
    'Exponential': img + np.random.exponential(15, img.shape)
}

plt.figure(figsize=(10, 4))
for i, (name, noisy) in enumerate(noises.items()):
    noisy_img = np.uint8(np.clip(noisy, 0, 255))
    filtered = cv2.blur(noisy_img, (5, 5))
    plt.subplot(2, 5, i + 1), plt.imshow(noisy_img, cmap='gray'), plt.title(name), plt.axis('off')
    plt.subplot(2, 5, i + 6), plt.imshow(filtered, cmap='gray'), plt.title(name + ' Filtered'), plt.axis('off')

plt.tight_layout()
plt.show()

# Output: 5 noise types (Gaussian, Salt-and-Pepper, Rayleigh, Gamma, Exponential) and their mean-filtered results
