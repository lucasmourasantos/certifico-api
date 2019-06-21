var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next){
    // render to views/user/add.ejs
    res.render('index', {
        title: 'CERTIFICO | Home',
        name: '',
        email: ''
    })
})

    router.get('/instituicao', function(req, res, next){
        // render to views/user/add.ejs
        res.render('instituicao-create', {
            title: 'Cadastro de Instituição',
            name: '',
            email: ''
        })
    })

    router.post('/instituicao', function(req, res, next){
        req.assert('nome', 'Nome is required').notEmpty()           //Validate nome

        var errors = req.validationErrors()

        if( !errors ) {   //No errors were found.  Passed Validation!


            var user = {
                nome: req.sanitize('nome').escape().trim()
            }

         connection.query('INSERT INTO instituicao SET ?', user, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)

                        // render to views/user/add.ejs
                        res.render('instituicao-create', {
                            title: 'Cadastro de Instituição'
                        })
                    } else {
                        req.flash('success', 'Instituicao cadastrada com sucesso!');
                        res.redirect('/instituicao');
                    }
                })
        }
        else {   //Display errors to user
            var error_msg = ''
            errors.forEach(function(error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            /**
             * Using req.body.name
             * because req.param('name') is deprecated
             */
            res.render('instituicao-create', {
                title: 'Cadastro de Instituição'
            })
        }
    })


    router.get('/evento', function(req, res, next){

        connection.query('SELECT * FROM instituicao ORDER BY nome asc',function(err,rows)     {

               if(err){
                req.flash('error', err);
                res.render('evento-create',{title:"Cadastro de Eventos",data:''});
               }else{

                   res.render('evento-create',{title:"Cadastro de Eventos",data:rows});
               }
          });
    })

    router.post('/evento', function(req, res, next){
        req.assert('id', 'Nome is required').notEmpty()           //Validate nome
        req.assert('nome', 'Sexo is required').notEmpty()           //Validate nome

        var errors = req.validationErrors()

        if( !errors ) {   //No errors were found.  Passed Validation!
            var user = {
                instituicao_id: req.sanitize('id').escape().trim(),
                nome: req.sanitize('nome').escape().trim()
            }

         connection.query('INSERT INTO evento SET ?', user, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)

                        // render to views/user/add.ejs
                        res.render('evento-create', {
                            title: 'Cadastro de Evento'
                        })
                    } else {
                        req.flash('success', 'Evento cadastrado com sucesso!');
                        res.redirect('/evento');
                    }
                })
        }
        else {   //Display errors to user
            var error_msg = ''
            errors.forEach(function(error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            /**
             * Using req.body.name
             * because req.param('name') is deprecated
             */
            res.render('evento-create', {
                title: 'Cadastro de Evento'
            })
        }
    })

    router.get('/curso', function(req, res, next){
        // render to views/user/add.ejs
        connection.query('SELECT * FROM evento ORDER BY nome asc',function(err,rows)     {

               if(err){
                req.flash('error', err);
                res.render('curso-create',{title:"Cadastro de Curso",data:''});
               }else{

                   res.render('curso-create',{title:"Cadastro de Curso",data:rows});
               }
          });
    })

    router.post('/curso', function(req, res, next){
        req.assert('id_evento', 'Evento is required').notEmpty()           //Validate nome
        req.assert('nome', 'Nome is required').notEmpty()           //Validate nome
        req.assert('ministrante', 'Ministrante is required').notEmpty()           //Validate nome
        req.assert('ch', 'Carga Horária is required').notEmpty()           //Validate nome
        req.assert('ch_min', 'Carga Horária Mínima is required').notEmpty()           //Validate nome
        req.assert('inicio', 'Data de Início is required').notEmpty()           //Validate nome
        req.assert('fim', 'Data de Fim is required').notEmpty()           //Validate nome
        req.assert('turno', 'Turno is required').notEmpty()           //Validate nome

        var errors = req.validationErrors()

        if( !errors ) {   //No errors were found.  Passed Validation!
            var user = {
                evento_id: req.sanitize('id_evento').escape().trim(),
                nome: req.sanitize('nome').escape().trim(),
                ministrante: req.sanitize('ministrante').escape().trim(),
                ch: req.sanitize('ch').escape().trim(),
                ch_min: req.sanitize('ch_min').escape().trim(),
                inicio: req.sanitize('inicio').escape().trim(),
                fim: req.sanitize('fim').escape().trim(),
                turno: req.sanitize('turno').escape().trim()
            }

         connection.query('INSERT INTO curso SET ?', user, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)

                        // render to views/user/add.ejs
                        res.render('curso-create', {
                            title: 'Cadastro de Participante'
                        })
                    } else {
                        req.flash('success', 'Curso cadastrado com sucesso!');
                        res.redirect('/curso');
                    }
                })
        }
        else {   //Display errors to user
            var error_msg = ''
            errors.forEach(function(error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            /**
             * Using req.body.name
             * because req.param('name') is deprecated
             */
            res.render('curso-create', {
                title: 'Curso de Participante'
            })
        }
    })

    router.get('/inscricao', function(req, res, next){
      // render to views/user/add.ejs

      res.render('inscricao-create', {
          title: 'Pré-inscricao Online',
          name: '',
          email: ''
      })
    })

/*
router.get('/inscricao', function(req, res, next){
  // render to views/user/add.ejs

  let res_points, res_types;
      connection.query('SELECT * FROM evento ORDER BY nome asc', (err, result) => {
          if (err) {
              res.redirect('/inscricao');
          }
          connection.query('SELECT * FROM curso ORDER BY nome asc', (err2, result2) => {
              if(err2) {
                  res.redirect('/inscricao');
              }
              res.render('inscricao-create', {
                  title: "Inscrição",
                  evento: result,
                  curso: result2
              });
          });
      });
})
*/

    router.post('/inscricao-2/:cpf', function(req, res, next){

      let res_points, res_types;

          connection.query('SELECT * FROM participante WHERE cpf =?' req.body.cpf, (err, result) => {
              if (err) {
                  res.redirect('/inscricao');
              }
              connection.query('SELECT * FROM evento ORDER BY nome asc', (err2, result2) => {
                  if(err2) {
                      res.redirect('/inscricao');
                  }
                  res.render('inscricao-create-2', {
                      title: "Inscrição",
                      participante: result,
                      evento: result2
                  });
              });
          });
    })

    router.get('/certificado', function(req, res, next){
        // render to views/user/add.ejs
        res.render('certificado-create', {
            title: 'Gerar Certificado',
            name: '',
            email: ''
        })
    })
    router.get('/certificado-gerar', function(req, res, next){
        // render to views/user/add.ejs
        res.render('certificado-gerar', {
            title: 'Gerar Certificado',
            name: '',
            email: ''
        })
    })
    router.get('/certificado-verificar', function(req, res, next){
        // render to views/user/add.ejs
        res.render('certificado-verificar', {
            title: 'Gerar Certificado',
            name: '',
            email: ''
        })
    })
    router.get('/participante', function(req, res, next){
        // render to views/user/add.ejs
        res.render('participante-create', {
            title: 'Cadastro de Participante',
            name: '',
            email: ''
        })
    })

    router.post('/participante', function(req, res, next){
        req.assert('nome', 'Nome is required').notEmpty()           //Validate nome
        req.assert('sexo', 'Sexo is required').notEmpty()           //Validate nome
        req.assert('rg', 'RG is required').notEmpty()           //Validate nome
        req.assert('cpf', 'CPF is required').notEmpty()           //Validate nome
        req.assert('data_nasc', 'Data de Nascimento is required').notEmpty()           //Validate nome
        req.assert('cep', 'CEP is required').notEmpty()           //Validate nome
        req.assert('rua', 'Rua is required').notEmpty()           //Validate nome
        req.assert('bairro', 'Bairro is required').notEmpty()           //Validate nome
        req.assert('cidade', 'Cidade is required').notEmpty()           //Validate nome
        req.assert('uf', 'Estado is required').notEmpty()           //Validate nome

        var errors = req.validationErrors()

        if( !errors ) {   //No errors were found.  Passed Validation!
            var user = {
                nome: req.sanitize('nome').escape().trim(),
                sexo: req.sanitize('sexo').escape().trim(),
                rg: req.sanitize('rg').escape().trim(),
                cpf: req.sanitize('cpf').escape().trim(),
                data_nasc: req.sanitize('data_nasc').escape().trim(),
                cep: req.sanitize('cep').escape().trim(),
                rua: req.sanitize('rua').escape().trim(),
                bairro: req.sanitize('bairro').escape().trim(),
                cidade: req.sanitize('cidade').escape().trim(),
                estado: req.sanitize('uf').escape().trim(),
                fone: req.sanitize('fone').escape().trim()
            }

         connection.query('INSERT INTO participante SET ?', user, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)

                        // render to views/user/add.ejs
                        res.render('participante-create', {
                            title: 'Cadastro de Participante'
                        })
                    } else {
                        req.flash('success', 'Participante cadastrado com sucesso!');
                        res.redirect('/participante');
                    }
                })
        }
        else {   //Display errors to user
            var error_msg = ''
            errors.forEach(function(error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            /**
             * Using req.body.name
             * because req.param('name') is deprecated
             */
            res.render('participante-create', {
                title: 'Cadastro de Participante'
            })
        }
    })

// SHOW ADD USER FORM
router.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    res.render('add', {
        title: 'Add New Customers',
        name: '',
        email: ''
    })
})

// ADD NEW USER POST ACTION
router.post('/add', function(req, res, next){
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!


        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

     connection.query('INSERT INTO customers SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('add', {
                        title: 'Add New Customer',
                        name: user.name,
                        email: user.email
                    })
                } else {
                    req.flash('success', 'Data added successfully!');
                    res.redirect('/');
                }
            })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('add', {
            title: 'Add New Customer',
            name: req.body.name,
            email: req.body.email
        })
    }
})

// SHOW EDIT USER FORM
router.get('/edit/(:id)', function(req, res, next){

connection.query('SELECT * FROM customers WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Customers not found with id = ' + req.params.id)
                res.redirect('/')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('edit', {
                    title: 'Edit Customer',
                    //data: rows[0],
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email
                })
            }
        })

})

// EDIT USER POST ACTION
router.post('/update/:id', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()           //Validate nam           //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {

        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

connection.query('UPDATE customers SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('edit', {
                        title: 'Edit Customer',
                        id: req.params.id,
                        name: req.body.name,
                        email: req.body.email
                    })
                } else {
                    req.flash('success', 'Data updated successfully!');
                    res.redirect('/');
                }
            })

    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('edit', {
            title: 'Edit Customer',
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        })
    }
})

// DELETE USER
router.get('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }

connection.query('DELETE FROM customers WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/')
            } else {
                req.flash('success', 'Customer deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/')
            }
        })
   })


module.exports = router;
