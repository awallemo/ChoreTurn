import { Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export const TodoItem = (
    {   title,
        description,
        deleteFn
      }:
        {   title: string,
            description: string,
            deleteFn: () => void
        }
) => {

    return (
        <Accordion
            sx={{
                // maxWidth: '300px',
                // marginBottom: '10px',
            }}>
            <AccordionSummary sx={{
                display: 'flex',
                justifyContent: 'space-between', // Align items to the start and end
                alignItems: 'center', // Vertically center items
            }}>
                {/* This is the clickable header of the accordion */}
                {title}
                <IconButton aria-label="delete" onClick={deleteFn}>
                    <DeleteIcon />
                </IconButton>
            </AccordionSummary>
            
            <AccordionDetails>
                {/* This is the content that will be shown/hidden */}
                {description}
            </AccordionDetails>
        </Accordion>
    )
}