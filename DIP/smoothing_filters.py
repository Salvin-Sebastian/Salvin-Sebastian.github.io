# Question 16: Smoothing Filters
import cv2
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
mean_blur = cv2.blur(img, (5, 5))
gaussian_blur = cv2.GaussianBlur(img, (5, 5), 0)

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(mean_blur, cmap='gray'), plt.title('Mean Filter'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(gaussian_blur, cmap='gray'), plt.title('Gaussian Filter'), plt.axis('off')
plt.show()

# Output: Original, mean blurred, and Gaussian blurred smoothed images
