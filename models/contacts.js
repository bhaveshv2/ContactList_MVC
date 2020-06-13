const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    //fields defination
    name:{
        //Defination of schema fields and validations for that
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports= Contact;