import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Chip, Box, TextField } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function VerbList(props) {

    const { verbList, setVerbList, addVerb, removeVerb } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const parseAndAddVerbs = () => {
        let verbsArray = document.getElementById("verbs-to-add").value.split(',');
        verbsArray.forEach((verb) => {
            const v = verb.trim();
            const isVerbInList = verbList.includes(v);
            if (!isVerbInList) {
                addVerb(v);
            }
        });
        handleClose();
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Verbs</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add list of verbs seperated by commas (whitespace is allowed).
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="verbs-to-add"
                        label="Enter verbs here."
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={parseAndAddVerbs}>Add Verbs</Button>
                </DialogActions>
            </Dialog>

            <h2>Verbs to Practice</h2>
            <br/>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />}>
                Add Verbs to List

            </Button>



            <Box sx={{ p: 2, border: '1px solid grey', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {verbList !== null ? (
                    verbList.map((verb, index) => {
                        return <Chip key={index} label={verb} onDelete={() => removeVerb(verb)} />;
                    })
                ) : <div></div>}

            </Box>

        </div>


    );
}

