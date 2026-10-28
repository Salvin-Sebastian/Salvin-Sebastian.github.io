# Program 16: Implement a simple morphological analyzer (prefix, suffix stripping)
def morphological_analyze(word):
    prefixes = ['un', 're', 'dis']
    suffixes = ['ness', 'ing', 'ed', 'ly']
    stem = word.lower()

    prefix = next((p for p in prefixes if stem.startswith(p)), "")
    if prefix: stem = stem[len(prefix):]

    suffix = next((s for s in suffixes if stem.endswith(s)), "")
    if suffix: stem = stem[:-len(suffix)]

    return prefix, stem, suffix

print("unhappiness ->", morphological_analyze("unhappiness"))
print("replaying   ->", morphological_analyze("replaying"))

# Output:
# unhappiness -> ('un', 'happi', 'ness')
# replaying   -> ('re', 'play', 'ing')
