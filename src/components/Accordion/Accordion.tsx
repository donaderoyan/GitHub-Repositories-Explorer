import React, { useState } from 'react';
import { AccordionData } from './accordion.type';
import AccordionItem from './AccordionItem';
import './Accordion.css';

interface AccordionProps {
  items: AccordionData[];
  handleClick: Function;
  children: React.ReactNode;
  isLoading: boolean;
}

const Accordion = ({ items, handleClick, isLoading, children }: AccordionProps) => {
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
          isLoading={isLoading}
          btnOnClick={() => btnOnClick(idx)}
        >
          {children}
        </AccordionItem>
      ))}
    </ul>
  );
}

export default Accordion;