# Question 13: Implement Histogram Stretching
import cv2
import matplotlib.pyplot as plt
# Read image in grayscale
image = cv2.imread("image.jpeg", cv2.IMREAD_GRAYSCALE)
# Find minimum and maximum pixel values
min_val = image.min()
max_val = image.max()
stretched = ((image - min_val) /
             (max_val - min_val) * 255).astype("uint8")
# Display images
plt.figure(figsize=(10, 8))
plt.subplot(2, 2, 1)
plt.imshow(image, cmap="gray")
plt.title("Original Image")
plt.axis("off")
plt.subplot(2, 2, 2)
plt.imshow(stretched, cmap="gray")
plt.title("Stretched Image")
plt.axis("off")
# Original histogram
plt.subplot(2, 2, 3)
plt.hist(image.ravel(), 256, [0, 256])
plt.title("Original Histogram")
# Stretched histogram
plt.subplot(2, 2, 4)
plt.hist(stretched.ravel(), 256, [0, 256])
plt.title("Stretched Histogram")
plt.tight_layout()
plt.show()
