# Question 9: Apply log transformation and analyze contrast enhancement
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image in grayscale
img = cv2.imread("sample2.jpeg", 0)

# Convert to float
img_float = img.astype(np.float32)

# Log Transformation
c = 255 / np.log(1 + np.max(img_float))
log_img = c * np.log(1 + img_float)

# Convert back to uint8
log_img = np.uint8(log_img)

# Display
plt.figure(figsize=(10,5))

plt.subplot(1,2,1)
plt.imshow(img, cmap='gray')
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,2,2)
plt.imshow(log_img, cmap='gray')
plt.title("Log Transformed Image")
plt.axis("off")

plt.show()
