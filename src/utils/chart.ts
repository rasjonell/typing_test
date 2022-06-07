import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export interface DataSetItem {
  x: string;
  y: number;
}

export interface Data {
  WPM: DataSetItem[];
  AWPM: DataSetItem[];
}

export default function setupChart(
  canvas: HTMLCanvasElement,
  data: Data
): Chart<"bar", DataSetItem[]> {
  const context = canvas.getContext("2d");

  return new Chart(context, {
    type: "bar",
    data: {
      datasets: [
        {
          data: data.WPM,
          backgroundColor: "#fff",
          label: "Words Per Minute",
        },
        {
          data: data.AWPM,
          backgroundColor: "#432f71",
          label: "Accurate Words Per Minute",
        },
      ],
    },
    options: {
      color: "white",
      scales: {
        xAxis: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "white",
            borderColor: "white",
          },
        },
        yAxis: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "white",
            borderColor: "white",
          },
        },
      },
    },
  });
}
