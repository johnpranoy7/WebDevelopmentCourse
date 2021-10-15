const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html")
})

app.post("/", function (req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    console.log(`fName:${fName} lName:${lName} email: ${email}`);
    const data =
    {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }

        }]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/4ea967e614/members";
    const options = {
        method: "POST",
        user    : "john:dc83e28c7000d07280b4de11605f290f-us5"
    }
    const request = https.request(url, options, function(request, response){
        console.log("sending request to malChimp")
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);

})

app.listen(port, () => { console.log("Listening on port:" + port) })
