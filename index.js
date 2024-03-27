const canvas = document.getElementById("canvas").getContext("2d");

let plot = undefined;

const setup = () => {
  plot = new Chart(canvas, {
    type: "line",
    data: { datasets: [] },
  });

  const [f1, f2, a] = [1000, 1070, 4];

  document.getElementById("f1").value = f1;
  document.getElementById("f2").value = f2;
  document.getElementById("a").value = a;
  make_plot(make_data(f1, f2, a));
}

const make_plot = (data) => {
  plot.destroy();
  plot = new Chart(canvas, {
    type: "line",
    data: {
      datasets: [
        {
          label: "U (t)",
          borderColor: "rgba(200, 77, 123, .8)",
          data: data,
          lineTension: 0.4,
          pointRadius: 0
        },
      ]
    },
    options: {
      bezierCurve: false,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "t, c" }
        },
        y: {
          type: "linear",
          position: "left",
          title: { display: true, text: "U, В" }
        }
      },
      layout: {
        padding: 50,
      },
    }
  });
}

const make_data = (f1, f2, a) => {
  const result = [];

  const omega = 2 * Math.PI * Math.min(f1, f2);
  const delta_omega = 2 * Math.PI * (Math.max(f1, f2) - Math.min(f1, f2));

  const right_border = 8 * Math.PI / delta_omega;
  const step = right_border / 1000;

  for (let t = 0; t < right_border; t += step) {
    result.push({
      x: t,
      y: 2 * a * Math.cos(omega * t) * Math.cos(delta_omega * t / 2),
    });
  }

  return result;
}

const parse_input = () => {
  return [
    parseFloat(document.getElementById("f1").value),
    parseFloat(document.getElementById("f2").value),
    parseFloat(document.getElementById("a").value),
  ]
}

const run = () => {
  const [f1, f2, a] = parse_input();
  if (isNaN(f1) || isNaN(f2) || isNaN(a)) {
    alert("Некорретный ввод!");
    return;
  }
  if (f1 <= 0 || f2 <= 0 || a <= 0) {
    alert("Некорретный ввод!");
    return;
  }
  make_plot(make_data(f1, f2, a));
}
