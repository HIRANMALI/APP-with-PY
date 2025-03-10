"use client";

import "../styles/Section2.scss"

export default function section2() {
    return (
      <section className='why-book'>
      <h2 className='why-book__title cinzel-decorative-bold'>why bOOk a Guide?</h2>
      
      {/* Comparison Table */}
      <div className='why-book__comparison'>
        <div className='why-book__column-no'>
          <h3 className="why-book__list-title kanit-light" style={{fontWeight:500,fontSize:30,}}>Self-Guided Tours</h3>
          <ul className="why-book__list-container">
            <li className="why-book__list-cross kanit-light" style={{fontWeight:500,fontSize:20}} >Limited knowledge of local culture</li>
            <li className="why-book__list-cross kanit-light" style={{fontWeight:500,fontSize:20}} >Navigation challenges</li>
            <li className="why-book__list-cross kanit-light" style={{fontWeight:500,fontSize:20}} >Language barriers</li>
            <li className="why-book__list-cross kanit-light" style={{fontWeight:500,fontSize:20}} >Time-consuming planning</li>
            <li className="why-book__list-cross kanit-light" style={{fontWeight:500,fontSize:20}} >May miss hidden gems</li>
          </ul>
        </div>
        <div className='why-book__column-yes'>
          <h3 className="why-book__list-title kanit-light" style={{fontWeight:500,fontSize:30,}} >Guided Tours</h3>
          <ul className="why-book__list-container">
            <li className="why-book__list-correct kanit-light" style={{fontWeight:500,fontSize:20}} >Expert insights & hidden spots</li>
            <li className="why-book__list-correct kanit-light" style={{fontWeight:500,fontSize:20}} >Seamless travel experience</li>
            <li className="why-book__list-correct kanit-light" style={{fontWeight:500,fontSize:20}} >Multilingual guides available</li>
            <li className="why-book__list-correct kanit-light" style={{fontWeight:500,fontSize:20}} >Optimized time & itinerary</li>
            <li className="why-book__list-correct kanit-light" style={{fontWeight:500,fontSize:20}} >Exclusive local experiences</li>
          </ul>
        </div>
      </div>
      
      {/* Sticky Notes Section */}
      <div className='why-book__sticky-notes'>
        <div className='why-book__note'>📍 Local Insights & Hidden Gems</div>
        <div className='why-book__note'>⏳ Time Efficiency</div>
        <div className='why-book__note'>🗣️ Language Assistance</div>
        <div className='why-book__note'>🛡️ Safety & Hassle-Free Experience</div>
      </div>
      
      {/* Testimonials */}
      <div className='why-book__testimonials'>
        <h3 className="why-book-testimonials__title" >What Travelers Say</h3>
        <p className="why-book-testimonials__review" >⭐️⭐️⭐️⭐️⭐️ "Booking a guide made our trip stress-free and way more fun!"</p>
        <p className="why-book-testimonials__review" >⭐️⭐️⭐️⭐️⭐️ "Our guide showed us places we would have never found alone."</p>
      </div>
    </section>
)};