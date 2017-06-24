/* globals process Buffer*/

const fs = require('fs');
const webdriver = require('selenium-webdriver');

const setupDriver = (url, ...browsers) => {
    const driverBuilder = new webdriver
        .Builder()
        .usingServer('http://localhost:4444/wd/hub');

    browsers.forEach((browserName) =>
        driverBuilder.withCapabilities({
            browserName,
            maxInstances: 5,
        }));

    const driver = driverBuilder.build();

    process.on('uncaughtException', (err) => {
        console.log('My error handler... ' + err);

        if (driver) {
            driver.takeScreenshot()
                .then((img) => {
                    fs.writeFileSync('/tmp/test.png',
                        new Buffer(img, 'base64'));
                });
        }
    });

    return driver;
};

module.exports = { setupDriver };
