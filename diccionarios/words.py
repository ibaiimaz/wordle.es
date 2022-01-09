# %%
import json
import re

# %%

dictall = []

listas = [
    "palabras_todas.txt",
    "main.dict",
    "lista_palabras.txt",
    "lista_palabras_conj.txt",
]

for lista in listas:
    with open(f"./{lista}", "r") as f:
        dictall.extend(f.read().splitlines())

print(len(dictall))

# %%

all_words = []

for item in dictall:
    if " " in item:
        continue

    parts = item.split("/")
    if len(parts) == 1:
        word = parts[0]
        all_words.append(word)

    if len(parts) == 2:
        variations = parts[1]

        # Add regular word
        word = parts[0]
        all_words.append(word)

        if "S" in variations:
            word = parts[0] + "s"
            all_words.append(word)


print(len(all_words))

# %% Clean up words


def remove_accents(old):
    """
    Removes common accent characters, lower form.
    Uses: regex.
    """
    new = old.lower()
    new = re.sub(r"[àáâãäå]", "a", new)
    new = re.sub(r"[èéêë]", "e", new)
    new = re.sub(r"[ìíîï]", "i", new)
    new = re.sub(r"[òóôõö]", "o", new)
    new = re.sub(r"[ùúûü]", "u", new)
    return new


all_words = [remove_accents(w.lower()) for w in all_words]


# %%

words_5 = []

for word in all_words:
    if len(word) == 5:
        words_5.append(word)

words_5 = list(dict.fromkeys(words_5))
print(len(words_5))

# %%

with open("./palabras_5.json", "w") as f:
    json.dump(sorted(words_5), f, ensure_ascii=False)

# %%
