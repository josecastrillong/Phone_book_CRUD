const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('tiny'));



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

// app.delete('/api/persons/:id', (req, res) => {
//     const id = req.params.id;
//     const personsVec = persons.filter(person => person.id != id)
//     // res.send(`User with the id ${id} deleted.`)
//     res.json(personsVec)
//   })

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


  

  app.post('/api/persons/:name&:number', (req, res) => {
      const newId = Math.floor(Math.random() * (1000 - 0));
      const newName = req.params.name;
      const newNumber = req.params.number;  

      if (newName === undefined || !newNumber === undefined) {
        res.status(404).json({ error: 'name and phone should be added' });
      } else if (newName === persons.find((person) => person.name === newName)){
          res.status(400).json({error: 'repeated name'})
      } else {
        persons.push({
            id: newId,
            name: newName,
            number: newNumber
          })
          console.log(newName + ' ' + newNumber)
          res.json(persons)
      }
    })


const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`)
