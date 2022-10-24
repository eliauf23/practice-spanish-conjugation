import { useState, useEffect } from 'react';
import { Button, Stack, Box, TextField } from '@mui/material';

export default function AnswerInput(props) {

    const {correctAnswer} = props;
    const[submitted, setSubmitted] = useState(false);
    const [answer, setAnswer] = useState('');
    const handleChange = (event) => {
      setAnswer(event.target.value);
    };

    return (
        <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Stack direction="row" spacing={2} marginLeft={2}>
        <TextField
          error={submitted && answer !== correctAnswer}
          id="outlined-error-helper-text"
        //   label="Error"
          value={answer}
          onChange={handleChange}
        //   onEnter={setSubmitted(true)}
        //   helperText="Type answer here"
        />
        <Button variant="contained" onClick={() => setSubmitted(true)}>Submit</Button>
        </Stack>

       
      </Box>

    );
}
