import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';

export default function FaqComp({ items , handleDelete}) {
    return (
        <Accordion sx={{ boxShadow: "none", border: "0.5px solid gray", borderRadius: "10px", marginBottom: "20px" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{items.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {items.answer}
                </Typography>
            </AccordionDetails>
            <Button onClick={()=>handleDelete(items._id)} sx={{ margin: "10px" }} variant="contained">
                Delete
            </Button>
        </Accordion>
    )
}