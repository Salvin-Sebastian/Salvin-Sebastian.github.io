# Question 9: Log Transformation
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
c = 255.0 / np.log(1.0 + float(np.max(img)))
log_img = np.uint8(c * np.log(1.0 + img.astype(np.float32)))

plt.subplot(1, 2, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(log_img, cmap='gray'), plt.title('Log Transformed'), plt.axis('off')
plt.show()

# Output: Original and log-transformed contrast-enhanced image
