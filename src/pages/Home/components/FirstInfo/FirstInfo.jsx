import React from 'react'
import Button from "../../../../components/Button";
import IAhand from "../../../../assets/IAhand.png";
import "./FirstInfo.css"

const FirstInfo = () => {
  return (
    <div className="info-container">
      <section className="info-left">
        <h2 id="intro-title">MACHINE LEARNING</h2>
        <h2 id="generic-title" className="title-large">FEDERATED LEARNING</h2>
        <p>Esta plataforma es una solución innovadora que permite entrenar modelos de inteligencia artificial de manera descentralizada. Mediante esta tecnología, los dispositivos individuales pueden colaborar en el proceso de entrenamiento sin compartir sus datos directamente. </p>
        <div className="button-wrapper">
          <Button big>
            INFORMACIÓN
          </Button>
        </div>
      </section>

      <section className='info-right'>
        <img src={IAhand} alt="Hand IA image" className='info-image'></img>
      </section>
    </div>
  )
}

export default FirstInfo
