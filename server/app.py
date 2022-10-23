import json
from flask import Flask, request
from spanishconjugator import Conjugator

app = Flask(__name__)

TENSES = ["present", "preterite", "imperfect"]
PRONOUNS = ["yo", "tu", "el", "ella", "usted", "nosotros", "vosotros", "ellos", "ustedes"]
MOODS = ["indicative", "subjunctive", "imperative"]

@app.route('/conjugate', methods=['GET'])
def conjugate():
    args = request.args
    verb = args.get("verb", default="hablar", type=str)
    tense = args.get("tense", default="present", type=str)
    subject = args.get("subject", type=str)
    mood = args.get("mood", default="indicative", type=str)
    # make sure verb, tense, subj and mood are valid
    print(verb, tense, subject, mood)
    # if subject is None and mood == "indicative" and tense == "present":
    #     # return all conjugations
    #     conjugation= Conjugator.conjugate(root_verb=verb, tense=tense, mood=mood)
    conjugation = None
    if verb is not None and tense in TENSES and subject in PRONOUNS and mood in MOODS:
        conjugation = Conjugator().conjugate(root_verb=verb, tense=tense, mood=mood, pronoun=subject)
    data = {"conjugation": conjugation}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response