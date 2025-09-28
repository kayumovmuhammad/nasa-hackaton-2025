import { Box, Snackbar } from "@mui/material";
import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function GoogleMaps({
    setLocation,
    setLocationTitle,
    setSelectOpen,
}) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [mapCenter, setCenter] = useState({
        lat: 38.5597722,
        lng: 68.7870384,
    });

    const [snackMsg, setSnack] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [oldInterval, setOldInterval] = useState();

    const handleMapClick = (event) => {
        marker.position = event.detail.latLng;
    };
    const handleSelectButton = () => {
        if (!marker || !marker.position) {
            setSnack("Please chose some location!");
            setSnackOpen(true);

            if (oldInterval) clearInterval(oldInterval);

            setOldInterval(
                setInterval(() => {
                    setSnackOpen(false);
                }, 3000)
            );
            return;
        }
        console.log(marker.position);
        const lat = marker.position.WC;
        const lng = marker.position.XC;
        setLocation({
            lat,
            lng,
        });
        setLocationTitle(`${lat}, ${lng}`);
        setSelectOpen(false);
    };

    return (
        <>
            <APIProvider
                apiKey={"AIzaSyBc7SDNLRG2LUovFmkb4oHydZORUOiwDNk"}
                solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
            >
                <Map
                    colorScheme="DARK"
                    mapId={"269bcd1f5ba584f8"}
                    style={{ width: "90vw", height: "80vh" }}
                    defaultZoom={12}
                    defaultCenter={mapCenter}
                    gestureHandling={"greedy"}
                    onClick={handleMapClick}
                >
                    <AdvancedMarker ref={markerRef} position={null} />
                </Map>
                <MapControl position={ControlPosition.TOP}>
                    <div className="autocomplete-control">
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    </div>
                </MapControl>
                <MapControl position={ControlPosition.RIGHT_BOTTOM}>
                    <GoToHome marker={marker} setCenter={setCenter}></GoToHome>
                </MapControl>
                <MapControl position={ControlPosition.BOTTOM}>
                    <button
                        onClick={handleSelectButton}
                        className="flex items-center justify-center gap-1 text-white text-xl shadow rounded-sm bg-red-500 hover:bg-red-400 px-3 py-1.5 mb-2.5 hover:cursor-pointer"
                    >
                        Select
                    </button>
                </MapControl>
                <MapHandler
                    mapCenter={mapCenter}
                    place={selectedPlace}
                    marker={marker}
                />
            </APIProvider>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={snackOpen}
                onClose={() => {
                    // setSnackOpen(false);
                }}
                message={snackMsg}
                key="hello"
                // key={vertical + horizontal}
            />
        </>
    );
}

function GoToHome({ marker, setCenter }) {
    const map = useMap();
    return (
        <div
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (location) => {
                        const lat = location.coords.latitude;
                        const lng = location.coords.longitude;
                        setCenter({ lat, lng });
                    },
                    () => {}
                );
            }}
            className="text-gray-400 my-1 bg-neutral-700 mr-2.5 h-10 w-10 flex justify-center items-center rounded-full hover:text-gray-50 hover:cursor-pointer"
        >
            <Navigation className="-translate-x-px translate-y-px"></Navigation>
        </div>
    );
}

const MapHandler = ({ place, marker, mapCenter }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place || !marker) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }

        marker.position = place.geometry?.location;
    }, [map, place, marker]);

    useEffect(() => {
        if (!map || !mapCenter) return;

        marker.position = mapCenter;
        map.panTo(mapCenter);
        map.setZoom(13);
    }, [mapCenter]);

    return null;
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setPlaceAutocomplete(
            new places.Autocomplete(inputRef.current, options)
        );
    }, [places]);
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container">
            <input
                className="bg-neutral-700 rounded-[2px] shadow text-white px-3 py-1 mt-2.5 text-[15px] h-[40px] focus:outline-0"
                ref={inputRef}
            />
        </div>
    );
};
