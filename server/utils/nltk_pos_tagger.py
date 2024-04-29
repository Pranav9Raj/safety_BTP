import nltk
import sys
import json

# nltk.download('punkt')

def pos_tag(text):
    # Tokenize the text
    tokens = nltk.word_tokenize(text)

    # Perform part-of-speech tagging
    tagged_words = nltk.pos_tag(tokens)

    # Convert tagged words to JSON format
    result = [{'word': word, 'pos': pos} for word, pos in tagged_words]
    
    return json.dumps(result)

if __name__ == '__main__':
    # Read text from command-line argument
    text = sys.argv[1]

    # Perform part-of-speech tagging
    tagged_text = pos_tag(text)

    # Print tagged text
    print(tagged_text)
