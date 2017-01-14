let db = require('../models/data');

let user = {
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
    "profilePhoto": "http://i-7.vcimg.com/trim/3bfdbfddb7e4eef342f4b38f944c3ed192396/trim.jpg",
    "department": [{
        "dept": "core",
        "status": "active",
        "level": 1
    }, {
        "dept": "design",
        "status": "active",
        "level": 4
    }],
    "year": "3",
    "status": "active",
    "major": "Computer Science"
}

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
    login: function(req, res) {
        console.log("login: " + req.body.UTmail + " " + req.body.password);
        let email = req.body.UTmail;
        db.Member.authenticate()(email, req.body.password, function(err, user, options) {
            if (err) {
                return res.send("Cannot log the user in.");
            }
            if (user === false) {
                res.send('Username or password invalid. Please try again.');
            } else {
                req.login(user, function(err) {
                    if (err) {
                        return res.send("Cannot log the user in. Please try again.");
                    }
                    res.redirect('/');
                });
            }
        });
    },

    logout: function(req, res) {
        // clear session, return to main page
        req.logout();
        res.redirect('/');
    },

    getDashboard: function(req, res) {
        if (req.params.id) {
            return res.send(req.params.id)
        } else {
            return res.render("index.html", {
                user: req.user
            });
        }
    },
    getProfile: function(req, res) {
        if (req.params.id) {
            return res.send(req.params.id)
        } else {
            return res.render("profile.html", {
                user: req.user
            });
        }
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

                        }),
                        user: req.user
                    });
                }
            })
    },

    getAddMember: function(req, res) {
        // id authentication needed
        res.render("addmember.html", {
            user: req.user
        });
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
            for (let i = 0; i < departments.length; i++) {
                departments[i].count = 0;
                for (let j = 0; j < departments[i].members.length; j++) {
                    if (departments[i].members[j].status == "active") {
                        departments[i].count++;
                    }
                }
                console.log(departments[i].count);
                // console.log(departments[i]);
            }
            return res.render("departments.html", {
                departments: departments,
                user: req.user
            });
        });
    },

    getDept: function(req, res) {
        console.log(req.params.dept);
        db.Department.findOne({
            name: req.params.dept
        }, function(err, dept) {
            if (err) {
                return res.send(err);
            } else {
                if (dept) {
                    let members = [];
                    db.Member.find({
                            _id: {
                                $in: dept.members
                            }
                        },
                        function(err, members) {
                            if (err) {
                                return res.send(err);
                            } else {
                                console.log(members);

                                return res.render("department.html", {
                                    dept: dept,
                                    members: members,
                                    user: req.user
                                });
                            }
                        })
                } else {
                    res.send("Error: department not found");
                }
            }
        });

    },

    getSearch: function(req, res) {
        //get search page
        res.render("search.html", {
            user: req.user
        });
    },

    getEvents: function(req, res) {
        //get event page
        res.render("events.html", {
            user: req.user
        });
    },

    getApplications: function(req, res) {

    },

    getNotifications: function(req, res) {

    },

    parseDept: function(req, res) {
        let fs = require('fs');
        // var courseObj;

        // read ta info
        fs.readFile('./demoparsed.json', 'utf-8', function(err, data) {
            if (err) throw err;
            let memberObj = JSON.parse(data);
            // console.log(data);
            // console.log(memberObj);

            for (let i = 0; i < memberObj.length; i++) {
                let inalpha, inbeta = false;
                for (let j = 0; j < memberObj[i].department.length; j++) {
                    if (memberObj[i].department[j].dept == "alpha") {
                        inalpha = true;
                    }
                }
                for (let k = 0; k < memberObj[i].department.length; k++) {
                    if (memberObj[i].department[k].dept == "beta") {
                        inbeta = true;
                    }
                }
                if (inalpha && !inbeta) {
                    memberObj[i].department.push({
                        dept: "beta",
                        level: 0,
                        status: "assessing"
                    })
                }
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
                    "vp": ["Yan Ruoshui", "Zhou Zehui", "Zhu Zining", "Yang Jiushan"],
                    "members": []
                },
                "alpha": {
                    "name": "alpha",
                    "p": "Zhang Ci",
                    "members": []
                },
                "pr": {
                    "name": "pr",
                    "p": "Zhang Chi",
                    "members": []
                },
                "hr": {
                    "name": "hr",
                    "p": "Xu Zhicheng",
                    "vp": ["Ye Zhimo"],
                    "members": []
                },
                "sponsor": {
                    "name": "sponsor",
                    "p": "Zhu Bihan",
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
                                // departs[members[i].department[j].dept].members.push({
                                //     id: members[i]._id,
                                //     status: members[i].department[j].status,
                                //     level: members[i].department[j].level
                                // });
                                departs[members[i].department[j].dept].members.push(members[i]._id);
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
    },

    initialize: function(req, res) {
        db.Member.find({}, function(err, users) {
            if (err) res.send(err);
            for (let i = 0; i < users.length; i++) {
                db.Member.findOne({
                    UTmail: users[i].UTmail
                }, function(err, user) {
                    user.setPassword(user.stunum, function(err) {
                        if (!err) {
                            user.save(function(err) {
                                if (err) {
                                    console.log(user.stunum + " Fail save ");
                                } else {
                                    console.log(user.stunum + "success");
                                }

                            });
                        } else {
                            console.log(user.stunum + " Fail Set ");
                        }
                    });
                });
            }
            return res.send("done");
        });
    }
    // initialize: function(req, res) {
    //     db.Member.findOne({
    //         stunum: "1002795040"
    //     }, function(err, user) {
    //         user.setPassword("1002795040", function(err) {
    //             if (!err) {
    //                 user.save(function(err) {
    //                     if (err) {
    //                         return res.send(err);
    //                     } else {
    //                         return res.send("Success");
    //                     }
    //                 });
    //             } else {
    //                 return res.send("Fail Set");
    //             }
    //         });
    //     });
    // }
}
