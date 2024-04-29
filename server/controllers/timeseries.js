import MonthEntryData from '../models/monthdataentry.js';
import moment from 'moment';
import plotly from 'plotly'; // Replace with your Plotly credentials
import ARIMA from 'tsa';



// Load the data, fit ARIMA model, and visualize the time series
async function analyzeAndVisualizeTimeSeries() {
  try {
    // Retrieve the data from the database
    const data = await MonthEntryData.findAll({ raw: true });

    // Preprocess the data
    const formattedData = data.map(entry => ({
      date: moment(entry.Month, 'YYYY-MM').toDate(),
      value: entry.injuries
    }));

    // Extract values
    const values = formattedData.map(entry => entry.value);

    // Perform ARIMA modeling
    const model = new ARIMA({ p: 2, d: 1, q: 2 }); //may need to tune this
    model.fit(values);

    // Make predictions for future time points
    const forecast = model.predict(12); //forecast for the next 12 months

    // Create a trace for the actual data
    const actualTrace = {
      x: formattedData.map(entry => entry.date),
      y: values,
      mode: 'lines',
      type: 'scatter',
      name: 'Actual Data'
    };

    // Create a trace for the forecast
    const forecastTrace = {
      x: forecast.map((_, index) => moment(formattedData[formattedData.length - 1].date).add(index + 1, 'months').toDate()),
      y: forecast,
      mode: 'lines',
      type: 'scatter',
      name: 'Forecast'
    };

    // Define layout for the plot
    const layout = {
      title: 'Time Series Data and Forecast',
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Injuries'
      }
    };

    // Plot the time series data and forecast
    const figure = { data: [actualTrace, forecastTrace], layout };
    const plotlyOptions = { filename: 'time-series-data-and-forecast', fileopt: 'overwrite' };
    plotly.plot(figure, plotlyOptions, function (err, msg) {
      if (err) return console.error(err);
      console.log(msg);
    });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Call the function to perform ARIMA modeling and visualize the time series
export {analyzeAndVisualizeTimeSeries};
