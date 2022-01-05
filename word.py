# %%
import json
import re

# %%

all_words = []

with open("./public/palabras_todas.txt", "r") as f:
    all_words = f.read().splitlines()

# %%

def remove_accents(old):
    """
    Removes common accent characters, lower form.
    Uses: regex.
    """
    new = old.lower()
    new = re.sub(r'[àáâãäå]', 'a', new)
    new = re.sub(r'[èéêë]', 'e', new)
    new = re.sub(r'[ìíîï]', 'i', new)
    new = re.sub(r'[òóôõö]', 'o', new)
    new = re.sub(r'[ùúûü]', 'u', new)
    return new

# %%

words_5 = []

for word in all_words:
    if len(word) == 5:
        words_5.append(remove_accents(word))

# %%

with open("./public/palabras_5.json", "w") as f:
    json.dump(words_5, f, ensure_ascii=False)
