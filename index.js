const express = require('express');
const path =require('path');

const db=require('./config/mongoose')                   //import the config file which include the connection with the database

const Contact = require('./models/contacts');           // import the database defination
const port = 8000;

const app=express();

//Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());                          //use for the encode the url into the ip address.
app.use(express.static('assets'));                      //use the css, js, images etc resources


/*Middleware1
app.use(function(req,res,next){
    req.myName="Bhavesh";
    // console.log("middleware1 called");
    next();
});


//middleware2
app.use(function(req,res,next){
    console.log("My Name in mw2",req.myName);
    next();
});

var contactList=[
    {
        name:"Bhavesh",
        phone:"2121313211"
    },
    {
        name:"Tony Bhaiya",
        phone:"0000000000"
    },
    {
        name:"Gopu",
        phone:"1234567980"
    }
];*/


//Home page rendering
app.get('/',function(req,res){
    /**/


    Contact.find({}, function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from DB');
            return;
        }

        return res.render('home', {
            title:"Contacts List",
            contact_list: contacts
        });
    });
});

//Create Contacts and return to the same page & simultaneously send the data to the database
app.post('/create-contact',function(req, res){
    /*contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    contactList.push(req.body);
    console.log(req.body);
    return res.redirect('/practice');*/




    Contact.create({                              //or Contact.create(req.body,function(err,newCont){});
        name:req.body.name,
        phone:req.body.phone
    },function(err, newCont){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*********',newCont);
        return res.redirect('back');
    });
});

/*app.get('/practice', function(req,res){
    return res.render('practice', {
        title:"Let's play with ejs"
    });
});*/



//for deleting the contact
app.get('/delete-contact/',function(req,res){
    //get the id from query in the url
    
    let id=req.query.id;

    //finding the data in the database using id and then delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error deleting an object from database ");
            return;
        }
        return res.redirect('/');
    });


    /*let contactIndex=contactList.findIndex(contact=>contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }*/

});

app.listen(port, function(err){
    if(err){
        console.log("Error!");
    }
    console.log("Yup my express server is running on Port: "+port);
});

