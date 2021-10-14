function ClockViewDOM() {
    let myClock = null;
    let clockDiv = null; 
    
    let hourArrow = null;
    let minArrow = null;    
    let secArrow = null;
    
    let mySetting;

    this.init = function(clock) {
        myClock = clock;
        clockDiv = myClock.querySelector(".clock_container");
    }

    this.draw = function(){
        clockDiv.style.display = 'none';
        clockDiv.style.width = clockDiv.style.height = `${2*mySetting.clock.radius}px`;
        clockDiv.style.backgroundColor = mySetting.clock.color;
        //рисуем цифры
        this.drawNums();
        //рисуем стрелки
        this.drawArrow('hour_arrow',mySetting.arrows.color, mySetting.arrows.hourLen, mySetting.arrows.hourWidth, mySetting.clock.radius, clockDiv);
        this.drawArrow('min_arrow', mySetting.arrows.color, mySetting.arrows.minuteLen,mySetting.arrows.minuteWidth, mySetting.clock.radius,clockDiv);
        this.drawArrow('sec_arrow', mySetting.arrows.color, mySetting.arrows.secLen, mySetting.arrows.secWidth, mySetting.clock.radius, clockDiv);

        hourArrow = myClock.querySelector(`.hour_arrow`);
        minArrow = myClock.querySelector(`.min_arrow`);
        secArrow = myClock.querySelector(`.sec_arrow`);
        clockDiv.style.display = 'block';
    }
     
    this.drawNums = function(){
        
         // делаем циферблат
		for (let i = 0; i < 12; i++) {			
			
            let circle = document.createElement('div');
            circle.classList.add('num');
            circle.style.width = circle.style.height = `${2*mySetting.clock.numRadius}px`;
            circle.style.backgroundColor = mySetting.clock.numColor;
            circle.style.lineHeight = `${2*mySetting.clock.numRadius}px`;											
            circle.innerHTML = i; 			
            clockDiv.append(circle); 
			if (i == 0) {circle.innerHTML = '12';}
			
			circle.style.left = `${mySetting.coordinates[i].x-15}px`;
			circle.style.top = `${mySetting.coordinates[i].y-15}px`;
		}
    }

    this.drawArrow = function(id,color,length,width,radius,parent) {
        let e = document.createElement('div');
        e.id = `${myClock.id}_${id}`;	
        e.classList.add('arrow');
        e.classList.add(id);
        e.style.backgroundColor = color;
        e.style.width = `${length}px`;
        e.style.height = `${width}px`;	
        let shift = 20;//смещение конца стрелки по оси х
        e.style.left = Math.round(radius - shift)+"px";
        e.style.top = Math.round(radius - width/2) + "px";				
        parent.append(e);
    }
    this.update = function(time){
        // debugger;
        hourArrow.style.transform = `rotate(${time.hourPos}deg)`; 
        minArrow.style.transform = `rotate(${time.minPos}deg)`;
        secArrow.style.transform = `rotate(${time.secPos}deg)`;	
    }    

    this.setParams = settings =>  {
        mySetting = settings;
        this.fillTimezones();
    }

    this.fillTimezones = () => {
        const select = myClock.querySelector('.select_timezone');
        for (let i = 0; i < mySetting.timezones.length; i++) {
            const option = document.createElement("option");
            option.value = mySetting.timezones[i];
            option.text = mySetting.timezones[i];
            select.add(option);
        }
    }

    this.updateTimezone = timezone => myClock.querySelector('.select_timezone').value = timezone;
  
}	
		

