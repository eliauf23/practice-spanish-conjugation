import React, { useState, useEffect } from 'react';
// import { conjugateVerb } from './conjugate';
import AnswerInput from './components/AnswerInput';
import MultipleSelect from './components/MultipleSelect';
import VerbList from './components/VerbList';
import Prompt from './components/Prompt';
const MOODS = ['indicative', 'subjunctive', 'imperative'];
const TENSES = ['present', 'imperfect', 'preterite'];
const SUBJECTS = ['yo', 'tu', 'el', 'ella', 'usted', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'ustedes'];
const IMPERATIVE_SUBJECTS = ['tu', 'el', 'ella', 'usted', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'ustedes'];

const IMPERATIVE_OPTS = ["affirmative", "negative"];
//like an enum
const subjectMap = {

  'yo': 'yo',
  'tu': 'tu',
  'el': 'usted',
  'ella': 'usted',
  'usted': 'usted',
  'nosotros': 'nosotros',
  'nosotras': 'nosotros',
  'vosotros': 'vosotros',
  'vosotras': 'vosotros',
  'ellos': 'ustedes',
  'ellas': 'ustedes',
  'ustedes': 'ustedes',

};
// const subjectDisplayNames = {
//   'yo': 'yo', 'tu': 'tú', 'el': 'él', 'ella': 'ella', 'usted': 'usted', 'nosotros': 'nosotros', 'nosotras': 'nosotras', 'vosotros': 'vosotros', 'vosotras': 'vosotras', 'ellos': 'ellos', 'ellas': 'ellas', 'ustedes': 'ustedes'
// }

// Example POST method implementation:
async function getData(verb, mood, tense, subjectConversion) {
  const base = 'http://127.0.0.1:5000/conjugate?';

  const params = new URLSearchParams({
    verb: verb,
    mood: mood,
    tense: tense,
    subject: subjectConversion,
  });

  const url = base + params.toString();
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  });

  return response.json() // parses JSON response into native JavaScript objects
}




function App() {

  const [selectedMoods, setselectedMoods] = useState([]);
  const [selectedTenses, setselectedTenses] = useState([]);
  const initVerbList = ["hablar", "comer", "vivir", "ser", "haber", "estar", "tener", "poder", "ir", "ver", "dar"]
  const [verbList, setVerbList] = useState(initVerbList);
  const initVerb = verbList[Math.floor(Math.random() * verbList.length)];
  const initMood = 'indicative';
  const initTense = 'present';
  const initSubject = 'yo';
  const [verb, setVerb] = useState(initVerb);
  const [answer, setAnswer] = useState('');
  const [conjugation, setConjugation] = useState('');
  const [mood, setMood] = useState(initMood);
  const [tense, setTense] = useState(initTense);
  const [subject, setSubject] = useState(initSubject);
  const [subjectConversion, setSubjectConversion] = useState(initSubject);

  useEffect(() => {
    async function fetchData() {
      if (conjugation === '') {
        let response = await getData(verb, mood, tense, subjectConversion);
        if (response.conjugation !== "error") {
          setConjugation(response.conjugation);
        } else {
          alert("error");
        }
      }
    }
    fetchData();

  }, []);

  const addVerb = (verb) => {
    setVerbList([...verbList, verb]);
  };

  //remove verb from verbList
  const removeVerb = (verb) => {
    const newVerbList = verbList.filter((v) => v !== verb);
    setVerbList(newVerbList);
  };





  const getConjugation = async () => {
    let tempVerb, tempMood, tempTense, tempSubject, tempSubjectConversion = null;
    tempVerb = verbList[Math.floor(Math.random() * verbList.length)];
    tempMood = selectedMoods[Math.floor(Math.random() * selectedMoods.length)];
    if (mood === 'imperative') {
      tempTense = IMPERATIVE_OPTS[Math.floor(Math.random() * IMPERATIVE_OPTS.length)];
      tempSubject = IMPERATIVE_SUBJECTS[Math.floor(Math.random() * IMPERATIVE_SUBJECTS.length)];
    } else if (mood === 'subjunctive') {
      tempTense = 'present';
      tempSubject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    }
    else {
      tempTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];
      tempSubject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];

    }

    tempSubjectConversion = subjectMap[tempSubject];
    if (tempVerb && tempMood && tempTense && tempSubject && tempSubjectConversion) {
      setVerb(tempVerb);
      setMood(tempMood);
      setTense(tempTense);
      setSubject(tempSubject);
      setSubjectConversion(tempSubjectConversion);
      //get the data from the API with fetch
      let response = await getData(verb, mood, tense, subjectConversion);
      if (response.conjugation !== "error") {
        setConjugation(response.conjugation);
      } else alert("error")
    }




  };

  const getNextVerb = async () => {
    await getConjugation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let answer = document.querySelector('input').value;
    console.log(answer);
    if (answer === conjugation) {
      setVerb(verbList[Math.floor(Math.random() * verbList.length)]);
      // alert("Correct!");
      document.querySelector('input').value = '';
      document.querySelector('input').focus();
      return getConjugation();


    } else {
      document.querySelector('input').value = '';
      alert("Try again!");
    }

  }
  return (
    <React.Fragment>
      <MultipleSelect label={"Moods"} items={MOODS} selectedItems={selectedMoods} setSelectedItems={setselectedMoods} />
      <MultipleSelect label={"Tenses"} items={TENSES} selectedItems={selectedTenses} setSelectedItems={setselectedTenses} />

      {selectedMoods !== null && selectedTenses !== null ? (
        <>
          <VerbList verbList={verbList} setVerbList={setVerbList} addVerb={addVerb} removeVerb={removeVerb} />
          <Prompt verb={verb} mood={mood} tense={tense} subject={subject} getNextVerb={getNextVerb} />
          <br />
          <AnswerInput answer={answer} setAnswer={setAnswer} correctAnswer={conjugation} />
        </>

      ) : (<div>Select tenses and moods</div>)}


    </React.Fragment>


    // <div>
    //   <div>

    //     {mood === 'imperative' ? (<p>{verb} as an {tense} command for {subject}</p>) : (<p></p>)
    //     }
    //   </div>
    //   <div>

    //     {mood === 'subjunctive' ? (<p>{verb} as an present command for {subject}</p>) : (<p></p>)
    //     }
    //   </div>

    //   <div>

    //     {mood === 'indicative' ? (<p>{verb} as an {tense} command for {subject}</p>) : (<p></p>)
    //     }
    //   </div>

    //   {/* { mood !== 'imperative' && mood !== 'subjunctive'? ( <p>
    //     Conjugate: {verb} as an {tense} command for {subject}.
    //   </p>):(
    //     <p>
    //     Conjugate: {verb} in the {mood} {tense} {subject}.
    //   </p>
    //   )} */}


    //   <input></input>
    //   <button onClick={handleSubmit}>Submit</button>
    //   <div className="correctResponse">
    //     <label >Correct Answer:</label>
    //     <span id="correctAnswer" name="correctAnswer"> {conjugation}</span>
    //   </div>
    // </div>
  );
}

export default App;

