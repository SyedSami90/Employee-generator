import express from 'express'
import mongoose from 'mongoose'
import Employee from './models/Employee.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

mongoose.connect('mongodb://localhost/company')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));

app.post('/employees', async (req,res)=>{
  console.log('Post request entered')
  try {
    const employeeData = req.body
    console.log(employeeData)
    const newEmployee = new Employee(employeeData)
    await newEmployee.save();

    res.status(201).json({ message: 'Saved', employee: newEmployee })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({ error: 'Could not save employee' });
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

