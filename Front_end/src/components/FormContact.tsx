import React from 'react';
import Form from 'react-bootstrap/Form'
import { Row, Col, Button } from 'react-bootstrap';

const FormContact: React.FC  = () => (
 <>
<div className="containerContact">

 <Form id="formContact">
    <Form.Group as={Row} controlId="formHorizontalEmail">
    <div id="formTitle">Solicitar Contato:</div>
      <Form.Label id="formEmail" column sm={8}>
        Email
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="email" placeholder="Email" />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formHorizontalPassword">
      <Form.Label id="formMessage" column sm={8}>
        Message
      </Form.Label> 
      <Col sm={10}>
        <Form.Control type="text" placeholder="Message" />
      </Col>
    </Form.Group>
   <fieldset>
    <Form.Group as={Row}>
      <Form.Label id="formService" as="legend" column sm={8}>
        Tipos de Serviços:
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Atendimento em Arteterapia"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Oficinas Criativas"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="Mentoria de Novos Artistas"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
       </Col>
     </Form.Group>
   </fieldset>
     <br></br>
     <Form.Group as={Row}>
       <Col sm={{ span: 10, offset: 2 }}>
         <Button id="btn-formContact" variant="dark" type="submit">Submit</Button>
       </Col>
     </Form.Group>
 </Form>

</div>
    </>  
    );
    
    
    export default FormContact;