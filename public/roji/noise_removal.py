# Question 25: Add different types of noise (Gaussian, Salt & Pepper, etc.) and apply mean filters
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image
img = cv2.imread("sample.jpeg", 0)

# Normalize image
img_float = img.astype(np.float32) / 255.0

# -------------------------
# 1. Gaussian Noise
# -------------------------
gaussian = img_float + np.random.normal(0, 0.1, img_float.shape)
gaussian = np.clip(gaussian, 0, 1)

# -------------------------
# 2. Salt & Pepper Noise
# -------------------------
sp = img_float.copy()

salt_prob = 0.02
pepper_prob = 0.02

salt = np.random.rand(*img.shape) < salt_prob
pepper = np.random.rand(*img.shape) < pepper_prob

sp[salt] = 1
sp[pepper] = 0

# -------------------------
# 3. Rayleigh Noise
# -------------------------
rayleigh = img_float + np.random.rayleigh(0.1, img.shape)
rayleigh = np.clip(rayleigh, 0, 1)

# -------------------------
# 4. Gamma Noise
# -------------------------
gamma = img_float + np.random.gamma(2, 0.05, img.shape)
gamma = np.clip(gamma, 0, 1)

# -------------------------
# 5. Exponential Noise
# -------------------------
expo = img_float + np.random.exponential(0.05, img.shape)
expo = np.clip(expo, 0, 1)

# -------------------------
# Mean Filter
# -------------------------
def mean_filter(image):
    image = np.uint8(image * 255)
    return cv2.blur(image, (3,3))

gaussian_f = mean_filter(gaussian)
sp_f = mean_filter(sp)
rayleigh_f = mean_filter(rayleigh)
gamma_f = mean_filter(gamma)
expo_f = mean_filter(expo)

# -------------------------
# Display
# -------------------------
titles = [
    "Original",
    "Gaussian", "Gaussian + Mean",
    "Salt & Pepper", "S&P + Mean",
    "Rayleigh", "Rayleigh + Mean",
    "Gamma", "Gamma + Mean",
    "Exponential", "Exponential + Mean"
]

images = [
    img,
    np.uint8(gaussian*255), gaussian_f,
    np.uint8(sp*255), sp_f,
    np.uint8(rayleigh*255), rayleigh_f,
    np.uint8(gamma*255), gamma_f,
    np.uint8(expo*255), expo_f
]

plt.figure(figsize=(15,12))

for i in range(len(images)):
    plt.subplot(4,3,i+1)
    plt.imshow(images[i], cmap='gray')
    plt.title(titles[i])
    plt.axis("off")

plt.tight_layout()
plt.show()
