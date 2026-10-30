# Question 8: Image negative transformation
import cv2
import matplotlib.pyplot as plt

# Read image
img = cv2.imread("sample2.jpeg")

# Convert BGR to RGB
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Negative transformation
negative = 255 - img_rgb

# Display images
plt.figure(figsize=(10,5))

plt.subplot(1,2,1)
plt.imshow(img_rgb)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,2,2)
plt.imshow(negative)
plt.title("Negative Image")
plt.axis("off")

plt.show()
