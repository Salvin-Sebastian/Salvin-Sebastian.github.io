# Question 13: Histogram Stretching
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
stretched = np.uint8((img - img.min()) * (255.0 / (img.max() - img.min())))

plt.subplot(1, 2, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(stretched, cmap='gray'), plt.title('Stretched'), plt.axis('off')
plt.show()

# Output: Original and min-max histogram stretched images
