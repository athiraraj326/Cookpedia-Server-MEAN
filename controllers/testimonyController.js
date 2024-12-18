const testimonials = require('../models/testimonyModal')

// add testimony
exports.addTestimonyController = async (req,res)=>{
    console.log("Inside addTestimonyController");
    const {name,email,message} = req.body
    try{
        const newTestimony = new testimonials({
            name,email,message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all feedback
exports.getAllFeedbackController = async (req,res)=>{
    console.log("Inside getAllFeedbackController");
    try{
        const allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
}

// feedback status update
exports.updateFeedbackStatusController = async (req,res)=>{
    console.log("Inside updateFeedbacckStatusController");
    // get feedback id from url
    const {id} = req.params
    // get status of feedback from url query
    const status = req.query.status
    // update status of feedback with given id
    try{
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all approved feedback
exports.getAllApprovedFeedbackController = async (req,res)=>{
    console.log("Inside getAllApprovedFeedbackController");
    try{
        const allApprovedFeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
}