# Program 09: Handle multilingual text input and normalization in Python
import unicodedata

text = "Café STRAßE"
# Unicode normalization and casefolding
normalized = unicodedata.normalize('NFC', text).casefold()

print("Original:  ", text)
print("Normalized:", normalized)

# Output:
# Original:   Café STRAßE
# Normalized: café strasse
