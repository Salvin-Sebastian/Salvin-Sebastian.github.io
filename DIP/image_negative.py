# Question 8: Image Negative
import cv2
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
negative = 255 - img

plt.subplot(1, 2, 1)
plt.imshow(img, cmap='gray')
plt.title('Original')
plt.axis('off')

plt.subplot(1, 2, 2)
plt.imshow(negative, cmap='gray')
plt.title('Negative')
plt.axis('off')

plt.show()

# Output: Original and negative images
