
const form = require('../models/schema')


const bcrypt=require('bcrypt')

function mainDis()
{

    return{

        home(req,res)
        {
          res.render('public/home',{
            viewTitle: "THIS IS HOME PAGE"
           });
       },
    
       reg(req,res)
        {
         res.render('public/reg',{
          viewTitle: "Registration"
         });
       },
    
       regpost(req,res)
       {   
        if (req.body._id == '')
         {
           insert(req,res);
          }
         else
         { update(req,res);
           
         }
       },

       login(req,res)
       {
        res.render('public/login',{
         viewTitle: "LogIn"
        });
      },

      loginpost(req,res)
      {
        form.findOne({ email: req.body.email }, (err, doc) => {
          if (doc) {
      
            if (doc.pwd == req.body.pwd) {
              //console.log("Done Login");
              //req.session.userId = doc._id;
              
              console.log(req.session.userId);
              res.send({ "Success": "Success!" });
              res.redirect('/')
      
            } else {
              res.send({ "Success": "Wrong password!" });
            }
          } else {
            res.send({ "Success": "This Email Is not regestered!" });
          }
        });
      },

      list(req,res)
      { 
        //res.send("save");
        form.find((err, docs) => {
         if (!err) {
             res.render("public/list", {
               
                 viewTitle: "Inserted Employee Data",
                 List: docs
             },
            
             );
         }
         else {
             console.log('Error in retrieving employee list :' + err);
         }
     });
     
      

    } ,
    edit(req,res){
     
        form.findById(req.params.id, (err, doc) => {
                  if (!err) {
                  
                    
                      res.render("public/reg", {
                        
                          viewTitle: "Update Employee",
                          Edit: doc
                      });
                      
                    
                  }
              });
       },
  
     
    delete(req, res) 
       {
          form.findByIdAndRemove(req.params.id, (err, doc) => {
          if (!err) {
              res.redirect('/list');
              console.log(req.params.id ,"Deleted")
          }
          else { console.log('Error in employee delete :' + err); }
      });
      }
     
}
}

async function insert(req,res){
  
          const{fullname,email,phone,pwd,conpwd}=req.body //fullname,email,pwd are name declare in form
  
          // if(req.body.fullname=='' || req.body.email=='')
          if(!fullname ||!email ||!phone )
            {
             
              req.flash('error','All fields are reqd.')
              req.flash('fullname', fullname)
              req.flash('email', email)
              req.flash('phone', phone)
              res.redirect('/reg')
            }
            else

            if(req.body.pwd!=req.body.conpwd)
            {
              
              req.flash('error','password not macth')
              req.flash('fullname', fullname)
              req.flash('email', email)
              req.flash('phone', phone)
              res.redirect('/reg')
          
            }

            form.exists({email: email},(err,result)=>{

                if(result){
                  req.flash('error','This email already exist !')
                  req.flash('fullname', fullname)
                  req.flash('phone', phone)
                  res.redirect('/reg')
                }

              })

              //hash passwrd
                const hashpwd = await bcrypt.hash(pwd,10)
                const chashpwd = await bcrypt.hash(conpwd,10)

                //create user

              const Form = new form()

              Form.fullname = req.body.fullname
              Form.email = req.body.email
              Form.phone=req.body.phone
              Form.pwd = hashpwd
              Form.conpwd=chashpwd 
             
              Form.save((err,doc)=>{
                if(!err)
                {
                  //res.json('We have saved your record')
                  console.log("Succesfull registered")
                  req.flash('success','Succesfull')
                  res.redirect('/login'); //calling list.ejs

                }
                else{
                  console.log("error ,check main.js" +err)
                  req.flash('error','Something went wrong!')
                  res.redirect('/reg')
                }
              })
   
}

     
  
  

function update(req,res){
    form.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if (!err)
       { 
         res.redirect('/list'); 
        }
      else {
        
         // if (err.name == 'ValidationError')
          if(err) {
            
            handleValidationError(err, req.body);
         
              res.render("public/reg", {
                  viewTitle: 'Update Employee',
                  Edit: req.body
         
              });

          }
          else
              console.log('Error during record update : ' + err);
      }
  });
}


module.exports = mainDis




           //res.send('We have saved your record')
          // res.render('public/login', {message : 'Thank you for your submission'})
          //res.redirect('/login'); //calling list.ejs
           //res.redirect('/list'); //calling list.ejs