var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    username : { type:String, lowercase:true, required:true, unique:true},
    science : { type:Number, required:true },
    social : { type:Number, required:true },
    language : { type:Number, required:true },
    maths : { type:Number, required:true},
    english    : { type:Number, required:true },
    total    : { type:Number },
    average    : { type:Number }
});

subjectSchema.pre('save', function(next){
    var subjects = this;
    subjects.total = subjects.science + subjects.social + subjects.language + subjects.maths + subjects.english;
    subjects.average = subjects.total/5;   
    next();
    
})



module.exports = mongoose.model('Subjects', subjectSchema);

