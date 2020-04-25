document.addEventListener("DOMContentLoaded", getData);

const containerDiv = document.querySelector('#container');

async function getData(){
    const bakerieData = await connect(_dataUrl);
    const allbakeriesData = await connect(_allDataUrl);
    
    createSchedule(bakerieData.schedule, bakerieData.name);
    allbakeriesData.map( bkr => createSchedule(bkr.schedule, bkr.name) )
}

function createSchedule(week, bakerieName){
    let schedule = new BakerieSchedule(week, bakerieName);
    
    schedule.distributeDays();
    schedule.extractToHTML();
}