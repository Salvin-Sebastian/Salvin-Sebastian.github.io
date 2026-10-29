# Question 20: Compute and visualize the 2D Fourier Transform of an image and Inverse DFT
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image in grayscale
image = cv2.imread("sample.jpeg", 0)

# Compute 2D Fourier Transform
dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)

# Shift zero frequency to the center
dft_shift = np.fft.fftshift(dft)

# Compute magnitude spectrum
magnitude = cv2.magnitude(dft_shift[:, :, 0],
                          dft_shift[:, :, 1])

# Convert magnitude to log scale
magnitude_spectrum = 20 * np.log(magnitude + 1)

# -----------------------------
# Inverse Fourier Transform
# -----------------------------

# Shift frequency back
dft_ishift = np.fft.ifftshift(dft_shift)

# Perform inverse DFT
reconstructed = cv2.idft(dft_ishift)

# Calculate magnitude of reconstructed image
reconstructed = cv2.magnitude(
    reconstructed[:, :, 0],
    reconstructed[:, :, 1]
)

# Normalize for display
reconstructed = cv2.normalize(
    reconstructed,
    None,
    0,
    255,
    cv2.NORM_MINMAX
)

reconstructed = np.uint8(reconstructed)

# -----------------------------
# Display
# -----------------------------

plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.imshow(image, cmap="gray")
plt.title("Original Image")
plt.axis("off")

plt.subplot(1, 3, 2)
plt.imshow(magnitude_spectrum, cmap="gray")
plt.title("Fourier Spectrum")
plt.axis("off")

plt.subplot(1, 3, 3)
plt.imshow(reconstructed, cmap="gray")
plt.title("Reconstructed Image")
plt.axis("off")

plt.tight_layout()
plt.show()
