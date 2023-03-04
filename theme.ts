import {buildLegacyTheme} from 'sanity'

const props = {
    "--my-white" : "#FCEFF9",
    "--my-black" : "#22223b",
    "--inflow-brand" : "#E7E247",
    "--my-red" : "#e63946",
    "--my-blue" : "#086788",
    "--my-green" : "#2a9d8f",
    "--my-yellow" : "#e9c46a",
}


export const myTheme = buildLegacyTheme({
    /*Base theme colors */
    "--black" : props["--my-black"],
    "--white" : props["--my-white"],
    "--gray" : "#666",
    "--gray-base" : "#666",
    "--component-bg" : props["--my-black"],
    "--component-text-color" : props["--my-white"],

    /*  Brand */

    "--brand-primary" : props["--inflow-brand"],

    /*  Default button */
    "--default-button-color" : "#666",
    "--default-button-danger-color" : props["--my-red"],
    "--default-button-success-color" : props["--my-green"],
    "--default-button-warning-color" : props["--my-yellow"],
    "--default-button-primary-color" : props["--inflow-brand"],


    /*  State */

    "--state-info-color": props["--inflow-brand"],
    "--state-success-color": props["--my-green"],
    "--state-warning-color": props["--my-yellow"],
    "--state-danger-color": props["--my-red"],

    /* Navbar */

    "--main-navigation-color": props["--my-black"],
    "--main-navigation-color--inverted": props["--my-white"],

    "--focus-color": props["--inflow-brand"],
})