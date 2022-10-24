import { useState, useEffect } from 'react';
import { Button, Stack, Box, TextField , Typography} from '@mui/material';

export default function Prompt(props) {

    const { verb, mood, tense, subject, getNextVerb } = props;
    
    const canGetNextVerb = (verb !== null &&  mood !== null && tense !== null &&  subject !== null)
    
    return (
        <Box>
            <Stack direction="row" spacing={2} marginLeft={2}>
            <Stack direction="column" spacing={2}>

            <Typography>
                    Verb: {verb}
                </Typography>
                <Typography>
                    Subject: {subject}
                </Typography>
                <Typography>
                    Mood: {mood}
                </Typography>
                <Typography>
                    Tense: {tense}
                </Typography>
                <Button disabled={!canGetNextVerb} variant="contained" onClick={getNextVerb}>Get Next Verb</Button>

            </Stack>


            </Stack>


        </Box>

    );
}
