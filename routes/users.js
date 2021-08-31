const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/',(req,res)=>{
    res.render('homepage')
});

router.get('/form',(req,res)=>{
    res.render('users')
});

router.post('/create',(req,res)=>{
    var f_name = req.body.f_name;
    var email = req.body.email;
    var country = req.body.country;

    var sql = `INSERT into tbldetails (name, email, city) VALUES ("${f_name}", "${email}", "${country}")`;
    db.query(sql, (err, data)=> { 
        if (err) throw err;
           console.log("User data is inserted successfully "); 
    });
    res.redirect('/users/viewdata');  // redirect to user form page after inserting the data 
})

router.get('/viewdata',(req,res)=>{
    var sql = `SELECT * from tbldetails`;
    db.query(sql,(err,data)=>{
        if(err) throw err;
            res.render('userdetails', {users : data})
    });
})

router.get('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var sql = `DELETE from tbldetails WHERE id = ?`;
    db.query(sql,[id],(err,data)=>{
        if(err) throw err;
            console.log(data.affectedRows + "record(s) updated");
    })
    res.redirect('/users/viewdata');
})

router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    var sql = `SELECT * from tbldetails WHERE id = ${id}`;
    db.query(sql,(err,data)=>{
        if(err) throw err;
            res.render('user-edit',{users:data[0]})
    })
})

router.post('/edit/:id',(req,res,next)=>{
    var id = req.params.id;
    var data = req.body;
    var sql = `UPDATE tbldetails SET ? WHERE id = ${id}`;
    db.query(sql,[data],(err,data)=>{
        if(err) throw err;
            console.log(data.affectedRows + "record(s) updated");
    })
    res.redirect('/users/viewdata')
})

module.exports = router;