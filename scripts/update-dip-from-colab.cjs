const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const nbPath = path.join(process.env.USERPROFILE, '.gemini/antigravity-ide/brain/efb8f371-d5f9-4d8c-89c9-01bf2302a5f6/scratch/colab_notebook.ipynb');
const dipDir = path.join(rootDir, 'DIP');

if (!fs.existsSync(nbPath)) {
  console.error('Notebook not found at:', nbPath);
  process.exit(1);
}

const nb = JSON.parse(fs.readFileSync(nbPath, 'utf8'));

const mapping = [
  { q: 1, cell: 1, file: 'image_loading_grayscale.py', title: 'Load a grayscale and color image and display, Convert a color image to grayscale' },
  { q: 2, cell: 3, file: 'sampling_quantization.py', title: 'Simulate image sampling and quantization by reducing resolution and gray levels' },
  { q: 3, cell: 5, file: 'spatial_intensity_resolution.py', title: 'Demonstrate spatial and intensity resolution differences using image resizing and quantization' },
  { q: 4, cell: 7, file: 'adjacency_connectivity.py', title: 'Adjacency and Connectivity (4-neighbors and 8-neighbors of a pixel in a binary image)' },
  { q: 5, cell: 10, file: 'rgb_cmy_hsi.py', title: 'Separate RGB components, Convert RGB image to CMY and HSI color models' },
  { q: 6, cell: 12, file: 'hue_saturation_intensity.py', title: 'Modify hue, saturation, and intensity and display the output' },
  { q: 7, cell: 14, file: 'color_histograms.py', title: 'Plot color histograms for each channel' },
  { q: 8, cell: 16, file: 'image_negative.py', title: 'Image negative transformation' },
  { q: 9, cell: 18, file: 'log_transformation.py', title: 'Apply log transformation and analyze contrast enhancement' },
  { q: 10, cell: 20, file: 'gamma_transformation.py', title: 'Power-law (gamma) transformation for different gamma values' },
  { q: 11, cell: 23, file: 'piecewise_linear_transformation.py', title: 'Perform Piecewise Linear Transformations (Contrast Stretching and Thresholding)' },
  { q: 12, cell: 26, file: 'histogram_equalization.py', title: 'Perform Histogram Equalization and Compare Results' },
  { q: 13, cell: 28, file: 'histogram_stretching.py', title: 'Implement Histogram Stretching' },
  { q: 14, cell: 30, file: 'histogram_matching.py', title: 'Apply Histogram Matching (Specification) with a Reference Image' },
  { q: 15, cell: 32, file: 'correlation_convolution.py', title: 'Perform spatial correlation and convolution using custom kernels' },
  { q: 16, cell: 34, file: 'smoothing_filters.py', title: 'Apply smoothing filters (mean, Gaussian)' },
  { q: 17, cell: 37, file: 'laplacian_sharpening.py', title: 'Sharpening filters using Laplacian' },
  { q: 18, cell: 40, file: 'unsharp_highboost.py', title: 'Perform unsharp masking and high-boost filtering' },
  { q: 19, cell: 43, file: 'sobel_prewitt.py', title: 'Apply gradient operators (Sobel, Prewitt) for edge detection' },
  { q: 20, cell: 45, file: 'fourier_transform.py', title: 'Compute and visualize the 2D Fourier Transform of an image and Inverse DFT' },
  { q: 21, cell: 47, file: 'frequency_filters.py', title: 'Apply low-pass and high-pass filters in frequency domain' },
  { q: 22, cell: 49, file: 'dft_properties.py', title: 'Demonstrate properties of DFT (translation, scaling)' },
  { q: 23, cell: 51, file: 'morphological_operations.py', title: 'Basic morphological operations: dilation, erosion, opening, and closing' },
  { q: 24, cell: 53, file: 'hit_or_miss.py', title: 'Hit-or-miss transformation for pattern detection' },
  { q: 25, cell: 55, file: 'noise_removal.py', title: 'Add different types of noise (Gaussian, Salt & Pepper, etc.) and apply mean filters' }
];

console.log('Replacing code in DIP/ folder with Colab notebook code...');
mapping.forEach(m => {
  const cellCode = nb.cells[m.cell].source.join('');
  const fileContent = `# Question ${m.q}: ${m.title}\n${cellCode.trim()}\n`;
  const filePath = path.join(dipDir, m.file);
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Updated DIP/${m.file} (Question ${m.q})`);
});

// Copy notebook to DIP folder
fs.copyFileSync(nbPath, path.join(dipDir, 'DIP_Practical_Notebook.ipynb'));
console.log('Saved DIP/DIP_Practical_Notebook.ipynb');

// Ensure image aliases exist so all scripts find their target image
const imageSrc = path.join(dipDir, 'image.jpg');
const refSrc = path.join(dipDir, 'reference.jpg');

const imageAliases = ['sample.jpeg', 'sample.jpg', 'sample1.jpeg', 'sample2.jpeg', 'image.jpeg'];
imageAliases.forEach(alias => {
  const dest = path.join(dipDir, alias);
  fs.copyFileSync(imageSrc, dest);
  console.log('Created image alias: ' + alias);
});

const refAliases = ['image1.jpg'];
refAliases.forEach(alias => {
  const dest = path.join(dipDir, alias);
  fs.copyFileSync(refSrc, dest);
  console.log('Created reference image alias: ' + alias);
});

// Update requirements.txt
const reqContent = 'opencv-python>=4.8.0\nnumpy>=1.24.0\nmatplotlib>=3.7.0\nscikit-image>=0.21.0\n';
fs.writeFileSync(path.join(dipDir, 'requirements.txt'), reqContent, 'utf8');
console.log('Updated DIP/requirements.txt');
