  function getInfo(){
    const inp2 = document.querySelector(".country").value;
    var list = [0,0,0,0,0,0];
    clear();
    var bar_ctx = document.getElementById('bar-chart').getContext('2d');
    
    var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(0, '#fbe1d2');
    purple_orange_gradient.addColorStop(1, 'black');
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${inp2}&appid=4b49b66c977879c9915a688302785b74&units=metric`,
      success: function (data) {
        for(var i = 0 ;i<data.list.length ;i++)
        {
          if(Math.round(data.list[i].main.temp_max)<15)
          {
            list[0]=list[0]+1;
          }
          if(Math.round(data.list[i].main.temp_max)>=16 && Math.round(data.list[i].main.temp_max)<=18)
          {
            list[1]=list[1]+1;
          }
          if(Math.round(data.list[i].main.temp_max)>=19 && Math.round(data.list[i].main.temp_max)<=21)
          {
            list[2]=list[2]+1;
          }
          if(Math.round(data.list[i].main.temp_max)>=22 && Math.round(data.list[i].main.temp_max)<=24)
          {
            list[3]=list[3]+1;
          }
          if(Math.round(data.list[i].main.temp_max)>=25 && Math.round(data.list[i].main.temp_max)<=27)
          {
            list[4]=list[4]+1;
          }
          if(Math.round(data.list[i].main.temp_max)>=28 )
          {
            list[5]=list[5]+1;
          }
        }
        var bar_chart = new Chart(bar_ctx, {
          type: 'bar',
          data: {
            labels: ["less than 15","16 - 18","19 - 21","22 - 24","25 - 27","28 or Greater" ],
            datasets: [{
              label: 'Temperature',
              data: list,
              backgroundColor: purple_orange_gradient,
              hoverBackgroundColor: purple_orange_gradient,
              hoverBorderWidth: 2,
              hoverBorderColor: 'black'
            }]
          },
          options: {
            scales: {
          yAxes: [{
                // ticks: {
                //   beginAtZero:true
                // }
              }]
            }
          }
        });
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function clear() {
    var canvas = document.getElementById("bar-chart");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}