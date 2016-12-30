let db = require('../models/data');

let helper = {
    sort: {
        // lastName: function(a, b) {
        //     // console.log(a.lastName  +  b.lastName);
        //     // return a.lastName - b.lastName;
        //     if (a.lastName > b.lastName) {
        //         return 1;
        //     } else if (a.lastName < b.lastName) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // },
        // stunum: function(a, b) {
        //     if (a.stunum > b.stunum) {
        //         return 1;
        //     } else if (a.stunum < b.stunum) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // }
    },
    parse: {
        department: function(array) {
            for (let i = 0; i < array.length; i++) {
                let dept = array[i].department.split(",");
                let allDept = {};
                for (let j = 0; j < dept.length; j++) {
                    allDept[dept[j]] = "active";
                    if (dept[j] == "alpha") {
                        alldept["beta"] = "assess";
                    }
                }

            }
        }
    }
}

module.exports = {
    getHome: function(req, res) {
        // db.Member.find({},
        //     function(err, members) {
        //         if (err) {
        //             return res.send("Error: Cannot get all members");
        //         } else {
        //             return res.render("index.html", {
        //                 members: helper.sort.byLastName(members)
        //             });
        //         }
        //     });
        return res.render("index.html", {
            user: {
                "lastName": "Jiang",
                "firstName": "Jiacheng",
                "firstNameEnglish": "Ajax",
                "chineseName": "蒋佳成",
                "preferredName": "Ajax",
                "phone": "6477679106",
                "email": "ajax.jiang@mail.utoronto.ca",
                "UTmail": "ajax.jiang@mail.utoronto.ca",
                "stunum": "1001359996",
                "wechat": "AjaxJiang96",
                "department": [{
                    "dept": "core",
                    "status": "active"
                }, {
                    "dept": "design",
                    "status": "active"
                }],
                "year": "3",
                "status": "active",
                "major": "Computer Science"
            }
        });
    },

    getAllMembers: function(req, res) {
        db.Member.find({},
            function(err, members) {
                if (err) {
                    return res.send("Error: Cannot get all members");
                } else {
                    // switch(req.query.sort) {
                    //     case "stunum":
                    //         members.sort(helper.sort.stunum)
                    //         break;
                    //     default:
                    //         members.sort(helper.sort.lastName)
                    //         break;
                    // }
                    return res.render("members.html", {
                        members: members.sort(function(a, b) {
                            if (a[req.query.sort] > b[req.query.sort]) {
                                return 1;
                            } else if (a[req.query.sort] < b[req.query.sort]) {
                                return -1;
                            } else {
                                return 0;
                            }

                        })
                    });
                }
            })
    },

    getAddMember: function(req, res) {
        // id authentication needed
        res.render("addmember.html");
    },

    addMember: function(req, res) {
        let newMember = new db.Member(req.body);
        newMember.save(function(err) {
            if (err) {
                console.log(err);
                return res.send(err);
            } else {
                console.log("Save success");
                res.send("success");
            }
        });
    },

    getAllDepartments: function(req, res) {
        db.Department.find({}, function(err, departments) {
            if (err) {
                return res.send(err);
            }
            return res.render("departments.html", {
                departments: departments
            });
        });
    },

    parseDept: function(req, res) {
        let fs = require('fs');
        // var courseObj;

        // read ta info
        fs.readFile('./demo.json', 'utf-8', function(err, data) {
            if (err) throw err;
            let memberObj = JSON.parse(data);
            // console.log(data);
            // console.log(memberObj);

            for (let i = 0; i < memberObj.length; i++) {
                let newDepts = [];
                for (let j = 0; j < memberObj[i].department.length; j++) {
                    let newDept = {};
                    newDept.dept = memberObj[i].department[j];
                    newDept.status = "active";
                    newDepts.push(newDept);
                }
                memberObj[i].department = newDepts;
            }
            res.send(memberObj);
        });
    },

    parseDeptJSON: function(req, res) {
        let fs = require('fs');
        // var courseObj;

        // read ta info
        fs.readFile('./demoparsed.json', 'utf-8', function(err, data) {
            if (err) throw err;
            let memberObj = JSON.parse(data);
            // console.log(data);
            // console.log(memberObj);
            let departs = {
                "core": {
                    "name": "Core",
                    "p": "Zhu Bihan",
                    "vp": [],
                    "members": []
                },
                "design": {
                    "name": "Design",
                    "p": "Jiang Jiacheng",
                    "vp": [],
                    "members": []
                },
                "marketing": {
                    "name": "marketing",
                    "p": "Feng Jinyue",
                    "vp": [],
                    "members": []
                },
                "beta": {
                    "name": "beta",
                    "p": "Yu Shunzhe",
                    "vp": ["Yan Ruoshui"],
                    "members": []
                },
                "alpha": {
                    "name": "alpha",
                    "p": "Yu Shunzhe",
                    "vp": ["Yan Ruoshui"],
                    "members": []
                },
                "pr": {
                    "name": "pr",
                    "p": "Yu Shunzhe",
                    "vp": ["Yan Ruoshui"],
                    "members": []
                },
                "hr": {
                    "name": "hr",
                    "p": "Yu Shunzhe",
                    "vp": ["Yan Ruoshui"],
                    "members": []
                },
                "sponsor": {
                    "name": "sponsor",
                    "p": "Yu Shunzhe",
                    "vp": ["Yan Ruoshui"],
                    "members": []
                }
            }
            db.Member.find({},
                function(err, members) {
                    if (err) {
                        return res.send("Error: Cannot get all members");
                    } else {
                        for (let i = 0; i < members.length; i++) {
                            console.log(members);
                            for (let j = 0; j < members[i].department.length; j++) {
                                departs[members[i].department[j].dept].members.push({
                                    id: members[i]._id,
                                    status: members[i].department[j].status
                                });
                            }
                        }
                        res.send(departs);
                    }
                });

        });
    },

    deleteMember: function(req, res) {
        // for (let i = 0; i < req.body.members.length; i++) {
        db.Member.remove({
            _id: {
                $in: req.body.members
            }
        }, function(err) {
            if (err) {
                res.send(err)
            } else {
                res.redirect("/m");
            }
        });
        // }
    }
}
