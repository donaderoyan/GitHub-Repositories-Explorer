import React, { useState } from 'react';
import { AccordionData } from './accordion.type';
import AccordionItem from './AccordionItem';
import './Accordion.css';

interface AccordionProps {
  items: AccordionData[];
  handleClick: Function
}

const Accordion = ({ items, handleClick }: AccordionProps) => {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1));
    
      handleClick(idx)
    
    
  };

  return (
    <ul className="accordion">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          data={item}
          isOpen={idx === currentIdx}
          btnOnClick={() => btnOnClick(idx)}
        />
      ))}
    </ul>
  );
}

export default Accordion;