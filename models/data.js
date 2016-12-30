let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema;

let departmentSchema = new Schema(
    {
        name: {
            type: String, required:true
        },
        p: {
            type: String, required: true
        },
        vp: {
            type: [String], default: []
        },
        members: {
            type: [String], default: []
        }
    },
    {
        collection: 'departments'
    }
);

// Priority:
//     0: Applicant
//     1: Member
//     2: Dept VP
//     4: VP
//     5: P

let memberSchema = new Schema(
    {
        firstName: {
            type: String, required: true
        },
        firstNameEnglish: {
            type: String, required: true
        },
        chineseName: {
            type: String
        },
        stunum: {
            type: String, required: true, unique: true
        },
        wechat: {
            type: String
        },
        lastName: {
            type: String, required: true
        },
        preferredName: {
            type: String
        },
        birthday: {
            type: String, required: true
        },
        gender: {
            type: String, required: true
        },
        email: {
            type: String, required: true
        },
        UTmail: {
            type: String, required: true, default: "N/A"
        },
        major: {
            type: String, required: true
        },
        year: {
            type: String, required: true
        },
        phone: {
            type: String
        },
        department: {
            type: []
        },
        // for tech members
        rank: {
            type: "number"
        },
        // for alpha => beta assessments
        assessment: {
            type: "number"
        },
        // if the member is participating any projects
        // project: {
        //     project: [Schema.Types.ObjectId]
        // },
        priority: {
            type: "number", default: 1
        }
    },
    {
        collection: 'members'
    }
);

// userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

mongoose.connect('mongodb://localhost/membersdb');

let schema = {'Member': mongoose.model('Member', memberSchema),
              'Department': mongoose.model('Department', departmentSchema)
};
module.exports = schema;