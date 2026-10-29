# Digital Image Processing (DIP) Practical Programs

BCA Semester Practical Examination - 25 Python Lab Programs.

> **Google Colab Notebook:** [Open in Google Colab](https://colab.research.google.com/drive/1y1l0ZW1dSomURpR7ua82RdYiO66fxsO8).
> **PDF Manual Available:** See [`DIP_Practical_Questions_and_Code.pdf`](file:///d:/Documents/MuLearn/Github/Salvin-Sebastian.github.io/DIP/DIP_Practical_Questions_and_Code.pdf) for a printable manual containing syllabus questions, objectives, code, and expected outputs.

## Requirements & Installation

### Option 1: 1-Click Setup (Windows)
Double-click [`setup.bat`](file:///d:/Documents/MuLearn/Github/Salvin-Sebastian.github.io/DIP/setup.bat) or run:
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
python -c "import cv2, numpy, matplotlib, skimage; print('DIP Environment Ready!')"
```

## Input Images

All test images are provided in the folder so every program runs immediately:
- `sample.jpeg`, `sample.jpg`, `image.jpg`: Primary color photograph test images.
- `sample1.jpeg`, `sample2.jpeg`, `image.jpeg`: Secondary test images.
- `reference.jpg`, `image1.jpg`: Reference target images for histogram matching (Question 14).

## List of 25 Practical Programs

| Q# | Program Title | Filename | Description |
|---|---|---|---|
| 1 | Image Loading and Grayscale Conversion | `image_loading_grayscale.py` | Color and converted grayscale images side-by-side |
| 2 | Sampling and Quantization | `sampling_quantization.py` | Original, downsampled (100x100), and quantized images |
| 3 | Spatial and Intensity Resolution | `spatial_intensity_resolution.py` | Original, low spatial resolution, and low intensity resolution |
| 4 | Adjacency and Connectivity | `adjacency_connectivity.py` | 4-adjacency and 8-adjacency neighbor analysis on binary image |
| 5 | RGB, CMY, and HSI Color Models | `rgb_cmy_hsi.py` | RGB decomposition, CMY subtractive model, and HSI/HSV channels |
| 6 | Hue, Saturation, and Intensity Modification | `hue_saturation_intensity.py` | Original vs modified Hue (+20), Saturation (+50), and Value (+40) |
| 7 | Color Histograms | `color_histograms.py` | Intensity frequency curves for Red, Green, and Blue channels |
| 8 | Image Negative | `image_negative.py` | Original and inverted (negative: s = 255 - r) image |
| 9 | Log Transformation | `log_transformation.py` | Original and log-transformed dynamic range enhanced image |
| 10 | Gamma Transformation | `gamma_transformation.py` | Power-law transformed images comparing gamma = 0.5, 1.0, and 2.0 |
| 11 | Piecewise Linear Transformations | `piecewise_linear_transformation.py` | Contrast stretching (NORM_MINMAX) and binary thresholding |
| 12 | Histogram Equalization | `histogram_equalization.py` | Original vs histogram-equalized image and comparative histograms |
| 13 | Histogram Stretching | `histogram_stretching.py` | Min-max linear stretching formula to span complete dynamic range |
| 14 | Histogram Matching | `histogram_matching.py` | Source image matched to reference image using skimage |
| 15 | Spatial Correlation and Convolution | `correlation_convolution.py` | Spatial correlation vs convolution with 180° rotated custom kernel |
| 16 | Smoothing Filters | `smoothing_filters.py` | Box mean filter (cv2.blur) and Gaussian blur (cv2.GaussianBlur) |
| 17 | Laplacian Sharpening | `laplacian_sharpening.py` | Grayscale image and Laplacian second-derivative edge response |
| 18 | Unsharp Masking and High-Boost Filtering | `unsharp_highboost.py` | Original, unsharp masked, and high-boost (A=2.0) filtered images |
| 19 | Sobel and Prewitt Edge Detection | `sobel_prewitt.py` | Sobel gradient magnitude vs Prewitt 3x3 gradient response |
| 20 | 2D Fourier Transform and Inverse DFT | `fourier_transform.py` | Centered 2D Fourier log magnitude spectrum and reconstructed image |
| 21 | Frequency-Domain Filters | `frequency_filters.py` | Ideal circular low-pass and high-pass frequency domain filtering |
| 22 | DFT Properties | `dft_properties.py` | Translation magnitude invariance and spatial scaling frequency property |
| 23 | Morphological Operations | `morphological_operations.py` | Binary image with erosion, dilation, opening, and closing |
| 24 | Hit-or-Miss Transformation | `hit_or_miss.py` | Binary hit-or-miss morphological operator (cv2.MORPH_HITMISS) |
| 25 | Noise Addition and Removal | `noise_removal.py` | 5 noise types (Gaussian, Salt & Pepper, Rayleigh, Gamma, Expo) + mean filter |

## How to Run

Run any program directly from the project directory:

```bash
python image_loading_grayscale.py
python histogram_equalization.py
```
