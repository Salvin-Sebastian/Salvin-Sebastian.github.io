# Question 2: Sampling and Quantization
import cv2
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
sampled = cv2.resize(cv2.resize(img, (32, 32)), (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)
quantized = (img // 64) * 64

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(sampled, cmap='gray'), plt.title('Sampled (32x32)'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(quantized, cmap='gray'), plt.title('Quantized (4 levels)'), plt.axis('off')
plt.show()

# Output: Original, downsampled, and 4-level quantized images
