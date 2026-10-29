# Question 10: Power-law (gamma) transformation for different gamma values
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image
img = cv2.imread("sample.jpeg")

# Convert BGR to RGB
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Normalize image to range [0,1]
img_norm = img / 255.0

# Different gamma values
gamma_values = [0.5, 1.0, 2.0]

plt.figure(figsize=(15,5))

# Original image
plt.subplot(1,4,1)
plt.imshow(img)
plt.title("Original")
plt.axis("off")

# Apply gamma correction
for i, gamma in enumerate(gamma_values):
    gamma_img = np.power(img_norm, gamma) #Apply Power Law (Output=Input^γ)
    gamma_img = np.uint8(gamma_img * 255) #Convert Back to 0–255 Range

#Displays each transformed image.
    plt.subplot(1,4,i+2)
    plt.imshow(gamma_img)
    plt.title(f"Gamma = {gamma}")
    plt.axis("off")
#Prevents titles and images from overlapping.
plt.tight_layout()
plt.show()
