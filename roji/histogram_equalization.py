# Question 12: Perform Histogram Equalization and Compare Results
import cv2
import matplotlib.pyplot as plt
# Read the image in grayscale
image = cv2.imread("image.jpeg", cv2.IMREAD_GRAYSCALE)
# Apply histogram equalization
equalized = cv2.equalizeHist(image)
# Display original and equalized images
plt.figure(figsize=(10, 8))
plt.subplot(2, 2, 1)
plt.imshow(image, cmap="gray")
plt.title("Original Image")
plt.axis("off")
plt.subplot(2, 2, 2)
plt.imshow(equalized, cmap="gray")
plt.title("Equalized Image")
plt.axis("off")
# Original histogram
plt.subplot(2, 2, 3)
plt.hist(image.ravel(), 256, [0, 256])
plt.title("Original Histogram")
# Equalized histogram
plt.subplot(2, 2, 4)
plt.hist(equalized.ravel(), 256, [0, 256])
plt.title("Equalized Histogram")
plt.tight_layout()
plt.show()
