# Question 6: Modify hue, saturation, and intensity and display the output
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image
img = cv2.imread("sample1.jpeg")

# Convert BGR to HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Modify Hue, Saturation, and Intensity(Value)
hsv[:, :, 0] = (hsv[:, :, 0] + 20) % 180      # Hue
hsv[:, :, 1] = np.clip(hsv[:, :, 1] + 50, 0, 255)  # Saturation
hsv[:, :, 2] = np.clip(hsv[:, :, 2] + 40, 0, 255)  # Intensity/Value

# Convert back to BGR
output = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# Convert BGR to RGB for displaying with matplotlib
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
output_rgb = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)

# Display images
plt.figure(figsize=(10, 5))

plt.subplot(1, 2, 1)
plt.imshow(img_rgb)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1, 2, 2)
plt.imshow(output_rgb)
plt.title("Modified HSV Image")
plt.axis("off")

plt.show()
