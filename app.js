const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(express.json())
morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :body - :response-time ms'))



const persons = [
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


// GET API/TASKS
app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const phone = persons.find(task => task.id === Number(id));
  
    if (!phone) {
        res.status(404).json({ message: `Phone not found with id: ${id}` });
    } else {
        res.json(phone);
      }
})


app.delete('/api/persons/:id',(req, res)=>{
    const id = req.params.id;
    const person = persons.find((person)=>{
      return person.id === Number(id);
  })

    if(!person){
      res.status(404).json({Message: "not found"})
    }
    else{res.json(person)}
  })

  app.post('/api/persons',(req, res)=>{
    const id = Math.round(Math.random()*10000)
    const newPerson = {id, ...req.body}

    try{
      if(newPerson.name.length === 0 || newPerson.number.length === 0){
        res.status(400).json({Message: "entrada no valida"})
        throw new SyntaxError("incomplete data");
  
      }else{
        console.log(newPerson)
        persons.push(newPerson)
        res.status(201).json({Message: "Contacto aregado"})
      }    
    } catch(e){
      console.error(`[ERROR]: this is the error ${e}`)
    }

    })  
    
const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`)
