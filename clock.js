/* ------- begin model ------- */
function ClockModel () {
   
    let myClockView = null;
    let timer = null;
   
    let myTimezone;
    let radius = 150;
    const settings = {
      clock:{radius: radius, 
             lenToNum: (radius*0.85), 
             numRadius: (radius*0.1),
             color: 'white',
             numColor: 'red'},
      arrows:{hourLen:(radius/2),  hourWidth: (radius*0.06),
              minuteLen: (radius*0.6),minuteWidth: (radius*0.04),
              secLen: (radius*0.75), secWidth: (radius*0.02),
              color: 'green'},  
      coordinates: [],
      timezones: ["America/New_York",
                  "Europe/London",
                  "Europe/Berlin",
                  "Europe/Minsk",
                  "Asia/Tokyo",
                  "Asia/Vladivostok"],
    };
    

    this.init = function(view,timezone) {
        myClockView = view;

        this.setParams();
        this.setTimezone(timezone);
        myClockView.updateTimezone(myTimezone);
        myClockView.draw();
        this.start()
    }

    this.setTime = function(){
      let date = new Date();
      let tzDate = new Date(date.toLocaleString('en-US', { timeZone: myTimezone })); // timezone date
      
      let hour = tzDate.getHours();
      let min = tzDate.getMinutes();
      let sec = tzDate.getSeconds();
      let curTime = {};			
      // for DOM & SVG
      curTime.hourPos = hour*360/12 + ((min * 360/60)/12) - 90;
      curTime.minPos = (min * 360/60) + (sec* 360/60)/60 - 90;
      curTime.secPos = sec * 360/60 - 90;
      // for canvas
      curTime.hourPosCnv = (hour*Math.PI/6) + (min*Math.PI/(6*60))+ (sec*Math.PI/(360*60));
      curTime.minPosCnv = (min*Math.PI/30) + (sec*Math.PI/(30*60));            
      curTime.secPosCnv = (sec * Math.PI/30);	
      // send time to view
      myClockView.update(curTime);
    }

    this.setInterval = () => timer = setInterval(this.setTime,1000);

    this.clearInterval = () => clearInterval(timer);

    this.setTimezone = timezone => myTimezone = timezone;

    this.start = () => {
      this.setTime();
      this.setInterval();
    }
    
    this.setParams = function(){
      //coordinates for num circles
      let angle = 0;
      for (let i = 0; i < 12; i++) {
        settings.coordinates[i] = {};
        settings.coordinates[i].x = settings.clock.radius + settings.clock.lenToNum*Math.sin(angle);
        settings.coordinates[i].y = settings.clock.radius - settings.clock.lenToNum*Math.cos(angle);
        angle+=30/180*Math.PI;						
      }
      //send results to view
      myClockView.setParams(settings);
    }
    
  }

//   function createList(){
//     for ( let i = 0; i < arr.length; i++){            
//         let num = getRandomNum(0, 6);             
//         if (nums.indexOf(num) < 0) {
//             nums[i] = num;
//             currentArr[i] = arr[num];//заполняем массив текущими значениями
//             createElem('div', arr[num],parent,arr[num],'list');
//             document.getElementById(arr[num]).draggable = true;
//         } else {i--;}
//     }
// }




