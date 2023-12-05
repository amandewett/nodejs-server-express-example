import { Router } from "express";

//Init router
const router = Router();

//create new user
router.post("/create", (req, res) => {
    try {
        //reading values from request body
        const name = req.body.name;
        const email = req.body.email;

        //query to create a single new user
        const query = `insert into users (name, email) values ("${name}", "${email}")`;
        //using GLOBAL database variable which we declared in root server file
        database.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(201).json({
                    status: false,
                    message: err.sqlMessage
                });
            }
            else {
                res.json({
                    status: true,
                    message: `User created successfully`
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.statusCode(201).json({
            status: false,
            message: `An error occurred, please check server logs`
        });
    }
});

//create multiple users
router.post("/create/multi", (req, res) => {
    try {
        //reading values from request body
        const arrData = req.body.data;

        //query to create multiple users at once
        const query = `insert into users (name, email) values ?`;
        const userData = [];
        arrData.map((e) => userData.push([e.name, e.email]));
        //using GLOBAL database variable which we declared in root server file
        database.query(query, [userData], (err, result) => {
            if (err) {
                console.log(err);
                res.status(201).json({
                    status: false,
                    message: err.sqlMessage
                });
            }
            else {
                res.json({
                    status: true,
                    message: `Users created successfully`
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.statusCode(201).json({
            status: false,
            message: `An error occurred, please check server logs`
        });
    }
});

//update user details
router.put("/update", (req, res) => {
    try {
        //reading values from request body
        const userId = req.body.id;
        const userName = req.body.name;
        const userEmail = req.body.email;

        //query to update user details
        const query = `update users set name = "${userName}", email = "${userEmail}" where id = ${userId}`;
        //using GLOBAL database variable which we declared in root server file
        database.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(201).json({
                    status: false,
                    message: err.sqlMessage
                });
            }
            else {
                res.json({
                    status: true,
                    message: `User updated successfully`
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.statusCode(201).json({
            status: false,
            message: `An error occurred, please check server logs`
        });
    }
});

//get list of all users
router.get("/list", (req, res) => {
    try {
        //wrote query to get list of all users from database
        const query = `select * from users`;
        //using GLOBAL database variable which we declared in root server file
        database.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(201).json({
                    status: false,
                    message: err.sqlMessage
                });
            }
            else {
                res.json({
                    status: true,
                    result: result
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.statusCode(201).json({
            status: false,
            message: `An error occurred, please check server logs`
        });
    }
});

//get user details
router.get("/details/:id", (req, res) => {
    try {
        //reading values from request parameters
        const userId = req.params.id;

        //query to get user details
        const query = `select * from users where id = ${userId} limit 1`;
        //using GLOBAL database variable which we declared in root server file
        database.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(201).json({
                    status: false,
                    message: err.sqlMessage
                });
            }
            else {
                res.json({
                    status: true,
                    result: result
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.statusCode(201).json({
            status: false,
            message: `An error occurred, please check server logs`
        });
    }
});

//delete user details
router.delete("/delete/:id", (req, res) => {
    try {
        //reading values from request parameters
        const userId = req.params.id;

        //query to delete single user
        const query = `delete from users where id = ${userId}`;
        //using GLOBAL database variable which we declared in root server file
        database.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(201).json({
                    status: false,
                    message: err.sqlMessage
                });
            }
            else {
                res.json({
                    status: true,
                    message: `User deleted successfully`
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.statusCode(201).json({
            status: false,
            message: `An error occurred, please check server logs`
        });
    }
});



export default router;