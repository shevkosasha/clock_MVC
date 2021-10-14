function ClockViewCanvas() {
    let myClock = null;
    let clockDiv = null; 
    let canvas, ctx;
    
    let hourArrow = null;
    let minArrow = null;    
    let secArrow = null;
   
    let mySetting;
    
 

    this.init = function(clock) {
        myClock = clock;
        clockDiv = myClock.querySelector(".clock_container");
        canvas = document.createElement('canvas');
        clockDiv.append(canvas);
        ctx = canvas.getContext('2d');
        // console.log(`Hi from DOM View ${myClock.id} `);
        // this.draw();
    }

    this.draw = function(hourPos = 0, minPos = 0, secPos = 0){

        let radius = mySetting.clock.radius;
        clockDiv.setAttribute('width',`${radius*2}`);
        clockDiv.setAttribute('height',`${radius*2}`);
        
        canvas.classList.add('canvas');
        canvas.width = canvas.height = radius*2;
        clockDiv.append(canvas);

        const center = canvas.height/2; //центр круга 

        this.drawCircle(mySetting.clock.color,center,center,radius,ctx);
        for (let i = 0; i < 12; i++){
            let x = mySetting.coordinates[i].x;
            let y = mySetting.coordinates[i].y;
            this.drawCircle(mySetting.clock.numColor, x, y, mySetting.clock.numRadius,ctx);
            //text  
            ctx.save(); 
            ctx.font="bold 16px Arial";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let text = (i==0)?'12':i;
            ctx.fillText(text, x, y+2);                    
            ctx.restore();      
        }
       
        // this.drawArrow = function(ctx,angle, width,length,arrEnd)
        this.drawArrow(ctx, hourPos, mySetting.arrows.hourWidth, mySetting.arrows.hourLen,10);
        this.drawArrow(ctx, minPos, mySetting.arrows.minuteWidth, mySetting.arrows.minuteLen,10);
        this.drawArrow(ctx, secPos, mySetting.arrows.secWidth, mySetting.arrows.secLen,10);
    }

    this.drawCircle = function(color,x,y,rad,ctx){
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();                   
        ctx.arc(x,y,rad,0,Math.PI*2,true);                    
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.save();
    } 

    this.drawArrow = function(ctx,angle, width,length,arrEnd) {
        let startX = canvas.height/2 - arrEnd * Math.sin(angle);
        let startY = canvas.height/2 + arrEnd * Math.cos(angle);
        let endX = canvas.height/2 + length * Math.sin(angle);                   
        let endY = canvas.height/2 - length * Math.cos(angle);
        ctx.save();
        ctx.strokeStyle = mySetting.arrows.color;
        ctx.lineWidth =width;
        ctx.lineCap="round";
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.restore();
       
    }
    this.update = function(time){
        // debugger;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(time.hourPosCnv, time.minPosCnv, time.secPosCnv);
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
        
    
    