const Reminder = (pickupDate, frequency)=>{

}

function calculateNextReminderDate(pickupDate, frequency) {
    const nextReminderDate = new Date(pickupDate);

    switch (frequency) {
        case "weekly":
            nextReminderDate.setDate(nextReminderDate.getDate() + 7);
            break;
        case "bi-weekly":
            nextReminderDate.setDate(nextReminderDate.getDate() + 14);
            break;
        // Add more cases for other frequency options as needed

        default:
            // Handle unsupported frequency
            throw new Error("Unsupported frequency");
    }

    return nextReminderDate.toISOString().split('T')[0];
}

// Create a measurement record
app.post("/measurement-record", async (req, res) => {
    try {
        // ... (your existing code)

        const { pickup, rfrequency } = req.body;

        // Calculate the next reminder date based on the pickup date and frequency
        const nextReminderDate = calculateNextReminderDate(new Date(pickup), rfrequency);

        // Insert reminder date into the database
        await pool.promise().query('UPDATE orders SET next_reminder_date = ? WHERE id = ?', [nextReminderDate, orderId]);

        // ... (your existing code)

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
