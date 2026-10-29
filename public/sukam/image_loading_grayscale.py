# Question 1: Load a grayscale and color image and display, Convert a color image to grayscale
import cv2
import matplotlib.pyplot as plt

# Read the image
color_img = cv2.imread("sample.jpeg")

# Check whether the image was loaded
if color_img is None:
    print("Error: Could not load sample.jpeg")
else:
    # Convert BGR to RGB for Matplotlib
    color_rgb = cv2.cvtColor(color_img, cv2.COLOR_BGR2RGB)

    # Convert the color image to grayscale
    converted_gray = cv2.cvtColor(color_img, cv2.COLOR_BGR2GRAY)

    plt.figure(figsize=(12, 4))

    # Color image
    plt.subplot(1, 3, 1)
    plt.imshow(color_rgb)
    plt.title("Color Image")
    plt.axis("off")

    # Grayscale image using OpenCV
    plt.subplot(1, 3, 2)
    plt.imshow(converted_gray, cmap="gray")
    plt.title("Grayscale Image")
    plt.axis("off")

    # Converted grayscale
    plt.subplot(1, 3, 3)
    plt.imshow(converted_gray, cmap="gray")
    plt.title("Converted Grayscale")
    plt.axis("off")

    plt.show()
