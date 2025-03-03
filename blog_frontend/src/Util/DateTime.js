function updateDate(date) {
    const today=Date.now();
    const timediff=today - date;
    const day= timediff/(1000*60*60*24);
    const sec= timediff/(1000);
    

    if(sec < 60) {
        return "now";
    }
    else if(sec > 60) {
        const min= parseInt(sec/60);

        if(min < 60) {
            return `${min} minutes ago`;
        }
        else if(min > 60) {
            const hr= parseInt(min/60);

            if(hr < 24) {
                return `${hr} hours ago`;
            }
            else if(hr > 24) {
                const day= parseInt(hr/24);

                if(day < 365) {
                    return `${day} days ago`;
                }
            }
        }
    }
     
    return date;
}

module.exports={updateDate};