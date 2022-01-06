# %%
import json
import re

# %%

dict_ = []

with open("./public/main.dict", "r") as f:
    dict_ = f.read().splitlines()

# %%

all_words = []

for item in dict_:
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

# %%

with open("./public/palabras_5.json", "w") as f:
    json.dump(words_5, f, ensure_ascii=False)

# %%
