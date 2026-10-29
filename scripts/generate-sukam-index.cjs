const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDipDir = path.join(rootDir, 'DIP');
const destSukamDir = path.join(rootDir, 'public', 'sukam');

// Helper to format bytes
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Map of topics and metadata for DIP programs and assets
const topics = {
  'image_loading_grayscale.py': {
    q: '01',
    title: 'Image Loading and Grayscale Conversion',
    desc: 'Reads color photograph and converts to grayscale using OpenCV cvtColor (COLOR_BGR2GRAY). Visualizes RGB and Gray images side-by-side using Matplotlib.',
    expected: 'Original color photograph and converted 8-bit grayscale image side-by-side.'
  },
  'sampling_quantization.py': {
    q: '02',
    title: 'Sampling and Quantization',
    desc: 'Demonstrates spatial downsampling to 32x32 resolution and 4-level gray intensity quantization using integer scaling.',
    expected: 'Original image, 32x32 downsampled image, and 4-level quantized image.'
  },
  'spatial_intensity_resolution.py': {
    q: '03',
    title: 'Spatial and Intensity Resolution',
    desc: 'Demonstrates low spatial resolution reduction and extreme 1-bit intensity quantization (binary image representation).',
    expected: 'Original, low spatial resolution, and 1-bit binary thresholded image.'
  },
  'adjacency_connectivity.py': {
    q: '04',
    title: 'Adjacency and Connectivity',
    desc: 'Demonstrates pixel adjacency and connectivity on a binary pattern comparing 4-connected (5 components) vs 8-connected (1 component) using cv2.connectedComponents.',
    expected: 'Component count output: 4-connected components = 5 vs 8-connected components = 1.'
  },
  'rgb_cmy_hsi.py': {
    q: '05',
    title: 'RGB, CMY, and HSI Color Models',
    desc: 'Decomposes and converts RGB color representation into subtractive CMY model (255 - RGB) and cylindrical HSI (Hue, Saturation, Intensity) color space.',
    expected: 'Original RGB image, converted CMY model, and true HSI color representation.'
  },
  'hue_saturation_intensity.py': {
    q: '06',
    title: 'Hue, Saturation, and Intensity Modification',
    desc: 'Manipulates individual HSV/HSI components: Hue channel rotation, Saturation boost (1.5x), and Value/Intensity attenuation (0.7x).',
    expected: 'Original color photograph alongside modified Hue, Saturation, and Intensity variations.'
  },
  'color_histograms.py': {
    q: '07',
    title: 'Color Histograms',
    desc: 'Calculates and plots pixel intensity frequency distribution curves for Red, Green, and Blue channels independently using cv2.calcHist.',
    expected: 'Comparative line plot showing Red, Green, and Blue intensity histograms across 0-255.'
  },
  'image_negative.py': {
    q: '08',
    title: 'Image Negative',
    desc: 'Performs point-processing digital negative transformation (s = 255 - r) to invert all grayscale pixel values.',
    expected: 'Original grayscale image and its inverted photo-negative counterpart.'
  },
  'log_transformation.py': {
    q: '09',
    title: 'Log Transformation',
    desc: 'Applies dynamic range expansion to low-intensity pixels using logarithmic mapping function: s = c * log(1 + r).',
    expected: 'Original image and enhanced dynamic range log-transformed image highlighting dark details.'
  },
  'gamma_transformation.py': {
    q: '10',
    title: 'Gamma / Power-Law Transformation',
    desc: 'Demonstrates power-law transformation (s = c * r^γ) comparing gamma < 1 (gamma = 0.5, brightened) and gamma > 1 (gamma = 2.0, darkened).',
    expected: 'Original image alongside gamma=0.5 (brightened shadow detail) and gamma=2.0 (compressed highlight).'
  },
  'piecewise_linear_transformation.py': {
    q: '11',
    title: 'Piecewise Linear Transformations',
    desc: 'Implements contrast stretching to expand dynamic range and binary thresholding for foreground/background segmentation.',
    expected: 'Original image, contrast-stretched dynamic image, and binary thresholded image.'
  },
  'histogram_equalization.py': {
    q: '12',
    title: 'Histogram Equalization',
    desc: 'Flattens and stretches pixel distribution across the full range using cv2.equalizeHist for global contrast optimization.',
    expected: 'Original low-contrast image and dramatically enhanced histogram-equalized image.'
  },
  'histogram_stretching.py': {
    q: '13',
    title: 'Histogram Stretching',
    desc: 'Normalizes pixel values from min to max across full 0-255 range using linear min-max contrast scaling.',
    expected: 'Original image and linearly contrast-stretched image utilizing complete dynamic range.'
  },
  'histogram_matching.py': {
    q: '14',
    title: 'Histogram Matching (Specification)',
    desc: 'Matches the cumulative distribution function (CDF) of a source image to mirror a specified reference target image histogram.',
    expected: 'Source image, reference target image, and histogram-matched output image.'
  },
  'correlation_convolution.py': {
    q: '15',
    title: 'Spatial Correlation and Convolution',
    desc: 'Applies 2D spatial filtering comparing correlation with true convolution using a 180° rotated spatial kernel via cv2.filter2D.',
    expected: 'Original image alongside correlation output and 180° flipped convolution output.'
  },
  'smoothing_filters.py': {
    q: '16',
    title: 'Smoothing Filters',
    desc: 'Applies spatial low-pass smoothing filters comparing 5x5 Box Mean Filter (cv2.blur) with 5x5 Gaussian Filter (cv2.GaussianBlur).',
    expected: 'Original image, box mean blurred image, and smooth Gaussian filtered image.'
  },
  'laplacian_sharpening.py': {
    q: '17',
    title: 'Laplacian Sharpening',
    desc: 'Calculates second-order spatial derivative (cv2.Laplacian) and adds edge gradients back to original image to achieve sharp edges.',
    expected: 'Original image, Laplacian second-derivative edge response, and sharpened composite image.'
  },
  'unsharp_highboost.py': {
    q: '18',
    title: 'Unsharp Masking and High-Boost Filtering',
    desc: 'Computes unsharp mask by subtracting blurred image, applying standard unsharp masking (k=1) and high-boost filtering (k=2).',
    expected: 'Original image, standard unsharp masked image (k=1), and amplified high-boost image (k=2).'
  },
  'sobel_prewitt.py': {
    q: '19',
    title: 'Sobel and Prewitt Edge Detection',
    desc: 'Computes first-order gradient approximations in X and Y directions using Sobel 3x3 operators and Prewitt gradient kernels.',
    expected: 'Original image alongside Sobel gradient edges and Prewitt gradient edges.'
  },
  'fourier_transform.py': {
    q: '20',
    title: '2D Fourier Transform and Inverse DFT',
    desc: 'Computes 2D Fast Fourier Transform (np.fft.fft2), centers DC component with fftshift, computes log magnitude spectrum, and performs inverse DFT.',
    expected: 'Original image, centered 2D Fourier magnitude spectrum, and reconstructed spatial image.'
  },
  'frequency_filters.py': {
    q: '21',
    title: 'Frequency-Domain Filters',
    desc: 'Constructs Ideal Low-Pass Filter (ILPF) and Ideal High-Pass Filter (IHPF) masks in frequency domain to demonstrate frequency filtering.',
    expected: 'Ideal low-pass filtered (blurred) image and ideal high-pass filtered (edge extracted) image.'
  },
  'dft_properties.py': {
    q: '22',
    title: 'DFT Properties',
    desc: 'Demonstrates key 2D DFT mathematical properties: translation magnitude invariance and spatial downscaling frequency expansion.',
    expected: 'Fourier spectrum demonstrating spatial shift invariance and scaling reciprocal property.'
  },
  'morphological_operations.py': {
    q: '23',
    title: 'Morphological Operations',
    desc: 'Performs fundamental mathematical morphology operations using 5x5 rectangular structuring element: Erosion, Dilation, Opening, and Closing.',
    expected: 'Binary input image alongside Erosion, Dilation, Opening (noise removal), and Closing (gap fill).'
  },
  'hit_or_miss.py': {
    q: '24',
    title: 'Hit-or-Miss Transformation',
    desc: 'Executes binary Hit-or-Miss morphological operator (cv2.morphologyEx) with composite dual kernel to detect isolated pixel patterns.',
    expected: 'Original binary test image and single detected target pixel pattern response.'
  },
  'noise_removal.py': {
    q: '25',
    title: 'Noise Addition and Removal',
    desc: 'Generates 5 distinct statistical noise models (Gaussian, Salt & Pepper, Rayleigh, Gamma, Exponential) and performs mean filter restoration.',
    expected: '5 corrupted noise models alongside spatial averaging filter restored counterparts.'
  },
  'DIP_Practical_Questions_and_Code.pdf': {
    title: 'Complete Printable PDF Lab Manual',
    desc: 'Complete printable manual containing all 25 syllabus questions, objectives, clean Python code, and expected outputs.',
    expected: 'Ready-to-print A4 PDF document for lab exams and study.'
  },
  'README.md': {
    title: 'DIP Lab Documentation & Catalog',
    desc: 'Master README index, setup instructions, quick start guide, test image documentation, and practical program catalog.',
    expected: 'Markdown documentation file.'
  },
  'requirements.txt': {
    title: 'Python Dependencies',
    desc: 'Python package requirements file specifying opencv-python, numpy, and matplotlib.',
    expected: 'Pip requirements definition.'
  },
  'setup.bat': {
    title: '1-Click Windows Setup Script',
    desc: 'Automated batch script to create virtual environment, upgrade pip, install dependencies, and verify setup on Windows.',
    expected: 'Windows batch automation script.'
  },
  'DIP_Practical_Notebook.ipynb': {
    title: 'Google Colab / Jupyter Practical Notebook',
    desc: 'Official interactive Colab notebook containing all 25 practical experiments with executable cells, markdown theory, and output plots.',
    expected: 'Interactive IPython Notebook (.ipynb).'
  },
  'image.jpg': {
    title: 'Primary Test Input Image',
    desc: 'High-quality color photograph (109 KB) used as the primary input across practical exam programs.',
    expected: 'JPEG color test image.'
  },
  'reference.jpg': {
    title: 'Histogram Matching Reference Image',
    desc: 'Target color photograph (109 KB) whose histogram distribution is matched in Question 14.',
    expected: 'JPEG reference test image.'
  },
  'sample.jpeg': {
    title: 'Test Input Image (sample.jpeg)',
    desc: 'Primary input photograph used across Colab practical questions (Q1, 2, 3, 10, 11, 16-20, 23-25).',
    expected: 'JPEG color test image.'
  },
  'sample.jpg': {
    title: 'Test Input Image (sample.jpg)',
    desc: 'Input photograph used for Questions 5, 21, and 22.',
    expected: 'JPEG color test image.'
  },
  'sample1.jpeg': {
    title: 'Test Input Image (sample1.jpeg)',
    desc: 'Input photograph used for Questions 6 and 7 (HSV modification and color histograms).',
    expected: 'JPEG color test image.'
  },
  'sample2.jpeg': {
    title: 'Test Input Image (sample2.jpeg)',
    desc: 'Input photograph used for Questions 8 and 9 (negative and log transformations).',
    expected: 'JPEG color test image.'
  },
  'image.jpeg': {
    title: 'Test Input Image (image.jpeg)',
    desc: 'Input photograph used for Questions 12, 13, 14, and 15 (histograms, correlation).',
    expected: 'JPEG color test image.'
  },
  'image1.jpg': {
    title: 'Reference Target Image (image1.jpg)',
    desc: 'Reference target image used for histogram matching in Question 14.',
    expected: 'JPEG reference test image.'
  },
  'dip_practical_programs.zip': {
    title: 'All-in-One DIP ZIP Bundle',
    desc: 'Complete downloadable archive containing all 25 practical programs, input test images, PDF manual, setup script, and documentation.',
    expected: 'Compressed ZIP archive.'
  }
};

if (!fs.existsSync(destSukamDir)) {
  fs.mkdirSync(destSukamDir, { recursive: true });
}

const fileList = fs.readdirSync(destSukamDir).filter(f => f !== 'index.html');

// Helper to get program question number
function getQuestionNum(file) {
  if (topics[file] && topics[file].q) {
    return parseInt(topics[file].q, 10);
  }
  return 999;
}

// Sort files logically:
// 1. Colab Notebook & PDF manual
// 2. ZIP archive
// 3. README.md
// 4. Programs 1 to 25 in question order
// 5. Test images
// 6. Config / batch scripts
fileList.sort((a, b) => {
  if (a.endsWith('.ipynb')) return -1;
  if (b.endsWith('.ipynb')) return 1;
  if (a.endsWith('.pdf')) return -1;
  if (b.endsWith('.pdf')) return 1;
  if (a.endsWith('.zip')) return -1;
  if (b.endsWith('.zip')) return 1;
  if (a === 'README.md') return -1;
  if (b === 'README.md') return 1;

  const isPyA = a.endsWith('.py');
  const isPyB = b.endsWith('.py');
  if (isPyA && isPyB) {
    return getQuestionNum(a) - getQuestionNum(b);
  }
  if (isPyA && !isPyB) return -1;
  if (!isPyA && isPyB) return 1;

  const isImgA = a.endsWith('.jpg') || a.endsWith('.jpeg') || a.endsWith('.png');
  const isImgB = b.endsWith('.jpg') || b.endsWith('.jpeg') || b.endsWith('.png');
  if (isImgA && !isImgB) return -1;
  if (!isImgA && isImgB) return 1;

  return a.localeCompare(b);
});

// Build items data
const items = [];
for (const file of fileList) {
  const fullPath = path.join(destSukamDir, file);
  const stat = fs.statSync(fullPath);
  const ext = path.extname(file).toLowerCase();

  let category = 'other';
  if (ext === '.py') category = 'practicals';
  else if (ext === '.pdf' || ext === '.ipynb' || file === 'README.md') category = 'manuals';
  else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') category = 'assets';
  else if (ext === '.bat' || ext === '.txt' || ext === '.zip') category = 'config';

  let content = null;
  // If text file under 150KB (and not ipynb binary json), read content for immediate in-browser viewing
  if (stat.size < 150 * 1024 && (ext === '.py' || ext === '.txt' || ext === '.md' || ext === '.bat')) {
    content = fs.readFileSync(fullPath, 'utf8');
  }

  const meta = topics[file] || {};
  const itemTitle = meta.title || file;
  const itemDesc = meta.desc || `Digital Image Processing file: ${file}`;
  const itemQ = meta.q || '';
  const itemExpected = meta.expected || '';

  items.push({
    name: file,
    ext,
    size: stat.size,
    sizeFormatted: formatBytes(stat.size),
    category,
    q: itemQ,
    title: itemTitle,
    desc: itemDesc,
    expected: itemExpected,
    hasCode: !!content,
    code: content
  });
}

console.log(`Prepared metadata for ${items.length} files in sukam directory.`);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sukam • Digital Image Processing (DIP) Lab | Salvin Sebastian</title>
  <meta name="description" content="Browse, preview, and download all 25 Digital Image Processing practical programs, complete printable A4 PDF manual, test images, and exam solutions.">
  <link rel="icon" type="image/x-icon" href="/icons/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090b10;
      --bg-card: rgba(18, 22, 34, 0.75);
      --bg-card-hover: rgba(28, 34, 52, 0.85);
      --bg-code: #0b0f19;
      --border: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(56, 189, 248, 0.35);
      --text: #cbd5e1;
      --text-muted: #64748b;
      --text-heading: #f8fafc;
      --accent-cyan: #38bdf8;
      --accent-purple: #a855f7;
      --accent-blue: #3b82f6;
      --accent-emerald: #10b981;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --gradient: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%);
      --gradient-subtle: linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'Fira Code', ui-monospace, Consolas, monospace;
      --radius: 12px;
      --shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow-x: hidden;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient background glow */
    body::before {
      content: '';
      position: fixed;
      top: -220px;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 650px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(168, 85, 247, 0.09) 45%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    a {
      color: var(--accent-cyan);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    a:hover {
      color: #7dd3fc;
    }

    .container {
      width: 100%;
      max-width: 1220px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 1;
    }

    /* HEADER */
    header.site-header {
      background: rgba(9, 11, 16, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .breadcrumb-nav {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    .breadcrumb-nav .site-link {
      color: var(--text-heading);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
    }
    .breadcrumb-nav .site-link:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .breadcrumb-nav .sep {
      color: var(--text-muted);
    }
    .breadcrumb-nav .current-badge {
      color: var(--accent-cyan);
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid var(--border-accent);
      padding: 6px 12px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 13px;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      font-family: var(--font-sans);
    }
    .btn-primary {
      background: var(--gradient);
      color: #0b0f19;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35);
    }
    .btn-primary:hover {
      opacity: 0.95;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(56, 189, 248, 0.5);
      color: #000;
    }
    .btn-ghost {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      border-color: var(--border);
    }
    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-heading);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* HERO */
    .hero-section {
      padding: 48px 0 32px;
      text-align: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--accent-cyan);
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .hero-title {
      font-size: 42px;
      font-weight: 800;
      color: var(--text-heading);
      letter-spacing: -0.5px;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .hero-title span {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-desc {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 740px;
      margin: 0 auto 32px;
    }
    .stats-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-pill {
      background: var(--bg-card);
      border: 1px solid var(--border);
      padding: 10px 18px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .stat-pill strong {
      color: var(--accent-cyan);
      font-size: 18px;
      font-family: var(--font-mono);
    }
    .stat-pill span {
      font-size: 13px;
      color: var(--text-muted);
    }

    .hero-ctas {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    /* CONTROLS (SEARCH & TABS) */
    .controls-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 18px 20px;
      margin-bottom: 24px;
      backdrop-filter: blur(12px);
    }
    .controls-top {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .search-box {
      flex: 1;
      min-width: 280px;
      position: relative;
    }
    .search-box svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      padding: 12px 40px 12px 42px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-heading);
      font-size: 14px;
      font-family: var(--font-sans);
      outline: none;
      transition: all 0.2s ease;
    }
    .search-input:focus {
      border-color: var(--accent-cyan);
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
    }
    .search-clear {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 14px;
      display: none;
    }
    .search-clear:hover {
      color: var(--text-heading);
    }
    .filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tab-btn {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-heading);
    }
    .tab-btn.active {
      background: rgba(56, 189, 248, 0.15);
      border-color: var(--accent-cyan);
      color: #38bdf8;
    }
    .controls-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }

    /* DIRECTORY TABLE */
    .table-container {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      margin-bottom: 60px;
    }
    table.file-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    thead th {
      background: rgba(0, 0, 0, 0.4);
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
    }
    tbody tr {
      border-bottom: 1px solid var(--border);
      transition: background 0.15s ease;
    }
    tbody tr:last-child {
      border-bottom: none;
    }
    tbody tr:hover {
      background: var(--bg-card-hover);
    }
    td {
      padding: 14px 18px;
      font-size: 14px;
      vertical-align: middle;
    }
    .col-name {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }
    .file-icon {
      font-size: 20px;
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .file-link {
      color: var(--text-heading);
      font-family: var(--font-mono);
      font-size: 13px;
      cursor: pointer;
    }
    .file-link:hover {
      color: var(--accent-cyan);
    }
    .badge-tag {
      font-size: 10px;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .badge-q { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); font-family: var(--font-mono); }
    .badge-py { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
    .badge-pdf { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
    .badge-ipynb { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-jpg { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-zip { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
    .badge-bat { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-doc { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }

    .col-desc {
      color: var(--text);
      max-width: 480px;
      font-size: 13.5px;
    }
    .col-title {
      font-weight: 600;
      color: var(--text-heading);
      margin-bottom: 2px;
    }
    .col-sub {
      color: var(--text-muted);
      font-size: 12.5px;
    }
    .col-size {
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 12.5px;
      white-space: nowrap;
    }
    .col-actions {
      text-align: right;
      white-space: nowrap;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 6px;
    }
    .action-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-heading);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .action-btn.copy:hover {
      border-color: var(--accent-cyan);
      color: #38bdf8;
    }
    .action-btn.download:hover {
      border-color: var(--accent-purple);
      color: #c084fc;
    }

    /* MODAL CODE / MEDIA VIEWER */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-backdrop.open {
      display: flex;
    }
    .modal-dialog {
      background: #0d111a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius);
      width: 100%;
      max-width: 900px;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      animation: modalIn 0.2s ease-out forwards;
    }
    @keyframes modalIn {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .modal-header {
      padding: 16px 20px;
      background: #131826;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .modal-filename {
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 700;
      color: var(--text-heading);
    }
    .modal-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .modal-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }
    pre.code-block {
      background: #090c13;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      color: #e2e8f0;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre;
    }

    /* TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1e293b;
      color: #f8fafc;
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid var(--accent-cyan);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      font-size: 13px;
      font-weight: 600;
      z-index: 2000;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.25s ease;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* FOOTER */
    footer.site-footer {
      margin-top: auto;
      border-top: 1px solid var(--border);
      padding: 32px 0;
      background: rgba(9, 11, 16, 0.95);
      text-align: center;
      color: var(--text-muted);
      font-size: 13px;
    }

    @media (max-width: 768px) {
      .hero-title { font-size: 28px; }
      .col-desc { display: none; }
      thead th:nth-child(2) { display: none; }
      .nav-actions .btn-ghost { display: none; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="site-header">
    <div class="container nav-inner">
      <div class="breadcrumb-nav">
        <a href="/" class="site-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Salvin Sebastian
        </a>
        <span class="sep">/</span>
        <span class="current-badge">📁 sukam</span>
      </div>
      <div class="nav-actions">
        <a href="/sukam/DIP_Practical_Questions_and_Code.pdf" target="_blank" class="btn btn-ghost">
          📕 PDF Manual
        </a>
        <a href="/sukam/dip_practical_programs.zip" download class="btn btn-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download ZIP
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN -->
  <main class="container">
    <section class="hero-section">
      <div class="hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        BCA Semester Syllabus • Digital Image Processing (DIP)
      </div>
      <h1 class="hero-title">Digital Image Processing <span>Lab Hub</span></h1>
      <p class="hero-desc">
        Complete collection of all 25 practical programs, genuine exam-ready Python implementations, expected outputs, complete printable A4 PDF manual, and input test images.
      </p>

      <div class="stats-row">
        <div class="stat-pill">
          <strong>25</strong>
          <span>Python Practicals</span>
        </div>
        <div class="stat-pill">
          <strong>1 to 25</strong>
          <span>Syllabus Questions</span>
        </div>
        <div class="stat-pill">
          <strong>A4 PDF</strong>
          <span>Printable Manual</span>
        </div>
        <div class="stat-pill">
          <strong>100%</strong>
          <span>Offline Ready</span>
        </div>
      </div>

      <div class="hero-ctas">
        <a href="https://colab.research.google.com/drive/1y1l0ZW1dSomURpR7ua82RdYiO66fxsO8" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Open Google Colab
        </a>
        <a href="/sukam/DIP_Practical_Questions_and_Code.pdf" target="_blank" class="btn btn-ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Open PDF Manual
        </a>
        <a href="/sukam/dip_practical_programs.zip" download class="btn btn-ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download ZIP Bundle
        </a>
        <a href="https://github.com/Salvin-Sebastian/Salvin-Sebastian.github.io/tree/main/DIP" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View on GitHub
        </a>
      </div>
    </section>

    <!-- SEARCH & CONTROLS -->
    <div class="controls-wrapper">
      <div class="controls-top">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="searchInput" class="search-input" placeholder="Search by name, question #, topic (e.g. 'fourier', 'sobel', 'histogram', '05', '.pdf')... [/]" autocomplete="off">
          <button id="searchClear" class="search-clear">✕</button>
        </div>
        <div class="filter-tabs">
          <button class="tab-btn active" data-cat="all">All</button>
          <button class="tab-btn" data-cat="practicals">Practicals 01-25</button>
          <button class="tab-btn" data-cat="manuals">Manuals & Docs</button>
          <button class="tab-btn" data-cat="assets">Test Images</button>
          <button class="tab-btn" data-cat="config">Setup & ZIP</button>
        </div>
      </div>
      <div class="controls-meta">
        <span id="resultCount">Showing ${items.length} files</span>
        <span>Click any row to preview or copy code</span>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-container">
      <table class="file-table">
        <thead>
          <tr>
            <th style="width: 32%;">File Name</th>
            <th style="width: 44%;">Topic / Description</th>
            <th style="width: 10%;">Size</th>
            <th style="width: 14%; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody id="filesBody">
          <!-- Populated by JavaScript -->
        </tbody>
      </table>
    </div>
  </main>

  <!-- MODAL / VIEWER -->
  <div id="modalBackdrop" class="modal-backdrop">
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <span id="modalIcon" class="file-icon">📄</span>
          <span id="modalFilename" class="modal-filename">filename.py</span>
          <span id="modalBadge" class="badge-tag badge-py">PY</span>
        </div>
        <div class="modal-actions">
          <button id="modalCopyBtn" class="action-btn copy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Code
          </button>
          <a id="modalDownloadBtn" href="#" download class="action-btn download">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download
          </a>
          <button id="modalCloseBtn" class="action-btn">✕</button>
        </div>
      </div>
      <div class="modal-body" id="modalBody">
        <!-- Rendered Code or Media -->
      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div id="toast" class="toast">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span id="toastMsg">Copied to clipboard</span>
  </div>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <p>
        Digital Image Processing (DIP) Lab Solutions • Maintained by <a href="/">Salvin Sebastian</a> • Hosted on GitHub Pages
      </p>
    </div>
  </footer>

  <!-- SCRIPT DATA & LOGIC -->
  <script>
    const fileData = ${JSON.stringify(items)};

    function getIcon(file) {
      if (file.name.endsWith('.pdf')) return '📕';
      if (file.name.endsWith('.ipynb')) return '📓';
      if (file.name.endsWith('.zip')) return '📦';
      if (file.name.endsWith('.py')) return '🐍';
      if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png')) return '🖼️';
      if (file.name.endsWith('.md')) return '📝';
      if (file.name.endsWith('.bat')) return '⚙️';
      return '📄';
    }

    function getBadgeClass(ext) {
      if (ext === '.py') return 'badge-py';
      if (ext === '.pdf') return 'badge-pdf';
      if (ext === '.ipynb') return 'badge-ipynb';
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') return 'badge-jpg';
      if (ext === '.zip') return 'badge-zip';
      if (ext === '.bat') return 'badge-bat';
      return 'badge-doc';
    }

    let currentFilter = 'all';
    let searchQuery = '';

    const filesBody = document.getElementById('filesBody');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const resultCount = document.getElementById('resultCount');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalFilename = document.getElementById('modalFilename');
    const modalBadge = document.getElementById('modalBadge');
    const modalIcon = document.getElementById('modalIcon');
    const modalBody = document.getElementById('modalBody');
    const modalCopyBtn = document.getElementById('modalCopyBtn');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    let currentModalFile = null;

    function showToast(text) {
      toastMsg.innerText = text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function copyToClipboard(text, label) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied ' + (label || 'content') + ' to clipboard!');
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied ' + (label || 'content') + ' to clipboard!');
      });
    }

    function renderTable() {
      const q = searchQuery.toLowerCase().trim();
      const filtered = fileData.filter(item => {
        const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
        const matchesQuery = !q ||
          item.name.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          (item.q && ('q' + item.q).toLowerCase().includes(q)) ||
          (item.q && item.q.includes(q));
        return matchesCategory && matchesQuery;
      });

      resultCount.innerText = 'Showing ' + filtered.length + ' of ' + fileData.length + ' files';

      if (filtered.length === 0) {
        filesBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px; color: var(--text-muted);">No matching files found. Try a different search term.</td></tr>';
        return;
      }

      filesBody.innerHTML = filtered.map(item => {
        const icon = getIcon(item);
        const badge = getBadgeClass(item.ext);
        const extName = item.ext.replace('.', '').toUpperCase() || 'FILE';

        return \`
          <tr data-file="\${item.name}">
            <td>
              <div class="col-name">
                <span class="file-icon">\${icon}</span>
                <span class="file-link" onclick="openFileViewer('\${item.name}')">\${item.name}</span>
                \${item.q ? \`<span class="badge-tag badge-q">Q\${item.q}</span>\` : ''}
                <span class="badge-tag \${badge}">\${extName}</span>
              </div>
            </td>
            <td>
              <div class="col-desc">
                <div class="col-title">\${item.title}</div>
                <div class="col-sub">\${item.desc}</div>
              </div>
            </td>
            <td>
              <div class="col-size">\${item.sizeFormatted}</div>
            </td>
            <td class="col-actions">
              <button class="action-btn" onclick="openFileViewer('\${item.name}')" title="Preview file">
                👁️ View
              </button>
              \${item.hasCode ? \`
                <button class="action-btn copy" onclick="copyFileCode('\${item.name}')" title="Copy code">
                  📋 Copy
                </button>
              \` : ''}
              <a href="/sukam/\${item.name}" download class="action-btn download" title="Download raw file">
                ⬇️ Download
              </a>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function openFileViewer(fileName) {
      const file = fileData.find(f => f.name === fileName);
      if (!file) return;

      currentModalFile = file;
      modalFilename.innerText = file.name;
      modalIcon.innerText = getIcon(file);
      modalBadge.className = 'badge-tag ' + getBadgeClass(file.ext);
      modalBadge.innerText = file.q ? ('Q' + file.q + ' • ' + file.ext.replace('.', '').toUpperCase()) : file.ext.replace('.', '').toUpperCase();
      modalDownloadBtn.href = '/sukam/' + file.name;

      if (file.hasCode && file.code) {
        modalCopyBtn.style.display = 'inline-flex';
        modalBody.innerHTML =
          '<div style="margin-bottom: 14px;">' +
            '<h3 style="color:#f8fafc; font-size:16px; margin-bottom:4px;">' + file.title + '</h3>' +
            '<p style="color:#94a3b8; font-size:13px;">' + file.desc + '</p>' +
            (file.expected ? '<p style="color:#38bdf8; font-size:12px; margin-top:4px;"><strong>Expected Output:</strong> ' + file.expected + '</p>' : '') +
          '</div>' +
          '<pre class="code-block"><code>' + escapeHtml(file.code) + '</code></pre>';
      } else if (file.ext === '.pdf') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">' + file.title + '</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 24px;">' + file.desc + '</p>' +
          '<div style="display:flex; justify-content:center; gap:12px;">' +
            '<a href="/sukam/' + file.name + '" target="_blank" class="btn btn-primary">Open Full PDF in New Tab</a>' +
            '<a href="/sukam/' + file.name + '" download class="btn btn-ghost">Download PDF (' + file.sizeFormatted + ')</a>' +
          '</div>' +
          '</div>';
      } else if (file.ext === '.ipynb') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">' + file.title + ' (' + file.sizeFormatted + ')</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 24px;">' + file.desc + '</p>' +
          '<div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">' +
            '<a href="https://colab.research.google.com/drive/1y1l0ZW1dSomURpR7ua82RdYiO66fxsO8" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open in Google Colab 🚀</a>' +
            '<a href="/sukam/' + file.name + '" download class="btn btn-ghost">Download .ipynb File</a>' +
          '</div>' +
          '</div>';
      } else if (file.ext === '.jpg' || file.ext === '.jpeg' || file.ext === '.png') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 20px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:8px;">' + file.title + ' (' + file.name + ')</h3>' +
          '<p style="color:#94a3b8; font-size:13px; margin-bottom:18px;">' + file.desc + '</p>' +
          '<img src="/sukam/' + file.name + '" alt="' + file.name + '" style="max-width:100%; max-height:480px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); box-shadow:0 8px 30px rgba(0,0,0,0.6);">' +
          '<div style="margin-top:16px;"><a href="/sukam/' + file.name + '" download class="btn btn-ghost">Download Image (' + file.sizeFormatted + ')</a></div>' +
          '</div>';
      } else if (file.ext === '.zip') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">All-in-One DIP ZIP Bundle (' + file.sizeFormatted + ')</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 24px;">Contains all 25 practical Python programs, input photographs (image.jpg, reference.jpg), PDF manual, setup.bat, and requirements.</p>' +
          '<a href="/sukam/' + file.name + '" download class="btn btn-primary">Download Complete ZIP Archive</a>' +
          '</div>';
      } else {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;"><p style="color:#94a3b8;">Binary file. Please use the download button above.</p></div>';
      }

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = 'auto';
      currentModalFile = null;
    }

    function copyFileCode(fileName) {
      const file = fileData.find(f => f.name === fileName);
      if (file && file.code) {
        copyToClipboard(file.code, file.name);
      }
    }

    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      searchClear.style.display = searchQuery ? 'block' : 'none';
      renderTable();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      renderTable();
      searchInput.focus();
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.cat;
        renderTable();
      });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    modalCopyBtn.addEventListener('click', () => {
      if (currentModalFile && currentModalFile.code) {
        copyToClipboard(currentModalFile.code, currentModalFile.name);
      }
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    // Initial render
    renderTable();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(destSukamDir, 'index.html'), html, 'utf8');
console.log('Successfully generated public/sukam/index.html');
