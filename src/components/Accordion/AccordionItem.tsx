import { useEffect, useMemo, useRef, useState } from 'react';
import { getRefValue } from '@/hooks/refValue';
import { AccordionData } from './accordion.type';
import './accordionItem.css';

interface AccordionItemProps {
  data: AccordionData;
  isLoading: boolean;
  isOpen: boolean;
  btnOnClick: () => void;
  children: React.ReactNode;
}

const AccordionItem = ({isOpen, data, btnOnClick, isLoading, children} : AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  

  // useEffect(() => {
  //   if (isOpen) {
  //     const contentEl = getRefValue(contentRef);

  //     setHeight(contentEl.scrollHeight);
  //   } else {
  //     setHeight(0);
  //   }
  // }, [isOpen]);

  useMemo(() => {
      if(Object.keys(data).length !== 0) {
        if (isOpen) {
          const contentEl = getRefValue(contentRef);
    
          setHeight(1);
        } else {
          setHeight(0);
        }
        
      } 
    }, [data, isOpen]);

  return (
    <li className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <div className="accordion-item-title">
        <div className="accordion-item-btn" onClick={btnOnClick}>
          <div className="accordion-item-title-content">
            <img src={data.avatar_url} alt={data.title} height={50} width={50}/>
            <p>{data.title}</p>
            <a
              href={data.url}
              className="gitbtn py-1 px-1 font-small text-black bg-black-100 rounded hover:bg-black-500 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="accordion-item-container" style={{ height: height == 1 ? "auto" : 0}}>
        <div ref={contentRef} className="accordion-item-content">
          {!isOpen ? (
            <></>
          ) : (
            <>
                {children}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default AccordionItem;

