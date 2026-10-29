# Question 3: Demonstrate spatial and intensity resolution differences using image resizing and quantization
import cv2
import matplotlib.pyplot as plt

# Read grayscale image
img = cv2.imread("sample.jpeg", cv2.IMREAD_GRAYSCALE)

# Check if image was loaded
if img is None:
    print("Error: Could not load sample.jpg")
else:
    # Spatial Resolution Reduction
    spatial_img = cv2.resize(img, (100, 100))

    # Intensity Resolution Reduction
    intensity_img = (img // 16) * 16

    # Display images
    plt.figure(figsize=(12, 4))

    # Original Image
    plt.subplot(1, 3, 1)
    plt.imshow(img, cmap="gray")
    plt.title("Original Image")
    plt.axis("off")

    # Low Spatial Resolution
    plt.subplot(1, 3, 2)
    plt.imshow(spatial_img, cmap="gray")
    plt.title("Low Spatial Resolution")
    plt.axis("off")

    # Low Intensity Resolution
    plt.subplot(1, 3, 3)
    plt.imshow(intensity_img, cmap="gray")
    plt.title("Low Intensity Resolution")
    plt.axis("off")

    plt.show()
