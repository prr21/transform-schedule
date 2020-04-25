class BakerieSchedule {
    constructor(schedule, title){
        this.schedule = schedule;
        this.title = title;
        this.weekSchedule = [];
    }

    distributeDays(){
        let week = this.schedule;
        let daysOff = [];
        let daysInterval = [];          // Interval of similar days (could be single day)
        let prevDay = week.monday;      // Previous day

        for (const day in week) {
            let currDay = week[day];    // Current day

            if (currDay.day_off) {
                daysOff.push(day);
                // IF today is weekend, we convert previous days
                if (daysInterval.length){                   
                    this.daysToStr(daysInterval, prevDay);
                    daysInterval = [];
                }

            } else if (prevDay.day_off){
                daysInterval = [day];

            } else if (currDay.order_before == prevDay.order_before && currDay.days_before_order == prevDay.days_before_order){
                daysInterval.push(day);

            } else {
                this.daysToStr(daysInterval, prevDay);  // Conver similar days in string
                daysInterval = [day];
            }
            prevDay = currDay;
        }

        if (daysInterval.length) {
            this.daysToStr(daysInterval, prevDay)       // Convert the rest days in string
        }
        if (daysOff.length) {                              
            this.daysOffToStr(daysOff);                 // Convert weekends to string
        }

    }
    
    daysToStr(dayNames, { order_before, days_before_order }){

        const time = order_before ? `Before <b>${order_before / 60}:00</b>,` : '';
        const daysBeforeStr = days_before_order > 1 ? 'days' : 'day';

        let dayNameStr = dayNames[0];
        if (dayNames.length > 1){
            dayNameStr = dayNames[0] + '-' + dayNames[ dayNames.length-1 ];
        }

        let string = `<span>For ${dayNameStr}</span>: ${time}<i> ${days_before_order} ${daysBeforeStr}</i> before`
        this.weekSchedule.push(string);
    }

    daysOffToStr(arr){
        let string = `<span>${ arr.join(', ') }</span>: closed`;
        this.weekSchedule.push(string);
    }


    extractToHTML(){
        let div = document.createElement('div');
        let ul = document.createElement('ul');

        div.className = "schedule";
        ul.className = "schedule-list";

        this.weekSchedule.forEach(dailySchedule => {
            let li = document.createElement('li');
            li.innerHTML = dailySchedule;

            ul.appendChild(li);
        });

        div.innerHTML = `<h4 class="bakeries-title">${this.title}</h4>`;
        div.appendChild(ul);
        containerDiv.appendChild(div);
    }

}
