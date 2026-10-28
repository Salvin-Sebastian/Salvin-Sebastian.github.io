# Program 14: Write regex patterns to extract emails, dates, and URLs from text
import re

text = "Contact info@college.edu by 28/10/2026 or check https://college.edu"

emails = re.findall(r'[\w\.-]+@[\w\.-]+', text)
dates = re.findall(r'\d{1,2}/\d{1,2}/\d{2,4}', text)
urls = re.findall(r'https?://\S+', text)

print("Emails:", emails)
print("Dates: ", dates)
print("URLs:  ", urls)

# Output:
# Emails: ['info@college.edu']
# Dates:  ['28/10/2026']
# URLs:   ['https://college.edu']
