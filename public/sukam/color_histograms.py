# Question 7: Color Histograms
import cv2
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg')
colors = ('b', 'g', 'r')

for i, col in enumerate(colors):
    hist = cv2.calcHist([img], [i], None, [256], [0, 256])
    plt.plot(hist, color=col, label=col.upper() + ' channel')

plt.title('Color Histogram')
plt.xlabel('Pixel Intensity')
plt.ylabel('Frequency')
plt.legend()
plt.show()

# Output: Plots the intensity histograms for Red, Green, and Blue channels
