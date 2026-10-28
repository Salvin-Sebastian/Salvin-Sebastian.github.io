# Program 08: Write a program to demonstrate ASCII vs Unicode encoding
text = "A ©"

print("ASCII code of 'A':", ord('A'), "| Unicode code of '©':", ord('©'))
print("UTF-8 bytes:      ", text.encode('utf-8'))
print("ASCII with replace:", text.encode('ascii', errors='replace'))

# Output:
# ASCII code of 'A': 65 | Unicode code of '©': 169
# UTF-8 bytes:       b'A \xc2\xa9'
# ASCII with replace: b'A ?'
