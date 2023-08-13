function createGraph() {
  const data = JSON.parse(localStorage.getItem("status"));
  const rounds = data.map(item => item.id);
  const blueScores = data.map(item => item.blueScore);
  const redScores = data.map(item => item.redScore);
  console.log(teamBlueScore, teamRedScore)

  const ctx = document.getElementById('scoreChart').getContext('2d');
  const scoreChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: rounds,
      datasets: [{
          label: 'Blå',
          data: blueScores,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
        },
        {
          label: 'Rød',
          data: redScores,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Runde',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Score',
          },
        },
      },
    },    plugins: {
      title: {
        display: true,
        text: (ctx) => {
          const {axis = 'xy', intersect, mode} = ctx.chart.options.interaction;
          return 'Mode: ' + mode + ', axis: ' + axis + ', intersect: ' + intersect;
        }
      },
    }
  });
}