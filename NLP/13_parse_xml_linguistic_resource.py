# Program 13: Parse and extract information from an XML-based linguistic resource
import xml.etree.ElementTree as ET

xml_data = '<corpus><word pos="NN">cat</word><word pos="VB">sat</word><word pos="NN">mat</word></corpus>'
root = ET.fromstring(xml_data)

nouns = [w.text for w in root.findall('word') if w.attrib.get('pos') == 'NN']
verbs = [w.text for w in root.findall('word') if w.attrib.get('pos') == 'VB']

print("Extracted Nouns:", nouns)
print("Extracted Verbs:", verbs)

# Output:
# Extracted Nouns: ['cat', 'mat']
# Extracted Verbs: ['sat']
