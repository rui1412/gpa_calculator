var Userdb = require('../model/model')

//create and save Course
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be emtpy"})
        return;
    }

    //new course
    const course = new Userdb({
        Course:req.body.Course,
        Grade:req.body.Grade,
        Credits:req.body.Credits
    })

    //save data in the database
    course
        .save(course)
        .then(data =>{
            //res.send(data)
            res.redirect('/')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Some error occurred"
            });
        });
}

//retrieve and return all Courses / retrive and return a single course
exports.find = (req,res)=> {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Coudln't find Course with id: " + id})
                } else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving Course with id: " + id})
            })

    } else {
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured when retriving data"})
        })
    }


}

//update a Course
exports.update = (req,res)=> {
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data can't update"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot update data with ${id}`})
            } else {
                res.send(data)
            }
        })
        .catch (err=>{
            res.status(500).send({message:"Error Update"})
        })
}

//delete a Course
exports.delete = (req,res)=> {
    Userdb.deleteMany({
        //no filter
    }).then(function(){
        res.redirect('/')
        //res.send({message: "All data deleted"})
    }).catch(err=>{
        res.status(500).send({message:"Error with deleting"})
    })
}