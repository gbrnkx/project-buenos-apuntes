const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const School = require('../models/School')
const Teacher = require('../models/Teacher')
const Subject = require('../models/Subject')
const Apunte = require('../models/Apunte')

const uploadCloud = require('../config/cloudinary.js');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/test-results', (req,res,next)=>{
  Apunte.find()
  .then(apuntes=>{
    res.render('resultados', { apuntes })
    //res.send(apuntes)
  })
  .catch(e=>{
    res.send(e)
  })
})

router.post('/upload', uploadCloud.single('apunte'), (req, res, next)=>{
  if(req.isAuthenticated() && req.user.role != ''){
    Apunte.create({
      title:req.body.title,
      fileURL:req.file.url,
      idOwner:req.user._id,
      school:req.body.school,
      subject:req.body.subject,
      period:req.body.period,
      teacher:req.body.teacher
    })
    .then(apunte=>{
      res.send(apunte)
    })
    .catch(e=>{
      res.send(e)
    })
  }
//res.send(req.user)


//res.send(req.file)

})

router.get('/upload', (req,res,next)=>{
  //res.send(req.isAuthenticated())
  //res.send(req.user)
  console.log(req.isAuthenticated())

  if(req.isAuthenticated() && req.user.role != ''){

    res.render('auth/upload', req.user)

    //res.send('Hay alguien loggeado')
  } else{
    //No hay ningún usuario loggeado
    res.redirect('/auth/login')
  }
})

router.post('/subject-create',(req,res,next)=>{

  School.findOne({'short_name':{$eq:req.body.school}})
  .then(school=>{
    Subject.create({
      name:req.body.name,
      idSchool:school._id,
      idTeacher:req.body.teacher,
      period:req.body.period
    })
    .then(subject=>{
      //res.render('auth/subject-create', {teachers} )
      res.send(subject)
    })
    .catch(e=>{
      res.send(e)
    })
  })
  //res.send(req.body)
  /*

*/
})

router.get('/test-select-teachers', (req,res,next)=>{
  Teacher.find({}, {_id: 0, 'created_at': 0, 'updated_at': 0, '__v':0}).populate('idSchool', { '_id': 0, 'created_at': 0, 'updated_at': 0, '__v':0, 'logoSchool':0})
  //Teacher.find({}, {_id: 0, 'created_at': 0, 'updated_at': 0, '__v':0}).populate('idSchool', { '_id': 1, 'short_name':1})
  .then(teachers=>{
    //console.log(teachers);
    //app.locals.testTeachers = teachers
    res.render('auth/subject-create', { teachers } )
    //res.send(teachers)
  })
  .catch(e=>{
    res.send(e)
  })
})

router.post('/teacher-create', (req,res,next)=>{
  //res.send(req.body)

  Teacher.create({name:req.body.teacher, idSchool:req.body.school})
  .then(teacher=>{
    res.send(teacher)
  })
  .catch(e=>{
    res.send(e)
  })
})

router.get('/test-schools', (req, res, next) => {
  School.find()
  .then(schools=>{
    const arrSchools = []
    for(var i=0;i<schools.length;i++){
      arrSchools.push(schools[i].long_name)
    }
    res.render('auth/teacher-create',  {schools} )
    //res.send(arrSchools)
  .catch(e=>{
    res.send(e)
  })
})
})




router.get('/school-create', (req, res, next) => {
  res.render('auth/school-create')
});

router.post('/school-create', (req, res, next) => {
  //res.send(req.body)
  School.create({long_name:req.body.long_name, short_name:req.body.short_name})
.then(school=>{
  console.log('Nombre corto: '+school.short_name)
})
.catch(e=>{
  res.send(e)
})
  //res.send(req.body)
});





router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  //res.send(req.body)
  //const email = req.user.email;
  //const userPic = req.user.photo;
  req.app.locals.user = req.user
  //res.send(req.user)
  //res.send("Tu eres un usuario real con email: " + email);
  res.redirect('/');
})

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name
  if (email === "" || password === "" || name === "") {
    res.render("auth/signup", { message: "Por favor, completa los campos faltantes" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "Ya existe una cuenta asociada al email ingresado" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      name,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.app.locals.user = null
  res.redirect('/');
});


/* ESTO NO SIRVE!!!!!! MAÑANA TEMPRANO LO ARREGLO */
/* router.post('/profile', (req,res,next)=>{
  //res.send(req.isAuthenticated())
  //res.send(req.user)
  console.log(req.isAuthenticated())

  if(req.isAuthenticated() && req.user.role != ''){

    res.render('auth/profile', req.user)

    //res.send('Hay alguien loggeado')
  } else{
    //No hay ningún usuario loggeado
    res.redirect('/auth/login')
  }
}) */

module.exports = router;
