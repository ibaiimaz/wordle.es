# %%

import requests
from bs4 import BeautifulSoup

# %%

letras = "qwertyuiopasdfghjklñzxcvbnm"


# %%


def get_palabras(letra):
    headers = {"user-agent": "wordle.es/1.0"}
    url = f"https://www.listapalabras.com/palabras-con.php"
    r = requests.get(
        url, params={"letra": letra.lower(), "total": "s"}, headers=headers
    )

    soup = BeautifulSoup(r.text, "html.parser")

    #
    dict_ = soup.find(id="columna_resultados_generales")
    palabras = dict_.find_all(id="palabra_resultado")

    words = [w.text.strip() for w in palabras]

    #
    dict_ = soup.find(id="columna_resultados_conjugaciones")
    palabras = dict_.find_all(id="palabra_resultado")

    words_conj = [w.text.strip() for w in palabras]
    return words, words_conj


# %%

w1, w2 = get_palabras("a")

# %%

all_words = []
all_words_conj = []

for letter in letras:
    print(letter)
    w1, w2 = get_palabras(letter)
    all_words.extend(w1)
    all_words_conj.extend(w2)

# %%

with open("./lista_palabras.txt", "w") as f:
    for word in sorted(all_words):
        f.write(f"{word}\n")

with open("./lista_palabras_conj.txt", "w") as f:
    for word in sorted(all_words_conj):
        f.write(f"{word}\n")

# %%
