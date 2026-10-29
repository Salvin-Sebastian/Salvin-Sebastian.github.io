# Question 18: Perform unsharp masking and high-boost filtering
import cv2
import matplotlib.pyplot as plt

# Read the image
image = cv2.imread("sample.jpeg")   # Replace with your image path

# Convert BGR to RGB
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# -----------------------------
# Unsharp Masking
# -----------------------------
blur = cv2.GaussianBlur(image_rgb, (5,5), 0)
unsharp = cv2.addWeighted(image_rgb, 1.5, blur, -0.5, 0)

# -----------------------------
# High-Boost Filtering
# -----------------------------
A = 2.0  # High-boost factor (A > 1)

high_boost = cv2.addWeighted(image_rgb, A, blur, -(A-1), 0)

# -----------------------------
# Display Results
# -----------------------------
plt.figure(figsize=(15,5))

plt.subplot(1,3,1)
plt.imshow(image_rgb)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,3,2)
plt.imshow(unsharp)
plt.title("Unsharp Masking")
plt.axis("off")

plt.subplot(1,3,3)
plt.imshow(high_boost)
plt.title("High-Boost Filter")
plt.axis("off")

plt.tight_layout()
plt.show()
