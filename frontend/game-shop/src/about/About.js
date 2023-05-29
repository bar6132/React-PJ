import React from 'react'
import background from '../image/home.jpg'
import './About.css';

function About() {

  return (<>
    <div className="hbg"
      style={{
        backgroundImage: `url(${background})`,
      }}
        >
        <div>
            <h1 className='title'> אודות האתר </h1>
        </div>
        <div className='right'> 
            <h3 className='p'>אתר זה נבנה ע"י שני חברים שאוהבים לשחק משחקי מחשב, סוני, אקסבוקס ונינטנדו ורוצים לדאוג לאנשים כמוהם למצוא משחקים יד שניה במחירים שפוים למשחקים שכולנו אוהבים </h3>
        </div> 
    <h3 className='left'>אתר זה נבנה ללא מטרת רווח ונועד לשימוש לכל החפצים בו  </h3>
    </div>

    </>)
}           

export default About