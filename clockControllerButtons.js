function ClockController () {
    let myClockContainer = null;
    let myClockModel = null;
    let btns = null;
    

    this.init = function(model,container) { // получаем кнопки и вешаем обработчики
        myClockContainer = container;
        myClockModel = model;

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

        // this.setTimezone(myTimezone);
    }

    this.selectHandler = (e) => {
      e.preventDefault();
      this.setTimezone(e.target.value);
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