let fs = require('fs');
// var courseObj;

// read ta info
fs.readFile('./demo.json', 'utf-8', function(err, data) {
    if (err) throw err;
    let memberObj = JSON.parse(data);
    // console.log(data);
    // console.log(memberObj);

    for (let i = 0; i < memberObj.length; i++) {
        let newDept=[]
        for (let j = 0; j < memberObj[i].department.length; j++) {
            let d = {};
            if (memberObj[i].department == "alpha") {
                newDept["beta"] = "assessing";
            }
            newDept[memberObj[i].department[j]] = "active";
        }
        memberObj[i].department = newDept;
    }
    console.log(memberObj);
});
