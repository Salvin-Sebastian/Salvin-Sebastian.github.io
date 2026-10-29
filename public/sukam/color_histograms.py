# Question 7: Plot color histograms for each channel
import cv2
import matplotlib.pyplot as plt

# Read image
img = cv2.imread("sample1.jpeg")

# Convert BGR to RGB
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Plot image
plt.figure(figsize=(12,5))

plt.subplot(1,2,1)
plt.imshow(img_rgb)
plt.title("Original Image")
plt.axis("off")

# Plot RGB Histograms
plt.subplot(1,2,2)

colors = ('r', 'g', 'b')
for i, color in enumerate(colors):
    hist = cv2.calcHist([img_rgb], [i], None, [256], [0,256])
    plt.plot(hist, color=color)

plt.title("RGB Color Histogram")
plt.xlabel("Pixel Intensity (0-255)")
plt.ylabel("Number of Pixels")

plt.tight_layout()
plt.show()
