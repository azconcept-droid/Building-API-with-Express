const express = require('express')
const app = express()

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.post('/api/courses', (req, res) => {
    if ( !req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be 3 characters long')
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course);
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.delete('/api/courses/:id',(req, res)=>{
    // find the course with the id
    const course = courses.find(c => c.id === parseInt(req.params.id))

    // confirm if it exist
    if (!course) {
        res.status(404).send('The course with the given ID was not found')
    }

    // Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    // Return the deleted course
    res.send(course)
})
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// })


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
