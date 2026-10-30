# Question 24: Hit-or-miss transformation for pattern detection
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image in grayscale
img = cv2.imread("sample.jpeg", 0)

# Convert to binary image
_, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

# Convert binary image to 0 and 1
binary = binary // 255

# Structuring element
kernel = np.array([[0, 1, 0],
                   [1, 1, 1],
                   [0, 1, 0]], dtype=np.int8)

# Hit-or-Miss Transformation
hitmiss = cv2.morphologyEx(binary.astype(np.uint8),
                           cv2.MORPH_HITMISS,
                           kernel)

# Convert back to 0–255 for display
binary = binary * 255
hitmiss = hitmiss * 255

# Display images
plt.figure(figsize=(10,5))

plt.subplot(1,2,1)
plt.imshow(binary, cmap='gray')
plt.title("Binary Image")
plt.axis("off")

plt.subplot(1,2,2)
plt.imshow(hitmiss, cmap='gray')
plt.title("Hit-or-Miss Output")
plt.axis("off")

plt.tight_layout()
plt.show()
