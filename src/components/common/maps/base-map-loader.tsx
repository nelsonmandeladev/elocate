/**
 * @file This file contains the BaseMap component which renders a Google Map with a marker at a specified location.
 * @requires google.maps
 * @requires @googlemaps/react-wrapper
 */

import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


/**
 * Props for the BaseMap component.
 * @property {React.ReactNode} children - The children of the BaseMap component.
 */
interface BaseMapProps {
    children: React.ReactNode;
}


/**
 * Function to render the status of the Google Maps API.
 * @param status - The status of the Google Maps API.
 * @returns A LinearProgress component if the status is loading, a div with "Failure" if the status is failure, and a div with "Success" if the status is success.
 */
const render = (status: Status) => {
    switch (status) {
        case Status.LOADING:
            return <div className="h-full w-full flex justify-center items-center">Loading...</div>
        case Status.FAILURE:
            return <div className='w-full h-full flex justify-center items-center'>
                Failed to load the map
            </div>;
        case Status.SUCCESS:
            return <div className='w-full h-full flex justify-center items-center'>Success</div>;
    }
};

/**
 * Renders the Google Map component wrapped in the Google Maps API key.
 * @function
 * @param {BaseMapProps} props - The BaseMapProps object containing the center and zoom of the map.
 * @returns {JSX.Element} - The BaseMap component.
 */
export function BaseMap({ children }: BaseMapProps): JSX.Element {
    return (
        <Wrapper
            apiKey={"AIzaSyCWlp-Raz_hqojhGljCT8R2MU4kIgJGuAc"}
            render={render}
            libraries={["marker", "maps"]}
            version='beta'
        >
            {children}
        </Wrapper>
    )
}