# Question 3: Spatial and Intensity Resolution
import cv2
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
low_spatial = cv2.resize(cv2.resize(img, (64, 64)), (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)
low_intensity = (img // 128) * 128

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original (8-bit)'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(low_spatial, cmap='gray'), plt.title('Low Spatial (64x64)'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(low_intensity, cmap='gray'), plt.title('Low Intensity (1-bit)'), plt.axis('off')
plt.show()

# Output: Compares spatial resolution reduction with intensity resolution reduction
