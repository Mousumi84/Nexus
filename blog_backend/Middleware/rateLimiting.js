const AccessSchema = require("../Schemas/AccessSchema");

const rateLimiting = async (req,res,next) => {
    const SId = req.session.id;
    const Time = Date.now();
    const RL = 10;
    
    try {
        const EntryExist = await AccessSchema.findOne({ sessionId : SId });
        
        // 1. If no entry in DB
        if(!EntryExist) {
            const accessObj = new AccessSchema({
                sessionId : SId,
                time : Time,
            });

            await accessObj.save();

            return next();
        }

        //-------------------------------------- 
        // If entry exist
        
        // Compare the time
        const diff = (Time - EntryExist.time) / 1000;       // seconds
        
        // 2. If Time less than RL
        if(diff < RL)
        {
            return res.send({
                status:429,
                message:"Too many request, please wait for some time",
            });
        }

        // 3. If Time greater than RL
        const UpdateEntry = await AccessSchema.findOneAndUpdate({ sessionId : SId },{ time : Time });

        next();
    } catch (error) {
        console.log(error);
        return res.send({
            status:500,
            message:"DataBase Error abc",
            error:error, 
        });
    }
}

module.exports = rateLimiting;