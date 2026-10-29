# Digital Image Processing (DIP) Practical Programs

BCA Semester Practical Examination - 25 Short & Simple Python Programs.

> **PDF Manual Available:** See [DIP_Practical_Questions_and_Code.pdf](file:///c:/Users/Salvin/Desktop/DIP/DIP_Practical_Questions_and_Code.pdf) for a complete printable manual containing all 25 questions, objectives, code, and expected outputs. Re-generate at any time by running `python generate_pdf.py`.

## Requirements & Installation

### Option 1: 1-Click Setup (Windows)
Double-click [`setup.bat`](file:///c:/Users/Salvin/Desktop/DIP/setup.bat) or run:
```cmd
setup.bat
```

### Option 2: Using pip
Install dependencies using pip:
```bash
pip install -r requirements.txt
```

Verify your installation:
```bash
python -c "import cv2, numpy, matplotlib; print('DIP Environment Ready!')"
```

## Common Input Images

- `image.jpg`: The primary common input image (color photograph) used across practical programs.
- `reference.jpg`: The reference image used for histogram matching (Program 14).

**To replace input images:**
Place any desired JPEG image named `image.jpg` or `reference.jpg` in the project root directory.

## List of 25 Practical Programs

| Q# | Program Title | Filename | Expected Output Description |
|---|---|---|---|
| 1 | Image Loading and Grayscale Conversion | `image_loading_grayscale.py` | Color and converted grayscale images |
| 2 | Sampling and Quantization | `sampling_quantization.py` | Original, downsampled (32x32), and 4-level quantized images |
| 3 | Spatial and Intensity Resolution | `spatial_intensity_resolution.py` | Original, low spatial resolution, and 1-bit intensity resolution |
| 4 | Adjacency and Connectivity | `adjacency_connectivity.py` | Component count: 4-connected (5) vs 8-connected (1) |
| 5 | RGB, CMY, and HSI Color Models | `rgb_cmy_hsi.py` | Original RGB, converted CMY, and true HSI color images |
| 6 | Hue, Saturation, and Intensity Modification | `hue_saturation_intensity.py` | Original vs modified Hue, Saturation, and Value/Brightness |
| 7 | Color Histograms | `color_histograms.py` | Intensity frequency curves for Red, Green, and Blue channels |
| 8 | Image Negative | `image_negative.py` | Original and inverted (negative: s = 255 - r) image |
| 9 | Log Transformation | `log_transformation.py` | Original and log-transformed dynamic range enhanced image |
| 10 | Gamma Transformation | `gamma_transformation.py` | Original vs power-law transformed (gamma = 0.5 and 2.0) images |
| 11 | Piecewise Linear Transformations | `piecewise_linear_transformation.py` | Original, contrast-stretched, and binary thresholded images |
| 12 | Histogram Equalization | `histogram_equalization.py` | Original and histogram-equalized grayscale image |
| 13 | Histogram Stretching | `histogram_stretching.py` | Original and min-max stretched contrast-enhanced image |
| 14 | Histogram Matching | `histogram_matching.py` | Source image matched to reference image histogram |
| 15 | Spatial Correlation and Convolution | `correlation_convolution.py` | Correlation vs convolution using a 180° flipped kernel |
| 16 | Smoothing Filters | `smoothing_filters.py` | Original, mean blurred, and Gaussian blurred images |
| 17 | Laplacian Sharpening | `laplacian_sharpening.py` | Original, Laplacian edge response, and sharpened image |
| 18 | Unsharp Masking and High-Boost Filtering | `unsharp_highboost.py` | Original, unsharp masked (k=1), and high-boost (k=2) images |
| 19 | Sobel and Prewitt Edge Detection | `sobel_prewitt.py` | Original, Sobel gradient edges, and Prewitt gradient edges |
| 20 | 2D Fourier Transform and Inverse DFT | `fourier_transform.py` | Original, centered magnitude spectrum, and reconstructed image |
| 21 | Frequency-Domain Filters | `frequency_filters.py` | Ideal low-pass filtered and ideal high-pass filtered images |
| 22 | DFT Properties | `dft_properties.py` | Translation magnitude invariance and spatial scaling properties |
| 23 | Morphological Operations | `morphological_operations.py` | Binary image with erosion, dilation, opening, and closing |
| 24 | Hit-or-Miss Transformation | `hit_or_miss.py` | Binary image with detected isolated pixel pattern |
| 25 | Noise Addition and Removal | `noise_removal.py` | 5 noise types (Gaussian, Salt & Pepper, Rayleigh, Gamma, Exponential) and mean-filtered results |

## How to Run

Run any program from the project directory:

```bash
python <filename>.py
```

Example:
```bash
python image_loading_grayscale.py
python histogram_equalization.py
```
