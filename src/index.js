import "./styles.css";
import DisplayController from "./homepage.js";
import AboutPage from "./about.js"

const indexController = {
    tabSwitch() {
        const homeTab = document.querySelector('#home');
        const aboutTab = document.querySelector('#about');

        const contentContainer = document.querySelector('#content');
        DisplayController.loadHome()
        let currentTab = 'homeTab';

        homeTab.addEventListener('click', (e) => {
            if (currentTab !== 'home') {
                contentContainer.replaceChildren();
                DisplayController.loadHome();
                currentTab = 'home';
            }
        })        
        aboutTab.addEventListener('click', (e) => {
            if (currentTab !== 'about') {
                contentContainer.replaceChildren();
                AboutPage.loadHome();
                currentTab = 'about';
            }
        })
    }
}

indexController.tabSwitch();