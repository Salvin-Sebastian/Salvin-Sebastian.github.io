# Question 16: Apply smoothing filters (mean, Gaussian)
import cv2
import matplotlib.pyplot as plt

# Read the image
image = cv2.imread("sample.jpeg")  # Replace with your image path

# Convert BGR to RGB (for displaying with matplotlib)
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# -----------------------------
# Mean (Average) Filter
# -----------------------------
mean_filtered = cv2.blur(image_rgb, (5, 5))
# or
# mean_filtered = cv2.boxFilter(image_rgb, -1, (5,5))

# -----------------------------
# Gaussian Filter
# -----------------------------
gaussian_filtered = cv2.GaussianBlur(image_rgb, (5, 5), 0)

# -----------------------------
# Display Results
# -----------------------------
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.imshow(image_rgb)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1, 3, 2)
plt.imshow(mean_filtered)
plt.title("Mean Filter")
plt.axis("off")

plt.subplot(1, 3, 3)
plt.imshow(gaussian_filtered)
plt.title("Gaussian Filter")
plt.axis("off")

plt.tight_layout()
plt.show()
