function ClockController () {
    let myClockContainer = null;
    let myClockModel = null;
    let myTimezone;
    let btns = null;
    

    this.init = function(model,container,timezone) { // получаем кнопки и вешаем обработчики
        myClockContainer = container;
        myClockModel = model;
        myTimezone = timezone;

        selectTimezone = myClockContainer.querySelector(".select_timezone");
        btns = myClockContainer.querySelectorAll("button");

        btns.forEach((btn) => {
            if (btn.classList.contains('start')) {
                btn.addEventListener('click', this.startClocks);
            }
            if (btn.classList.contains('stop')) {
                btn.addEventListener('click', this.stopClocks);
            }
        });
        selectTimezone.addEventListener('change',this.selectHandler);

        this.setTimezone(myTimezone);
    }

    this.selectHandler = (e) => {
      e.preventDefault();
      myTimezone = e.target.value;
      this.setTimezone(myTimezone);
    }

    this.startClocks = (e) => {
        e.preventDefault();
        myClockModel.start();
    }

    this.stopClocks = (e) => {
      e.preventDefault();
      myClockModel.clearInterval();
    }
    
    this.setTimezone = (timezone) => {
      myClockModel.setTimezone(timezone);
    }   
  };
/* ------ end controller ----- */