# Question 2: Simulate image sampling and quantization by reducing resolution and gray levels
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image as grayscale
img = cv2.imread("sample.jpeg", cv2.IMREAD_GRAYSCALE)

# Check if image was loaded
if img is None:
    print("Error: Could not load sample.jpeg")
else:
    # Sampling: resize image to 100 x 100
    sampled_img = cv2.resize(img, (100, 100))

    # Quantization: reduce gray levels
    quantized_img = (img // 16) * 16

    # Display images
    plt.figure(figsize=(12, 4))

    # Original image
    plt.subplot(1, 3, 1)
    plt.imshow(img, cmap="gray")
    plt.title("Original Image")
    plt.axis("off")

    # Sampled image
    plt.subplot(1, 3, 2)
    plt.imshow(sampled_img, cmap="gray")
    plt.title("Sampled Image")
    plt.axis("off")

    # Quantized image
    plt.subplot(1, 3, 3)
    plt.imshow(quantized_img, cmap="gray")
    plt.title("Quantized Image")
    plt.axis("off")

    plt.show()
