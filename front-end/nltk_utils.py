import nltk
import numpy as np

from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

from pythainlp.tokenize import word_tokenize
from pythainlp.util import normalize

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def tokenize_thai(sentence):
    tokens = word_tokenize(sentence, engine='newmm')
    return tokens

def stem(word):
    return normalize(word)

def bag_of_words(tokenized_sentence, all_words):
    """
    sentence = ["hello", "how", "are", "you"]
    words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
    bog   = [  0 ,    1 ,    0 ,   1 ,    0 ,    0 ,      0]

    """
    tokenized_sentence = [stem(w) for w in tokenized_sentence]

    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0
    return bag

sentence = "ฉันรักภาษาไทย"
tokens = tokenize_thai(sentence)
print(tokens)