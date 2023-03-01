import React from "react";
import "./forecast-weather.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const Forecast = ({ data }) => {
  return (
    <>
      <label className="title">Forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 10).map((item, index) => (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                  />
                  <label className="day">{`${dayjs.utc(item.dt_txt).format("hh:mm A")}`}</label>
                  <label className="description">
                    {item.weather[0].description.toUpperCase()}
                  </label>
                  <label className="min-max">
                    {`${Math.round(item.main.temp)}°C `}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Feels Like</label>
                  <label className="daily-details-value">
                    {Math.round(item.main.feels_like)} °C
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Pressure</label>
                  <label className="daily-details-value">
                    {item.main.pressure} hPa
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Humidity</label>
                  <label className="daily-details-value">
                    {item.main.humidity} %
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Wind Speed</label>
                  <label className="daily-details-value">
                    {item.wind.speed} m/s
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
