# Question 14: Apply Histogram Matching (Specification) with a Reference Image
import cv2
import matplotlib.pyplot as plt
from skimage.exposure import match_histograms
# Read source image
source = cv2.imread("image.jpeg", cv2.IMREAD_GRAYSCALE)
# Read reference image
reference = cv2.imread("image1.jpg", cv2.IMREAD_GRAYSCALE)
# Perform histogram matching
matched = match_histograms(source, reference)
# Convert to uint8
matched = matched.astype("uint8")
# Display images
plt.figure(figsize=(12, 8))
plt.subplot(2, 3, 1)
plt.imshow(source, cmap="gray")
plt.title("Source Image")
plt.axis("off")
plt.subplot(2, 3, 2)
plt.imshow(reference, cmap="gray")
plt.title("Reference Image")
plt.axis("off")
plt.subplot(2, 3, 3)
plt.imshow(matched, cmap="gray")
plt.title("Matched Image")
plt.axis("off")
# Source histogram
plt.subplot(2, 3, 4)
plt.hist(source.ravel(), 256, [0, 256])
plt.title("Source Histogram")
# Reference histogram
plt.subplot(2, 3, 5)
plt.hist(reference.ravel(), 256, [0, 256])
plt.title("Reference Histogram")
# Matched histogram
plt.subplot(2, 3, 6)
plt.hist(matched.ravel(), 256, [0, 256])
plt.title("Matched Histogram")
plt.tight_layout()
plt.show()
