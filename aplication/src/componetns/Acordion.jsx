import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { FaChevronDown } from "react-icons/fa/";

export const MyAcordion = ({ title, children }) => {
  return (
    <Accordion elevation={0} disableGutters className="acordion">
      <AccordionSummary
        className="summary"
        expandIcon={<FaChevronDown className="icon" />}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className="ditales">{children}</AccordionDetails>
    </Accordion>
  );
};
