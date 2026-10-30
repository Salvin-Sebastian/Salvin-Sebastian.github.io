# Question 5: Separate RGB components, Convert RGB image to CMY and HSI color models
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image
img = cv2.imread("sample.jpg")

# Convert BGR to RGB
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Separate RGB channels
R = rgb[:, :, 0]
G = rgb[:, :, 1]
B = rgb[:, :, 2]

# RGB to CMY
C = 255 - R
M = 255 - G
Y = 255 - B

# RGB to HSI (HSV used in OpenCV)
hsi = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

H = hsi[:, :, 0]
S = hsi[:, :, 1]
I = hsi[:, :, 2]

# Display Images
plt.figure(figsize=(12,10))

plt.subplot(3,3,1)
plt.imshow(rgb)
plt.title("Original RGB")
plt.axis("off")

plt.subplot(3,3,2)
plt.imshow(R, cmap='gray')
plt.title("Red")
plt.axis("off")

plt.subplot(3,3,3)
plt.imshow(G, cmap='gray')
plt.title("Green")
plt.axis("off")

plt.subplot(3,3,4)
plt.imshow(B, cmap='gray')
plt.title("Blue")
plt.axis("off")

plt.subplot(3,3,5)
plt.imshow(C, cmap='gray')
plt.title("Cyan")
plt.axis("off")

plt.subplot(3,3,6)
plt.imshow(M, cmap='gray')
plt.title("Magenta")
plt.axis("off")

plt.subplot(3,3,7)
plt.imshow(Y, cmap='gray')
plt.title("Yellow")
plt.axis("off")

plt.subplot(3,3,8)
plt.imshow(H, cmap='gray')
plt.title("Hue")
plt.axis("off")

plt.subplot(3,3,9)
plt.imshow(S, cmap='gray')
plt.title("Saturation")
plt.axis("off")

plt.tight_layout()
plt.show()
