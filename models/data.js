let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema;

let departmentSchema = new Schema(
    {
        name: {
            type: String, required: true
        },
        p: {
            type: String, required: true
        },
        vp: {
            type: [String], default: []
        },
        members: {
            type: [], default: []
        }
    },
    {
        collection: 'departments'
    }
);

let notificationSchema = new Schema (
    {
        owner: {
            type: String, required: true
        },
        title: {
            type: String
        },
        source: {
            type: String, required: true
        },
        read: {
            type: "boolean", default:false, required: true
        },
    }, {
        collection: 'notifications'
    }
);

let eventSchema = new Schema (
    {
        initiator: {
            type: String, required: true
        },
        department: {
            type: String, required: true
        },
        date: {
            type: "date", required: true
        },
        location: {
            type: String, required: true
        }
    }, {
        collection: 'notifications'
    }
);

let applicationSchema = new Schema (
    {
        applicant: {
            type: String, required: true
        },
        type: {
            type: String, required: true
        },
        department: {
            type: String, required: true
        }
    }
);

// Priority:
//     0: Applicant
//     1: Member
//     2: Dept VP
//     3: VP
//     4: P

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
        notifications: {
            type: [String], default: []
        }
        // if the member is participating any projects
        // project: {
        //     project: [Schema.Types.ObjectId]
        // },
        // level: {
        //     type: "number", default: 1
        // }
    },
    {
        collection: 'members'
    }
);

memberSchema.plugin(passportLocalMongoose, {usernameField: 'utmail'});

mongoose.connect('mongodb://localhost/adacorndb');

let schema = {'Member': mongoose.model('Member', memberSchema),
              'Department': mongoose.model('Department', departmentSchema)
};
module.exports = schema;
