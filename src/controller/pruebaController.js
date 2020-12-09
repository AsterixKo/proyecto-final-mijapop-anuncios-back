const Student = require('../models/studentModel');

module.exports = {
    getStudents: async function (req, res) {
        const studentList = await Student.find();
        console.log('Respuesta de la base de datos:', studentList);
        console.log('Obtener estudiantes');
        res.send('Obtener estudiantes');
    },
    updateStudent: async function(req, res){
        const newStudent = req.body;
        
        
    },
    addStudent: async function(req, res) {
        // const studentToAdd = {
        //     name: 'Prueba',
        //     edad: 20,
        //     curso: 'FSB',
        //     altura: 180
        // }

        const studentToAdd = new Student();

        studentToAdd.nombre = 'Prueba2';
        studentToAdd.edad = 20;
        studentToAdd.curso = 'FSD';
        studentToAdd.altura = 180;

        await studentToAdd.save();
        res.send('¡Estudiante añadido!');
    }
};