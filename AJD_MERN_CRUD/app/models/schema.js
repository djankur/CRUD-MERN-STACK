const mongoose = require('mongoose')

const Schema = mongoose.Schema


//schema  for the database

const formSchema = new Schema({
    sl_id:{
        type: Number
    },
    fullname:{
        type: String,
         required: 'This field is required'
        },
    email:{
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
        //  validate: {
        //     validator: function(value) {
        //       return value === 'correct@example.com';
        //     },
        //     message: 'Invalid email.',
        //   }

    },
    phone:{
        type: String,
        validate: /^\d{10}$/,
          required: [true, 'User phone number required']
        
    },
    pwd:{
        type: String,
        required: true,
       // match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
       // minlength:5
    },
    conpwd:{
        type: String,
        required: true
    },
   
    role:{
        type: String,
        default:'Client'
    }

   },
   {timestamps:true}
    );

    


var form= mongoose.model('form', formSchema); //'form' is the table name

module.exports = form; 

//module.exports= mongoose.model('schema', formSchema)