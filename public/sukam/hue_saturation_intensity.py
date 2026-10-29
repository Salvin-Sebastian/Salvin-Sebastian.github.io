# Question 6: Hue, Saturation, and Intensity Modification
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32)

# Modify Hue (+30), Saturation (x1.4), Value/Brightness (x1.2)
hsv[:, :, 0] = (hsv[:, :, 0] + 30) % 180
hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.4, 0, 255)
hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.2, 0, 255)

modified = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2RGB)
orig = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

plt.subplot(1, 2, 1), plt.imshow(orig), plt.title('Original'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(modified), plt.title('Modified H-S-V'), plt.axis('off')
plt.show()

# Output: Original image and modified Hue, Saturation, and Value/Brightness image
