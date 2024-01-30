const app = require('express').Router();
const pool = require('../db');

// Create a measurement record
app.post("/measurement-record", async (req, res) => {
    try {
        const { cname, cgender, PhoneNumber } = req.body;

        // Insert customer
        const [newCustomer] = await pool.promise().query('INSERT INTO customer(name, gender, phone) VALUES (?, ?, ?)', [cname, cgender, PhoneNumber], (err) => {
            if (err) {
                console.log("ERROR: ", err)
                res.json({
                    status: "failed",
                    message: "error saving customer record to db "
                })
            }
        });
        const customerId = newCustomer.insertId;


        const { created, clothtype, pickup, rfrequency, rdate, notes, material, completed } = req.body;

        const tid = 123;
        //inserting/creating order
        const [newOrder] = await pool.promise().query('INSERT INTO orders (tid, cid, created, clothtype, pickup, rfrequency, rdate, notes, material, completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [tid, customerId, created, clothtype, pickup, rfrequency, rdate, notes, material, completed], (err) => {
            if (err) {
                console.log("Ordererror: ", err)
                res.json({
                    status: "failed",
                    message: "error saving order details"
                })
            } else {
                res.json({
                    status: "success!",
                    message: "order created successfully!"
                })
            }
        })
        const orderId = newOrder.insertId;


        const {
            Chest_Bust, Waist, Hips, Shoulder_Width, Sleeve_Length, Armhole, Neck_Circumference,
            Back_Length, Front_Length, Inseam, Outseam, Thigh_circumference, Knee_Circumference,
            Calf_Circumference, Ankle_circumference, Collar_Size, Wrist_Circumference, Bicep_Circumference
        } = req.body;

        // Measurement record 
        const [measurementRecord] = await pool.promise().query('INSERT INTO measurement (order_id, Chest_Bust, Waist, Hips, Shoulder_Width, Sleeve_Length, Armhole, Neck_Circumference, Back_Length, Front_Length, Inseam, Outseam, Thigh_circumference, Knee_Circumference, Calf_Circumference, Ankle_circumference, Collar_Size, Wrist_Circumference, Bicep_Circumference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [orderId, Chest_Bust, Waist, Hips, Shoulder_Width, Sleeve_Length, Armhole, Neck_Circumference,
                Back_Length, Front_Length, Inseam, Outseam, Thigh_circumference, Knee_Circumference,
                Calf_Circumference, Ankle_circumference, Collar_Size, Wrist_Circumference, Bicep_Circumference], (err) => {
                    if (err) {
                        console.log("measurementRecord ERROR: ", err)
                        res.json({
                            status: "failed",
                            message: "error saving measurement record to db "
                        })
                    }
                });

                console.log(cname, Chest_Bust,)
        res.json({
            status: "success",
            message: "record created successfully",
            customerId: customerId,
            measurementId: measurementRecord.insertId,
            OrderId: orderId
            
        });
    } catch (error) {
        console.error("error: ", error);
        res.status(500).json({
            status: "failed",
            message: "error creating new measurement record"
        });
    }
    
});


// Get all records
app.get('/measurement-record', async (req, res) => {

    try {
        const allRecords = await pool.promise().query('SELECT * FROM measurement')

        res.json({
            status: "success",
            data: allRecords[0]
        });

    } catch (error) {
        console.log("error: ", error)
        res.json({
            status: "failed",
            message: "Error getting measurements from database"
        })
    }

})


// search particular customer record.....   MORE WORK TO BE DONE HERE 
app.get('/measurement-record/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [customer] = await pool.promise().query('SELECT * from customer WHERE name =?', [id]);
        const customerId = customer[0].id
        const [order] = await pool.promise().query('SELECT * FROM orders WHERE cid =?', [customerId]);
        const orderId = order[0].id;
        const [Record] = await pool.promise().query('SELECT * FROM measurement WHERE order_id =?', [orderId]);

        res.json(Record)


    } catch (error) {
        console.log('error: ', error)
        res.json({
            status: "failed",
            message: `error fetching record with id ${req.params.id}`
        })

    }
})


// Delete record
app.delete('/measurement-record/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [customer] = await pool.promise().query('SELECT * from customer WHERE name =?', [id]);
        const customerId = customer[0].id
        const [order] = await pool.promise().query('SELECT * FROM orders WHERE cid =?', [customerId]);
        const orderId = order[0].id;
        const [Record] = await pool.promise().query('DELETE FROM measurement WHERE order_id =?', [orderId]);

        res.json(`Record with id ${id} deleted successfully`)

    } catch (error) {
        console.log("error: ", error);
        res.json({
            status: "failed",
            message: "error deleting record"
        })

    }
})

// Update record
// Reminders


//TEE ADD TAILOR DB LOGIN AND CREATION 


module.exports = app;