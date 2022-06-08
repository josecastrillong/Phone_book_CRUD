const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(express.json())
morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :body - :response-time ms'))



let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  }
]


app.get('/info', (request, res) => {
    res.send(`<h1>Phone book has info for ${persons.length}</h1><p>${new Date()}</p>`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const phone = persons.find(task => task.id === Number(id));

  try {
    if (!phone) {
      throw new Error(`Person with id ${id} not found`);
    }
    res.status(200).json(phone);
  } catch (error) {
    res.status(400).json( `ERROR: ${error}` );
  }
});


app.delete('/api/persons-delete/:id',(req, res)=>{
    const id = req.params.id;
    let person = persons.find(person => person.id === Number(id));

    try {
      if (!person) {
        throw new Error(`Person with id ${id} not found`);
      }
      persons = persons.filter(person => person.id !== Number(id));
      res.status(200).json(`Person with id ${id} deleted`);
    } catch (error) {
      res.status(400).json( `ERROR: ${error}` );
    }
});

  app.post('/api/persons-post',(req, res)=>{
    const id = Math.round(Math.random()*10000)
    const newPerson = {id, ...req.body}

    try{
      if(newPerson.name.length === 0 || newPerson.number.length === 0){
        res.status(400).json({Message: "entrada no valida"})
        throw new SyntaxError("incomplete data");
      }else if(persons.find(person => person.name === newPerson.name)){
        res.status(400).json({Message: "name already exists"})
        throw new Error("name already exists");
      }
      else{
        console.log(newPerson)
        persons.push(newPerson)
        res.status(201).json({Message: "Contacto aregado"})
      }    
    } catch(e){
      console.error(`ERROR: this is the error ${e}`)
    }
  });  
    
const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`)
