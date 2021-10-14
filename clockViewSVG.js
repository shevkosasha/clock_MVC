function ClockViewSVG() {
    let myClock = null;
    let clockDiv = null; 
    
    let hourArrow = null;
    let minArrow = null;    
    let secArrow = null;

    let mySetting = null;

    this.init = function(clock) {
        myClock = clock;
        clockDiv = myClock.querySelector(".clock_container");
    }

    this.draw = function(){
        
        let radius = mySetting.clock.radius;
        let numRadius = mySetting.clock.numRadius;
        clockDiv.setAttribute('width',`${radius*2}`);
        clockDiv.setAttribute('height',`${radius*2}`);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class','clockSVG');
        svg.setAttribute('width', `${radius*2}`);
        svg.setAttribute('height', `${radius*2}`);
        svg.setAttribute('version', '1.1');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");
        clockDiv.appendChild(svg);

        const svgBlock = clockDiv.querySelector('.clockSVG');
		svgBlock.setAttribute("width", `${radius*2}`);
		svgBlock.setAttribute("height", `${radius*2}`);

		this.createCircle(svgBlock,radius,radius,radius,mySetting.clock.color);
        // draw number circles
        for (let i = 0; i < 12; i++) {
			this.createCircle(svgBlock, numRadius, mySetting.coordinates[i].x, mySetting.coordinates[i].y,  mySetting.clock.numColor);	

			let text=document.createElementNS("http://www.w3.org/2000/svg",'text');
            text.setAttribute("x",mySetting.coordinates[i].x);
            text.setAttribute("y",mySetting.coordinates[i].y + numRadius/3);
            text.setAttribute("stroke","black");
            text.setAttribute("fill","black");				
            text.setAttribute("text-anchor","middle");
            text.innerHTML = (i == 0)?'12':i;				
            svgBlock.appendChild(text);
		}

        // this.drawArrow (parent,length,x1,y1,x2,width,id)
        this.drawArrow(svgBlock, mySetting.arrows.hourLen, radius, radius+20, radius, mySetting.arrows.hourWidth, 'hour_arrow');
        this.drawArrow(svgBlock, mySetting.arrows.minuteLen, radius, radius+20, radius, mySetting.arrows.minuteWidth, 'min_arrow');  
        this.drawArrow(svgBlock, mySetting.arrows.secLen, radius, radius+20, radius, mySetting.arrows.secWidth, 'sec_arrow'); 

        hourArrow = myClock.querySelector(`.hour_arrow`);
        minArrow = myClock.querySelector(`.min_arrow`);
        secArrow = myClock.querySelector(`.sec_arrow`);
    }
    
    this.createCircle = function(parent,rad,coorX,coorY,color){
        let circle=document.createElementNS("http://www.w3.org/2000/svg",'circle');
        circle.setAttribute("stroke",color);
        circle.setAttribute("fill",color);
        circle.setAttribute("r",rad);			
        circle.setAttribute("cx",coorX);
        circle.setAttribute("cy",coorY);
        parent.appendChild(circle);
    }
    

    this.drawArrow = function(parent,length,x1,y1,x2,width,id) {
        let line=document.createElementNS("http://www.w3.org/2000/svg",'line');
        line.setAttribute("stroke",mySetting.arrows.color);
        line.setAttribute("fill",mySetting.arrows.color);
        line.setAttribute("x1",x1);
        line.setAttribute("y1",y1);
        line.setAttribute("x2",x2);
        line.setAttribute("y2",`${y1 -length}`);
        line.setAttribute("stroke-width",width);
        line.setAttribute("transform",`rotate(0 ${mySetting.clock.radius} ${mySetting.clock.radius})`);
        line.classList.add(id);
        line.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");
        parent.appendChild(line);
    }

    this.update = function(time){
        hourArrow.setAttribute("transform",`rotate(${time.hourPos+90} ${mySetting.clock.radius} ${mySetting.clock.radius})`);
        minArrow.setAttribute("transform",`rotate(${time.minPos+90} ${mySetting.clock.radius} ${mySetting.clock.radius})`);
        secArrow.setAttribute("transform",`rotate(${time.secPos+90} ${mySetting.clock.radius} ${mySetting.clock.radius})`);
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

    this.updateTimezone = timezone =>  myClock.querySelector('.select_timezone').value = timezone;
  
}	
		

