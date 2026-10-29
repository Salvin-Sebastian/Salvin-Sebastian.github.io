# Question 23: Basic morphological operations: dilation, erosion, opening, and closing
import cv2
import matplotlib.pyplot as plt

# Read image in grayscale
img = cv2.imread("sample.jpeg", 0)

# Convert to binary image
_, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

# Structuring Elements
rect = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5))
cross = cv2.getStructuringElement(cv2.MORPH_CROSS, (5,5))

# Dilation
dilation = cv2.dilate(binary, rect, iterations=1)

# Erosion
erosion = cv2.erode(binary, rect, iterations=1)

# Opening (Erosion followed by Dilation)
opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, ellipse)

# Closing (Dilation followed by Erosion)
closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, cross)

# Display results
plt.figure(figsize=(15,8))

plt.subplot(2,3,1)
plt.imshow(binary, cmap='gray')
plt.title("Original Binary")
plt.axis("off")

plt.subplot(2,3,2)
plt.imshow(dilation, cmap='gray')
plt.title("Dilation")
plt.axis("off")

plt.subplot(2,3,3)
plt.imshow(erosion, cmap='gray')
plt.title("Erosion")
plt.axis("off")

plt.subplot(2,3,4)
plt.imshow(opening, cmap='gray')
plt.title("Opening")
plt.axis("off")

plt.subplot(2,3,5)
plt.imshow(closing, cmap='gray')
plt.title("Closing")
plt.axis("off")

plt.tight_layout()
plt.show()
