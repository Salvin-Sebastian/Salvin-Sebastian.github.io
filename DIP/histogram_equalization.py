# Question 12: Histogram Equalization
import cv2
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
equalized = cv2.equalizeHist(img)

plt.subplot(1, 2, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(equalized, cmap='gray'), plt.title('Equalized'), plt.axis('off')
plt.show()

# Output: Original and histogram equalized grayscale images
