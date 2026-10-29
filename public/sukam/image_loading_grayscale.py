# Question 1: Image Loading and Grayscale Conversion
import cv2
import matplotlib.pyplot as plt

color = cv2.imread('image.jpg')
rgb = cv2.cvtColor(color, cv2.COLOR_BGR2RGB)
gray = cv2.cvtColor(color, cv2.COLOR_BGR2GRAY)

plt.subplot(1, 2, 1)
plt.imshow(rgb)
plt.title('Color')
plt.axis('off')

plt.subplot(1, 2, 2)
plt.imshow(gray, cmap='gray')
plt.title('Grayscale')
plt.axis('off')

plt.show()

# Output: Displays original color and converted grayscale images
